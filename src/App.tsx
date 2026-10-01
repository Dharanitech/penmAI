import { useState, useCallback } from 'react';
import { AccessibilitySettings, Language } from './types';
import { useSpeech } from './hooks/useSpeech';
import { Header } from './components/Header';
import { AccessibilityBar } from './components/AccessibilityBar';
import { VoiceAssistantView } from './components/VoiceAssistantView';
import { TranslatorSection } from './components/TranslatorSection';
import { StoryAndImpactSection } from './components/StoryAndImpactSection';

export default function App() {
  const [language, setLanguage] = useState<Language>('ta');

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    fontScale: 'normal',
    highContrast: false,
    autoReadAloud: true,
    slowSpeech: false,
  });

  const [demoTriggerCount, setDemoTriggerCount] = useState(0);

  const [spokenTranscriptEvent, setSpokenTranscriptEvent] = useState<{
    text: string;
    id: number;
  } | null>(null);

  const handleFinalSpeechTranscript = useCallback((transcript: string) => {
    setSpokenTranscriptEvent({
      text: transcript,
      id: Date.now(),
    });
  }, []);

  const {
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
  } = useSpeech({
    language,
    slowSpeech: accessibility.slowSpeech,
    onFinalTranscript: handleFinalSpeechTranscript,
  });

  const handleUpdateAccessibility = (
    partial: Partial<AccessibilitySettings>
  ) => {
    if (partial.autoReadAloud === false) {
      stopSpeaking();
    }
    setAccessibility((prev) => ({ ...prev, ...partial }));
  };

  const handleOpenTranslator = () => {
    const el = document.getElementById('explain-terms');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStartDemo = () => {
    setDemoTriggerCount((c) => c + 1);
    const el = document.getElementById('voice-assistant');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const fontScaleStyle =
    accessibility.fontScale === 'xlarge'
      ? { fontSize: '118%' }
      : accessibility.fontScale === 'large'
      ? { fontSize: '109%' }
      : undefined;

  return (
    <div
      style={fontScaleStyle}
      className={`min-h-screen flex flex-col ${
        accessibility.highContrast
          ? 'bg-white text-black contrast-125'
          : 'bg-[#FAF8F5] text-[#181326]'
      }`}
    >
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onStartDemo={handleStartDemo}
        isDemoActive={demoTriggerCount > 0}
      />

      <AccessibilityBar
        language={language}
        settings={accessibility}
        onUpdateSettings={handleUpdateAccessibility}
      />

      <main className="flex-1">
        {/* Core SpeechRecognition & Voice/Text Access Experience */}
        <VoiceAssistantView
          language={language}
          onLanguageChange={setLanguage}
          isListening={isListening}
          interimTranscript={interimTranscript}
          speechSupportStatus={speechSupportStatus}
          errorMessage={errorMessage}
          isSpeaking={isSpeaking}
          volumeLevel={volumeLevel}
          frequencyBands={frequencyBands}
          isVoiceActive={isVoiceActive}
          autoReadAloud={accessibility.autoReadAloud}
          onStartListening={startListening}
          onStopListening={stopListening}
          onSpeak={speakText}
          onStopSpeaking={stopSpeaking}
          onOpenTranslator={handleOpenTranslator}
          demoTriggerCount={demoTriggerCount}
          spokenTranscriptEvent={spokenTranscriptEvent}
        />

        {/* Government Language Translator ("Explain this") */}
        <TranslatorSection language={language} onSpeak={speakText} />

        {/* Story, Comparison, Impact, and Trust & Safety */}
        <StoryAndImpactSection language={language} onSpeak={speakText} />
      </main>
    </div>
  );
}
