import React, { useState, useEffect, useRef } from 'react';
import {
  ChatMessage,
  ConversationState,
  Language,
  SpeechSupportStatus,
} from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { GOVERNMENT_RESOURCES } from '../data/resources';
import {
  runConversationTurn,
  getDontKnowButtonLabel,
} from '../services/conversationEngine';
import { ResourceMatchCard } from './ResourceMatchCard';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Keyboard,
  Send,
  Play,
  SkipForward,
  Pause,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Heart,
} from 'lucide-react';

interface VoiceAssistantViewProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isListening: boolean;
  interimTranscript: string;
  speechSupportStatus: SpeechSupportStatus;
  errorMessage: string | null;
  isSpeaking: boolean;
  volumeLevel: number;
  frequencyBands: number[];
  isVoiceActive: boolean;
  autoReadAloud: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onSpeak: (text: string) => void;
  onStopSpeaking: () => void;
  onOpenTranslator: () => void;
  demoTriggerCount: number;
  spokenTranscriptEvent?: { text: string; id: number } | null;
}

export const VoiceAssistantView: React.FC<VoiceAssistantViewProps> = ({
  language,
  onLanguageChange,
  isListening,
  interimTranscript,
  speechSupportStatus,
  errorMessage,
  isSpeaking,
  volumeLevel,
  frequencyBands,
  isVoiceActive,
  autoReadAloud,
  onStartListening,
  onStopListening,
  onSpeak,
  onStopSpeaking,
  onOpenTranslator,
  demoTriggerCount,
  spokenTranscriptEvent,
}) => {
  const t = UI_TRANSLATIONS[language];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationState, setConversationState] = useState<ConversationState>({
    language,
    currentQuestionKey: 'initial',
  });
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [textInputValue, setTextInputValue] = useState('');

  // 60-Second Demo State
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStepIndex, setDemoStepIndex] = useState(0);
  const [demoAutoPlay, setDemoAutoPlay] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // If SpeechRecognition is unsupported or permission is denied, automatically default to text fallback mode
  useEffect(() => {
    if (
      speechSupportStatus === 'unsupported' ||
      speechSupportStatus === 'permission-denied' ||
      speechSupportStatus === 'restricted'
    ) {
      setInputMode('text');
    }
  }, [speechSupportStatus]);

  useEffect(() => {
    setConversationState((prev) => ({ ...prev, language }));
  }, [language]);

  // When SpeechRecognition delivers a final transcript, process it as a user turn
  useEffect(() => {
    if (spokenTranscriptEvent && spokenTranscriptEvent.text) {
      handleUserTurn(spokenTranscriptEvent.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spokenTranscriptEvent]);

  const handleUserTurn = (utteranceText: string, isDontKnowClick = false) => {
    const clean = utteranceText.trim();
    if (!clean && !isDontKnowClick) return;

    const contextualLabel = getDontKnowButtonLabel(
      conversationState.currentQuestionKey,
      language
    );

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: isDontKnowClick ? contextualLabel : clean,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setTextInputValue('');

    const result = runConversationTurn(
      clean,
      { ...conversationState, language },
      isDontKnowClick
    );

    setConversationState(result.updatedState);

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: result.replyText,
      subtext: result.subtext,
      isDontKnowCoaching: result.isDontKnowCoaching,
      questionKey: result.updatedState.currentQuestionKey,
      quickReplies: result.quickReplies,
      showDontKnowButton: result.showDontKnowButton,
      dontKnowLabel: result.dontKnowLabel,
      matchedResourceId: result.matchedResourceId,
      timestamp: Date.now() + 1,
    };

    setMessages((prev) => [...prev, aiMsg]);

    if (autoReadAloud) {
      const speech = result.subtext
        ? `${result.replyText} ${result.subtext}`
        : result.replyText;
      onSpeak(speech);
    }
  };

  // 60-Second Guided Demo Script
  const getDemoScript = (lang: Language) => {
    if (lang === 'en') {
      return [
        {
          user: 'I need a job. I stay at home. What help can I get?',
          aiText:
            'Certainly. I will help you find a suitable job or skill training program.',
          aiSub: 'What is your age?',
          state: {
            language: lang,
            intent: 'skill' as const,
            education: 'School level',
            currentQuestionKey: 'age' as const,
          },
          showDontKnow: true,
        },
        {
          user: '32',
          aiText: 'Thank you.',
          aiSub: 'Which district do you live in?',
          state: {
            language: lang,
            intent: 'skill' as const,
            age: '32',
            education: 'School level',
            currentQuestionKey: 'location' as const,
          },
          showDontKnow: true,
        },
        {
          user: 'Chennai',
          aiText: 'Got it.',
          aiSub: 'Have you done any job before?',
          state: {
            language: lang,
            intent: 'skill' as const,
            age: '32',
            location: 'Chennai',
            education: 'School level',
            currentQuestionKey: 'previousEmployment' as const,
          },
          showDontKnow: true,
        },
        {
          user: 'No',
          aiText:
            'Approximately how much is your family’s annual income? (Tap "I don’t know" if unsure)',
          aiSub: 'Tap "I don’t know" if you are unsure.',
          state: {
            language: lang,
            intent: 'skill' as const,
            age: '32',
            location: 'Chennai',
            education: 'School level',
            employmentStatus: 'No',
            currentQuestionKey: 'income' as const,
          },
          showDontKnow: true,
        },
        {
          user: '❓ I don’t know',
          aiText:
            'That is completely okay. Let me tell you how to find it. If you have an income certificate, you can check the amount written on it. If not, I will guide you next on where to get this information. Here is the matching skill program for you:',
          state: {
            language: lang,
            intent: 'skill' as const,
            age: '32',
            location: 'Chennai',
            education: 'School level',
            employmentStatus: 'No',
            currentQuestionKey: 'complete' as const,
            matchedResourceId: 'tn-women-skill-training',
          },
          isDontKnowCoaching: true,
          matchedResourceId: 'tn-women-skill-training',
          showDontKnow: false,
        },
      ];
    }

    if (lang === 'hi') {
      return [
        {
          user: 'मुझे काम चाहिए। मैं घर पर रहती हूँ। मुझे क्या मदद मिल सकती है?',
          aiText:
            'बिल्कुल। मैं आपके लिए उपयुक्त काम या कौशल प्रशिक्षण ढूंढने में आपकी मदद करूँगी।',
          aiSub: 'आपकी उम्र क्या है?',
          state: {
            language: lang,
            intent: 'skill' as const,
            education: 'स्कूल स्तर',
            currentQuestionKey: 'age' as const,
          },
          showDontKnow: true,
        },
        {
          user: '32',
          aiText: 'धन्यवाद।',
          aiSub: 'आप किस जिले में रहती हैं?',
          state: {
            language: lang,
            intent: 'skill' as const,
            age: '32',
            education: 'स्कूल स्तर',
            currentQuestionKey: 'location' as const,
          },
          showDontKnow: true,
        },
        {
          user: 'Chennai',
          aiText: 'बहुत अच्छा।',
          aiSub: 'क्या आपने पहले कोई काम किया है?',
          state: {
            language: lang,
            intent: 'skill' as const,
            age: '32',
            location: 'Chennai',
            education: 'स्कूल स्तर',
            currentQuestionKey: 'previousEmployment' as const,
          },
          showDontKnow: true,
        },
        {
          user: 'नहीं',
          aiText: 'आपके परिवार में एक साल में लगभग कितनी आय होती है?',
          aiSub: 'यदि नहीं पता तो "❓ मुझे नहीं पता" चुनें।',
          state: {
            language: lang,
            intent: 'skill' as const,
            age: '32',
            location: 'Chennai',
            education: 'स्कूल स्तर',
            employmentStatus: 'नहीं',
            currentQuestionKey: 'income' as const,
          },
          showDontKnow: true,
        },
        {
          user: '❓ मुझे नहीं पता',
          aiText:
            'कोई बात नहीं। मैं आपको बताती हूँ कि इसे कैसे पता करें। यदि आपके पास आय प्रमाण पत्र है तो आप उसमें लिखी राशि देख सकती हैं। यदि नहीं है, तो मैं आगे बताऊँगी कि यह जानकारी कहाँ से मिलेगी। आपके लिए सबसे उपयुक्त सहायता नीचे दी गई है:',
          state: {
            language: lang,
            intent: 'skill' as const,
            age: '32',
            location: 'Chennai',
            education: 'स्कूल स्तर',
            employmentStatus: 'नहीं',
            currentQuestionKey: 'complete' as const,
            matchedResourceId: 'tn-women-skill-training',
          },
          isDontKnowCoaching: true,
          matchedResourceId: 'tn-women-skill-training',
          showDontKnow: false,
        },
      ];
    }

    // Default: Tamil (Lakshmi, 32, Chennai)
    return [
      {
        user: 'எனக்கு வேலை வேண்டும். நான் வீட்டில் இருக்கிறேன். எனக்கு என்ன உதவி கிடைக்கும்?',
        aiText:
          'நிச்சயமாக. உங்களுக்கு பொருத்தமான வேலை அல்லது திறன் பயிற்சியை கண்டுபிடிக்க நான் உதவுகிறேன்.',
        aiSub: 'உங்கள் வயது என்ன?',
        state: {
          language: lang,
          intent: 'skill' as const,
          education: 'பள்ளி அளவு (School level)',
          currentQuestionKey: 'age' as const,
        },
        showDontKnow: true,
      },
      {
        user: '32',
        aiText: 'நன்றி.',
        aiSub: 'நீங்கள் எந்த மாவட்டத்தில் வசிக்கிறீர்கள்?',
        state: {
          language: lang,
          intent: 'skill' as const,
          age: '32',
          education: 'பள்ளி அளவு (School level)',
          currentQuestionKey: 'location' as const,
        },
        showDontKnow: true,
      },
      {
        user: 'Chennai',
        aiText: 'நல்லது.',
        aiSub: 'நீங்கள் முன்பு ஏதாவது வேலை செய்திருக்கிறீர்களா?',
        state: {
          language: lang,
          intent: 'skill' as const,
          age: '32',
          location: 'Chennai',
          education: 'பள்ளி அளவு (School level)',
          currentQuestionKey: 'previousEmployment' as const,
        },
        showDontKnow: true,
      },
      {
        user: 'இல்லை',
        aiText:
          'உங்கள் குடும்பத்தில் ஒரு வருடத்திற்கு சுமார் எவ்வளவு வருமானம் வருகிறது?',
        aiSub: 'தெரியவில்லை என்றால் "❓ எனக்குத் தெரியாது" என்பதைத் தொடலாம்.',
        state: {
          language: lang,
          intent: 'skill' as const,
          age: '32',
          location: 'Chennai',
          education: 'பள்ளி அளவு (School level)',
          employmentStatus: 'இல்லை',
          currentQuestionKey: 'income' as const,
        },
        showDontKnow: true,
      },
      {
        user: '❓ எனக்குத் தெரியாது',
        aiText:
          'பரவாயில்லை. அதை எப்படி கண்டுபிடிப்பது என்று நான் சொல்கிறேன். உங்கள் வருமானச் சான்றிதழ் இருந்தால் அதில் உள்ள தொகையைப் பார்க்கலாம். அது இல்லையென்றால், இந்த தகவல் எங்கே கிடைக்கும் என்பதை அடுத்ததாக நான் சொல்லுகிறேன்.',
        state: {
          language: lang,
          intent: 'skill' as const,
          age: '32',
          location: 'Chennai',
          education: 'பள்ளி அளவு (School level)',
          employmentStatus: 'இல்லை',
          currentQuestionKey: 'complete' as const,
          matchedResourceId: 'tn-women-skill-training',
        },
        isDontKnowCoaching: true,
        matchedResourceId: 'tn-women-skill-training',
        showDontKnow: false,
      },
    ];
  };

  const applyDemoBeat = (beatIndex: number, lang: Language) => {
    const script = getDemoScript(lang);
    const slice = script.slice(0, beatIndex + 1);
    const builtMessages: ChatMessage[] = [];

    slice.forEach((step, idx) => {
      builtMessages.push({
        id: `demo-u-${idx}`,
        sender: 'user',
        text: step.user,
        timestamp: Date.now() + idx * 2,
      });
      builtMessages.push({
        id: `demo-a-${idx}`,
        sender: 'ai',
        text: step.aiText,
        subtext: step.aiSub,
        isDontKnowCoaching: step.isDontKnowCoaching,
        showDontKnowButton: idx === slice.length - 1 ? step.showDontKnow : false,
        matchedResourceId: step.matchedResourceId,
        timestamp: Date.now() + idx * 2 + 1,
      });
    });

    const latest = slice[slice.length - 1];
    setMessages(builtMessages);
    setConversationState(latest.state);

    if (autoReadAloud) {
      const speechStr = latest.aiSub
        ? `${latest.aiText} ${latest.aiSub}`
        : latest.aiText;
      onSpeak(speechStr);
    }
  };

  const startGuidedDemo = () => {
    setIsDemoMode(true);
    setDemoStepIndex(0);
    setDemoAutoPlay(true);
    applyDemoBeat(0, language);
  };

  useEffect(() => {
    if (demoTriggerCount > 0) {
      startGuidedDemo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoTriggerCount]);

  useEffect(() => {
    if (!isDemoMode || !demoAutoPlay) return;
    const script = getDemoScript(language);
    if (demoStepIndex >= script.length - 1) {
      setDemoAutoPlay(false);
      return;
    }

    const timer = setTimeout(() => {
      const nextIdx = demoStepIndex + 1;
      setDemoStepIndex(nextIdx);
      applyDemoBeat(nextIdx, language);
    }, 4000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDemoMode, demoAutoPlay, demoStepIndex, language]);

  const handleNextDemoBeat = () => {
    const script = getDemoScript(language);
    if (demoStepIndex < script.length - 1) {
      const next = demoStepIndex + 1;
      setDemoStepIndex(next);
      applyDemoBeat(next, language);
    } else {
      setDemoAutoPlay(false);
    }
  };

  const handleRestart = () => {
    onStopSpeaking();
    setMessages([]);
    setIsDemoMode(false);
    setDemoAutoPlay(false);
    setDemoStepIndex(0);
    setConversationState({
      language,
      currentQuestionKey: 'initial',
    });
  };

  useEffect(() => {
    if (messages.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages.length]);

  const isVoiceRestricted =
    speechSupportStatus === 'unsupported' ||
    speechSupportStatus === 'permission-denied' ||
    speechSupportStatus === 'restricted' ||
    speechSupportStatus === 'service-unavailable';

  const isLanding = messages.length === 0 && !isListening;

  return (
    <section
      id="voice-assistant"
      className="py-8 sm:py-14 px-4 sm:px-8 max-w-4xl mx-auto"
    >
      {/* Privacy / Restricted Environment Notice Banner */}
      {isVoiceRestricted && (
        <div className="mb-6 bg-[#FFF9EA] border border-[#F0DC9E] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-[#6B510B]">
          <AlertCircle className="w-5 h-5 text-[#B87A00] shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <h4 className="font-bold text-sm sm:text-base">
              {t.voiceRestrictedTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#7D6216]">
              {t.voiceRestrictedDesc}
            </p>
          </div>
        </div>
      )}

      {/* LANDING SCREEN */}
      {isLanding ? (
        <div className="bg-white rounded-3xl border border-[#DDD5C7] shadow-xs p-6 sm:p-12 text-center space-y-8">
          {/* Identity */}
          <div className="space-y-2">
            <div className="text-sm sm:text-base font-semibold text-[#B84A62] tracking-wide">
              {t.brandSubMeaning}
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#181326] tracking-tight">
              penm<span className="text-[#B84A62]">AI</span>
            </h1>
            <p className="text-base sm:text-lg font-medium text-[#4A4358]">
              {t.tagline}
            </p>
          </div>

          {/* Hero Proposition */}
          <div className="max-w-xl mx-auto py-4 px-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D8]">
            <p className="font-display text-lg sm:text-xl font-semibold text-[#181326] leading-snug">
              “{t.heroStoryHeadline}”
            </p>
            {language !== 'en' && (
              <p className="text-xs sm:text-sm text-[#655B75] mt-1">
                {t.heroStorySub}
              </p>
            )}
          </div>

          {/* Main Question & Big Interactive Button */}
          <div className="space-y-6 pt-2">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#3B1E54]">
              “{t.mainPromptQuestion}”
            </h2>

            {/* Input Selection: Voice or Text Fallback */}
            <div className="flex flex-col items-center justify-center gap-4">
              {!isVoiceRestricted && inputMode === 'voice' ? (
                /* Primary Voice Button */
                <button
                  type="button"
                  onClick={onStartListening}
                  className="group relative min-h-[76px] sm:min-h-[84px] px-8 sm:px-14 py-4 rounded-2xl bg-[#3B1E54] hover:bg-[#2B153E] active:scale-[0.99] text-white shadow-md transition-all flex items-center justify-center gap-4 cursor-pointer"
                >
                  <span className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                    <Mic className="w-7 h-7 text-[#F6C6D0]" />
                  </span>
                  <span className="text-xl sm:text-2xl font-bold whitespace-nowrap">
                    [ {t.startSpeakingBtn} ]
                  </span>
                </button>
              ) : null}

              {/* Text Input Fallback Area */}
              {(isVoiceRestricted || inputMode === 'text') && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUserTurn(textInputValue);
                  }}
                  className="w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-2.5"
                >
                  <input
                    type="text"
                    value={textInputValue}
                    onChange={(e) => setTextInputValue(e.target.value)}
                    placeholder={t.typePlaceholder}
                    autoFocus
                    className="flex-1 min-h-[52px] px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#CFC5B4] text-base sm:text-lg text-[#181326] placeholder:text-[#786E87] focus:outline-2 focus:outline-[#3B1E54]"
                  />
                  <button
                    type="submit"
                    disabled={!textInputValue.trim()}
                    className="min-h-[52px] px-6 py-3 rounded-xl bg-[#3B1E54] hover:bg-[#2B153E] disabled:opacity-50 text-white font-semibold text-base flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.sendBtn}</span>
                  </button>
                </form>
              )}

              {/* Mode Toggle & 60s Demo Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {!isVoiceRestricted && (
                  <button
                    type="button"
                    onClick={() =>
                      setInputMode((m) => (m === 'voice' ? 'text' : 'voice'))
                    }
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#D8CFC0] text-[#181326] font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    {inputMode === 'voice' ? (
                      <>
                        <Keyboard className="w-4 h-4 text-[#3B1E54]" />
                        <span>{t.switchToTextBtn}</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 text-[#B84A62]" />
                        <span>{t.switchToVoiceBtn}</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleUserTurn('', true)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#D8CFC0] text-[#3B1E54] font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <HelpCircle className="w-4 h-4 text-[#B84A62]" />
                  <span>{getDontKnowButtonLabel('initial', language)}</span>
                </button>

                <button
                  type="button"
                  onClick={startGuidedDemo}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#F9EEF1] hover:bg-[#F2DCE2] border border-[#E5C2CB] text-[#7A2337] font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.tryDemoBtn}</span>
                </button>
              </div>
            </div>

            {/* Quick Starters */}
            <div className="pt-6 border-t border-[#EAE4D9] max-w-2xl mx-auto text-left">
              <p className="text-xs sm:text-sm font-semibold text-[#655B75] mb-3 text-center">
                {t.quickStarterLabel}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {t.quickStarters.map((starter, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleUserTurn(starter.utterance)}
                    className="min-h-[52px] p-3.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F1ECE2] border border-[#E2DBD0] hover:border-[#3B1E54] text-left text-sm sm:text-base font-medium text-[#181326] transition-colors"
                  >
                    {starter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="pt-4 flex items-center justify-center gap-3">
              {(
                [
                  { code: 'ta', label: 'தமிழ்' },
                  { code: 'en', label: 'English' },
                  { code: 'hi', label: 'हिन्दी' },
                ] as const
              ).map((langItem) => {
                const isSelected = language === langItem.code;
                return (
                  <button
                    key={langItem.code}
                    type="button"
                    onClick={() => onLanguageChange(langItem.code)}
                    className={`min-h-[44px] px-5 py-2 rounded-xl text-base font-semibold transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#181326] text-white'
                        : 'bg-[#F3EFEA] text-[#4A4358] hover:text-[#181326]'
                    }`}
                  >
                    {langItem.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ACTIVE CONVERSATION SURFACE */
        <div className="space-y-6">
          {/* Header Controls & Progress */}
          <div className="bg-white rounded-2xl border border-[#DDD5C7] p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                {t.progressSteps.map((stepName, idx) => {
                  const isDone =
                    conversationState.currentQuestionKey === 'complete' ||
                    (conversationState.matchedResourceId && idx <= 2);
                  const isCurrent =
                    (conversationState.currentQuestionKey === 'initial' &&
                      idx === 0) ||
                    (conversationState.currentQuestionKey !== 'initial' &&
                      conversationState.currentQuestionKey !== 'complete' &&
                      idx === 1);
                  return (
                    <React.Fragment key={idx}>
                      <span
                        className={`font-semibold tabular-nums ${
                          isCurrent
                            ? 'text-[#3B1E54] underline underline-offset-4'
                            : isDone
                            ? 'text-[#2E6F40]'
                            : 'text-[#8A8098]'
                        }`}
                      >
                        {stepName}
                      </span>
                      {idx < t.progressSteps.length - 1 && (
                        <span className="text-[#C5BCAE]">→</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                {isSpeaking && (
                  <button
                    type="button"
                    onClick={onStopSpeaking}
                    className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#F9EEF1] text-[#7A2337] text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <VolumeX className="w-4 h-4" />
                    <span>{t.stopReadingBtn}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleRestart}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#F3EFEA] hover:bg-[#E6DFD3] text-[#181326] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.restartBtn}</span>
                </button>
              </div>
            </div>

            {/* 60s Demo Control Bar */}
            {isDemoMode && (
              <div className="pt-3 border-t border-[#EAE4D9] flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] p-3 rounded-xl">
                <div className="text-xs sm:text-sm text-[#181326]">
                  <strong className="text-[#B84A62]">{t.demoBadgeLabel}:</strong>{' '}
                  {language === 'ta'
                    ? 'லட்சுமி (32, சென்னை) — வேலை / திறன் பயிற்சி வழிகாட்டுதல்'
                    : language === 'hi'
                    ? 'लक्ष्मी (32, चेन्नई) — कौशल प्रशिक्षण यात्रा'
                    : 'Lakshmi (Age 32, Chennai) — Skill & Livelihood Demo'}{' '}
                  <span className="text-[#655B75] tabular-nums">
                    ({demoStepIndex + 1}/5)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDemoAutoPlay((p) => !p)}
                    className="min-h-[36px] px-3 py-1 rounded-lg bg-white border border-[#D8CFC0] text-xs font-semibold text-[#181326] flex items-center gap-1.5 whitespace-nowrap"
                  >
                    {demoAutoPlay ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Auto-Play</span>
                      </>
                    )}
                  </button>

                  {demoStepIndex < 4 && (
                    <button
                      type="button"
                      onClick={handleNextDemoBeat}
                      className="min-h-[36px] px-3 py-1 rounded-lg bg-[#3B1E54] text-white text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Next</span>
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Conversation Stream */}
          <div className="space-y-5">
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-xl bg-[#3B1E54] text-white rounded-2xl rounded-tr-xs px-5 py-4 shadow-xs">
                      <div className="text-xs text-[#E5D4F0] mb-1">
                        {language === 'ta'
                          ? 'நீங்கள் சொன்னது'
                          : language === 'hi'
                          ? 'आपने कहा'
                          : 'You said'}
                      </div>
                      <p className="text-lg sm:text-xl font-medium leading-snug">
                        “{msg.text}”
                      </p>
                    </div>
                  </div>
                );
              }

              const matched = msg.matchedResourceId
                ? GOVERNMENT_RESOURCES.find((r) => r.id === msg.matchedResourceId)
                : null;

              return (
                <div key={msg.id} className="space-y-4">
                  <div
                    className={`rounded-2xl border p-5 sm:p-7 shadow-xs ${
                      msg.isDontKnowCoaching
                        ? 'bg-[#FDF6F8] border-[#E8BAC5] ring-2 ring-[#B84A62]/10'
                        : 'bg-white border-[#DDD5C7]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base text-[#3B1E54]">
                          penmAI
                        </span>
                        {msg.isDontKnowCoaching && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5D8E0] text-[#7A2337] text-xs font-bold">
                            <Heart className="w-3 h-3 fill-current text-[#B84A62]" />
                            <span>{t.dontKnowCoachBadge}</span>
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onSpeak(
                            msg.subtext
                              ? `${msg.text} ${msg.subtext}`
                              : msg.text
                          )
                        }
                        className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#F5F1EB] hover:bg-[#EAE3D8] text-[#181326] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Volume2 className="w-4 h-4 text-[#3B1E54]" />
                        <span>{t.readAloudBtn}</span>
                      </button>
                    </div>

                    {msg.isDontKnowCoaching && (
                      <div className="mb-4 pb-3 border-b border-[#F0CDD6] text-xs sm:text-sm text-[#7A2337] font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#B84A62] shrink-0" />
                        <span>{t.dontKnowCoachReassurance}</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      {msg.text.split('\n').map((line, lIdx) =>
                        line.trim() ? (
                          <p
                            key={lIdx}
                            className="text-lg sm:text-xl text-[#181326] font-medium leading-relaxed"
                          >
                            {line}
                          </p>
                        ) : (
                          <div key={lIdx} className="h-1.5" />
                        )
                      )}
                    </div>

                    {msg.subtext && (
                      <div className="mt-4 pt-4 border-t border-[#EAE4D9]">
                        <p className="font-display text-xl sm:text-2xl font-bold text-[#3B1E54]">
                          {msg.subtext}
                        </p>
                      </div>
                    )}

                    {/* Quick Options + Context-Aware "I don't know" button */}
                    {(msg.quickReplies?.length || msg.showDontKnowButton) && (
                      <div className="mt-5 pt-4 border-t border-[#EAE4D9] flex flex-wrap items-center gap-2.5">
                        {msg.quickReplies?.map((qr, qIdx) => (
                          <button
                            key={qIdx}
                            type="button"
                            onClick={() => handleUserTurn(qr.value)}
                            className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#3B1E54] hover:text-white border border-[#CFC5B4] text-[#181326] text-base font-semibold transition-colors whitespace-nowrap"
                          >
                            {qr.label}
                          </button>
                        ))}

                        {msg.showDontKnowButton && (
                          <button
                            type="button"
                            onClick={() => handleUserTurn('', true)}
                            className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#F9EEF1] hover:bg-[#F2DCE2] border border-[#E5C2CB] text-[#7A2337] text-base font-semibold flex items-center gap-2 transition-all shadow-xs hover:shadow-sm"
                          >
                            <HelpCircle className="w-4 h-4 text-[#B84A62] shrink-0" />
                            <span>
                              {msg.dontKnowLabel ||
                                getDontKnowButtonLabel(
                                  msg.questionKey ||
                                    conversationState.currentQuestionKey,
                                  language
                                )}
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {matched && (
                    <ResourceMatchCard
                      resource={matched}
                      language={language}
                      conversationState={conversationState}
                      onSpeak={onSpeak}
                      onOpenTranslator={onOpenTranslator}
                      defaultExpandedSteps={isDemoMode}
                    />
                  )}
                </div>
              );
            })}

            <div ref={chatEndRef} />
          </div>

          {/* VISUAL LISTENING ANIMATION (Web Audio API Responsive Equalizer & Volume Intensity) */}
          {isListening && (
            <div className="bg-[#3B1E54] text-white rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-xl border border-[#5A2B80] transition-all relative overflow-hidden">
              {/* Dynamic Radial Voice Glow Ring */}
              <div
                style={{
                  transform: `scale(${1 + (volumeLevel / 100) * 0.6})`,
                  opacity: Math.max(0.18, Math.min(0.85, volumeLevel / 90)),
                }}
                className="absolute inset-0 pointer-events-none rounded-2xl bg-radial from-[#F6C6D0]/25 via-[#B84A62]/10 to-transparent transition-transform duration-75 ease-out"
              />

              {/* Central Mic Icon with Audio-Reactive Halo */}
              <div className="relative inline-flex items-center justify-center">
                <span
                  style={{
                    transform: `scale(${1 + (volumeLevel / 100) * 0.45})`,
                  }}
                  className={`absolute w-16 h-16 rounded-full transition-transform duration-75 ${
                    isVoiceActive
                      ? 'bg-[#F6C6D0]/30 animate-pulse'
                      : 'bg-white/10'
                  }`}
                />
                <div className="relative w-12 h-12 rounded-full bg-[#181326] flex items-center justify-center border border-white/20 shadow-md">
                  <Mic
                    className={`w-6 h-6 transition-colors duration-75 ${
                      isVoiceActive ? 'text-[#F6C6D0]' : 'text-white'
                    }`}
                  />
                </div>
              </div>

              {/* Multi-Bar Real-Time Frequency Waveform (Responds to pitch & amplitude) */}
              <div className="flex items-end justify-center gap-2 h-16 px-4">
                {(frequencyBands.length === 5
                  ? [
                      frequencyBands[0],
                      frequencyBands[1],
                      frequencyBands[2],
                      frequencyBands[3],
                      frequencyBands[4],
                      frequencyBands[2],
                      frequencyBands[1],
                    ]
                  : [15, 25, 45, 60, 45, 25, 15]
                ).map((bandVal, idx) => {
                  // Dynamic height based on real-time audio intensity
                  const heightPx = Math.max(
                    10,
                    Math.min(60, Math.round(10 + (bandVal / 100) * 50))
                  );
                  return (
                    <span
                      key={idx}
                      style={{ height: `${heightPx}px` }}
                      className={`w-2 sm:w-2.5 rounded-full transition-all duration-75 ease-out ${
                        isVoiceActive
                          ? 'bg-gradient-to-t from-[#B84A62] via-[#F6C6D0] to-white shadow-xs shadow-[#F6C6D0]/60'
                          : 'bg-white/30'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Status & Live Voice Detection Indicator */}
              <div className="space-y-1.5 relative z-10">
                <div className="flex items-center justify-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      isVoiceActive
                        ? 'bg-[#48D576] animate-ping'
                        : 'bg-[#F6C6D0]'
                    }`}
                  />
                  <span className="text-xl sm:text-2xl font-bold tracking-tight">
                    {t.listeningStateText}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-[#E5D4F0] flex items-center justify-center gap-2">
                  <span>{t.speakNowNotice}</span>
                  {isVoiceActive && (
                    <span className="px-2 py-0.5 rounded-full bg-white/15 text-[11px] font-semibold text-[#F6C6D0] tabular-nums">
                      {volumeLevel}% intensity
                    </span>
                  )}
                </div>
              </div>

              {/* Interim Real-time Transcript */}
              {interimTranscript && (
                <div className="py-2.5 px-4 rounded-xl bg-white/10 max-w-lg mx-auto border border-white/15 relative z-10">
                  <p className="text-base sm:text-lg text-white font-medium italic">
                    “{interimTranscript}”
                  </p>
                </div>
              )}

              <div className="pt-1 relative z-10">
                <button
                  type="button"
                  onClick={onStopListening}
                  className="min-h-[44px] px-6 py-2 rounded-xl bg-white text-[#181326] font-semibold text-sm inline-flex items-center gap-2 hover:bg-[#FAF8F5] transition-colors shadow-xs"
                >
                  <MicOff className="w-4 h-4 text-[#B84A62]" />
                  <span>{t.stopSpeakingBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* Persistent Active Voice & Text Input Bar */}
          <div className="bg-white rounded-2xl border border-[#DDD5C7] p-4 sm:p-5 space-y-4">
            {/* Context-Aware "I Don't Know" helper button in the persistent input bar */}
            {conversationState.currentQuestionKey !== 'complete' && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 bg-[#FDF6F8] border border-[#F0D5DC] rounded-xl px-4 py-2.5">
                <span className="text-xs sm:text-sm text-[#7A2337] font-medium flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-current text-[#B84A62]" />
                  <span>
                    {language === 'ta'
                      ? 'விவரம் தெரியவில்லையா? கவலை வேண்டாம்:'
                      : language === 'hi'
                      ? 'जानकारी नहीं पता? कोई बात नहीं:'
                      : 'Unsure of the answer? No problem:'}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => handleUserTurn('', true)}
                  className="min-h-[36px] px-3.5 py-1.5 rounded-lg bg-[#3B1E54] hover:bg-[#2B153E] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <HelpCircle className="w-4 h-4 text-[#F6C6D0]" />
                  <span>
                    {getDontKnowButtonLabel(
                      conversationState.currentQuestionKey,
                      language
                    )}
                  </span>
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Microphone Button (With listening toggle) */}
              {!isVoiceRestricted ? (
                <button
                  type="button"
                  onClick={isListening ? onStopListening : onStartListening}
                  className={`min-h-[52px] px-6 py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap shrink-0 ${
                    isListening
                      ? 'bg-[#B84A62] text-white animate-pulse'
                      : 'bg-[#3B1E54] hover:bg-[#2B153E] text-white'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                  <span>
                    {isListening ? t.listeningStateText : t.startSpeakingBtn}
                  </span>
                </button>
              ) : null}

              {/* Text Input Fallback (Always functional) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUserTurn(textInputValue);
                }}
                className="flex-1 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={textInputValue}
                  onChange={(e) => setTextInputValue(e.target.value)}
                  placeholder={t.typePlaceholder}
                  className="flex-1 min-h-[52px] px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8CFC0] text-base text-[#181326] placeholder:text-[#786E87] focus:outline-2 focus:outline-[#3B1E54]"
                />
                <button
                  type="submit"
                  disabled={!textInputValue.trim()}
                  className="min-h-[52px] px-5 py-2.5 rounded-xl bg-[#181326] hover:bg-[#3B1E54] disabled:opacity-50 text-white font-semibold text-sm flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.sendBtn}</span>
                </button>
              </form>
            </div>

            {/* Helper footer to test "I don't know" across different questions */}
            <div className="pt-2 border-t border-[#F0EAE0] flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[#655B75]">
              <span className="font-semibold text-[#181326]">
                {language === 'ta'
                  ? 'Zero-Knowledge சோதனைகள் ("எனக்குத் தெரியாது"):'
                  : language === 'hi'
                  ? 'विभिन्न प्रश्नों पर "मुझे नहीं पता" परीक्षण:'
                  : 'Test Context-Aware "I don’t know" on any question:'}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleUserTurn('ASK_INCOME_QUESTION')}
                  className="min-h-[30px] px-2.5 py-1 rounded-md bg-[#F9EEF1] hover:bg-[#F2DCE2] text-[#7A2337] font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>{language === 'ta' ? 'வருமானம் (Income)' : 'Income'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConversationState((prev) => ({
                      ...prev,
                      currentQuestionKey: 'age',
                    }));
                    handleUserTurn('', true);
                  }}
                  className="min-h-[30px] px-2.5 py-1 rounded-md bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#D8CFC0] text-[#4A4358] font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>{language === 'ta' ? 'வயது (Age)' : 'Age'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConversationState((prev) => ({
                      ...prev,
                      currentQuestionKey: 'location',
                    }));
                    handleUserTurn('', true);
                  }}
                  className="min-h-[30px] px-2.5 py-1 rounded-md bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#D8CFC0] text-[#4A4358] font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>{language === 'ta' ? 'மாவட்டம் (District)' : 'District'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConversationState((prev) => ({
                      ...prev,
                      currentQuestionKey: 'previousEmployment',
                    }));
                    handleUserTurn('', true);
                  }}
                  className="min-h-[30px] px-2.5 py-1 rounded-md bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#D8CFC0] text-[#4A4358] font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>{language === 'ta' ? 'வேலை (Work History)' : 'Work'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
