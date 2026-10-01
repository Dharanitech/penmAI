import { useState, useEffect, useRef, useCallback } from 'react';
import { Language, SpeechSupportStatus } from '../types';

const LOCALE_MAP: Record<Language, string> = {
  ta: 'ta-IN',
  en: 'en-IN',
  hi: 'hi-IN',
};

interface UseSpeechOptions {
  language: Language;
  slowSpeech?: boolean;
  onFinalTranscript?: (transcript: string) => void;
}

export function useSpeech({
  language,
  slowSpeech = false,
  onFinalTranscript,
}: UseSpeechOptions) {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechSupportStatus, setSpeechSupportStatus] =
    useState<SpeechSupportStatus>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Web Audio API volume and frequency intensity states
  const [volumeLevel, setVolumeLevel] = useState<number>(0); // 0 to 100
  const [frequencyBands, setFrequencyBands] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]); // 5 bands: 0 to 100
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const onFinalRef = useRef(onFinalTranscript);

  // Web Audio API refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    onFinalRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  // Initial detection of SpeechRecognition availability & privacy restrictions
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupportStatus('unsupported');
      return;
    }

    // In iframe environments, check permission query if available
    if (window.self !== window.top) {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions
          .query({ name: 'microphone' as PermissionName })
          .then((perm) => {
            if (perm.state === 'denied') {
              setSpeechSupportStatus('permission-denied');
            } else {
              setSpeechSupportStatus('supported');
            }
          })
          .catch(() => {
            setSpeechSupportStatus('supported');
          });
      } else {
        setSpeechSupportStatus('supported');
      }
    } else {
      setSpeechSupportStatus('supported');
    }
  }, []);

  // Cleanup Web Audio resources
  const cleanupAudioAnalyser = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      } catch {
        // ignore
      }
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        if (audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
      } catch {
        // ignore
      }
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setVolumeLevel(0);
    setFrequencyBands([0, 0, 0, 0, 0]);
    setIsVoiceActive(false);
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    cleanupAudioAnalyser();
    setIsListening(false);
  }, [cleanupAudioAnalyser]);

  const startListening = useCallback(async () => {
    setErrorMessage(null);
    setInterimTranscript('');

    if (typeof window === 'undefined') return;

    // Stop speaking before starting to listen
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupportStatus('unsupported');
      setErrorMessage('Browser does not support SpeechRecognition');
      return;
    }

    // 1. Initialize Web Audio API Analyser for real-time volume & frequency responsiveness
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        mediaStreamRef.current = stream;

        const AudioCtx =
          window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;

          if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
          }

          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0.55;
          analyserRef.current = analyser;

          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const analyzeAudio = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);

            // Compute overall volume
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            const normalizedVol = Math.min(100, Math.round((avg / 110) * 100));

            setVolumeLevel(normalizedVol);
            setIsVoiceActive(normalizedVol > 8);

            // Extract 5 distinct frequency bands: Bass, Low-Mid, Mid, High-Mid, Treble
            const b1 = dataArray.slice(1, 6).reduce((a, b) => a + b, 0) / 5;
            const b2 = dataArray.slice(6, 18).reduce((a, b) => a + b, 0) / 12;
            const b3 = dataArray.slice(18, 42).reduce((a, b) => a + b, 0) / 24;
            const b4 = dataArray.slice(42, 75).reduce((a, b) => a + b, 0) / 33;
            const b5 = dataArray.slice(75, 120).reduce((a, b) => a + b, 0) / 45;

            const bands = [
              Math.min(100, Math.max(10, Math.round((b1 / 160) * 100))),
              Math.min(100, Math.max(12, Math.round((b2 / 160) * 100))),
              Math.min(100, Math.max(16, Math.round((b3 / 160) * 100))),
              Math.min(100, Math.max(12, Math.round((b4 / 160) * 100))),
              Math.min(100, Math.max(8, Math.round((b5 / 160) * 100))),
            ];
            setFrequencyBands(bands);

            rafRef.current = requestAnimationFrame(analyzeAudio);
          };

          rafRef.current = requestAnimationFrame(analyzeAudio);
        }
      }
    } catch (audioErr: any) {
      // If mic is denied at the getUserMedia step, handle gracefully
      if (
        audioErr?.name === 'NotAllowedError' ||
        audioErr?.name === 'PermissionDeniedError' ||
        audioErr?.name === 'SecurityError'
      ) {
        setSpeechSupportStatus('permission-denied');
        setErrorMessage('Microphone access was denied or restricted.');
        cleanupAudioAnalyser();
        return;
      }
    }

    // 2. Initialize SpeechRecognition API
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = LOCALE_MAP[language] || 'ta-IN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      let finalCaptured = '';

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
        setSpeechSupportStatus('supported');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let finalStr = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalStr += item;
          } else {
            interim += item;
          }
        }
        if (finalStr) {
          finalCaptured = finalStr.trim();
          setInterimTranscript(finalCaptured);
        } else {
          setInterimTranscript(interim);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        cleanupAudioAnalyser();
        const err = event.error;

        if (err === 'not-allowed' || err === 'service-not-allowed') {
          setSpeechSupportStatus('permission-denied');
          setErrorMessage('Microphone access was denied or restricted.');
        } else if (err === 'audio-capture') {
          setSpeechSupportStatus('restricted');
          setErrorMessage('No microphone device found or permission restricted.');
        } else if (err === 'network') {
          setSpeechSupportStatus('service-unavailable');
          setErrorMessage('Network connection error for speech recognition.');
        } else if (err === 'no-speech') {
          setErrorMessage(null);
        } else {
          setErrorMessage(`Speech recognition error: ${err}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        cleanupAudioAnalyser();
        if (finalCaptured && onFinalRef.current) {
          onFinalRef.current(finalCaptured);
          setInterimTranscript('');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      setIsListening(false);
      cleanupAudioAnalyser();
      if (err?.name === 'NotAllowedError' || err?.name === 'SecurityError') {
        setSpeechSupportStatus('permission-denied');
      } else {
        setSpeechSupportStatus('unsupported');
      }
      setErrorMessage('SpeechRecognition could not start.');
    }
  }, [language, cleanupAudioAnalyser]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const speakText = useCallback(
    (text: string, overrideLang?: Language) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      try {
        window.speechSynthesis.cancel();
        const cleanText = text.replace(/[❓🔊📋🌐💼✓☐☑▶⏹🎙️]/g, '').trim();
        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        const targetLocale = LOCALE_MAP[overrideLang || language] || 'ta-IN';
        utterance.lang = targetLocale;
        utterance.rate = slowSpeech ? 0.84 : 0.96;
        utterance.pitch = 1.02;

        const voices = window.speechSynthesis.getVoices();
        const langPrefix = (overrideLang || language).toLowerCase();
        const matchingVoice =
          voices.find(
            (v) =>
              v.lang.toLowerCase().includes(langPrefix) &&
              (v.name.toLowerCase().includes('female') ||
                v.name.toLowerCase().includes('google') ||
                v.name.toLowerCase().includes('india'))
          ) || voices.find((v) => v.lang.toLowerCase().includes(langPrefix));

        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsSpeaking(false);
      }
    },
    [language, slowSpeech]
  );

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      cleanupAudioAnalyser();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, [cleanupAudioAnalyser]);

  return {
    isListening,
    interimTranscript,
    speechSupportStatus,
    errorMessage,
    isSpeaking,
    volumeLevel,
    frequencyBands,
    isVoiceActive,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
  };
}
