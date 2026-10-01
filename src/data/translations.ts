import { Language } from '../types';

export const UI_TRANSLATIONS: Record<
  Language,
  {
    brandSubMeaning: string;
    tagline: string;
    heroStoryHeadline: string;
    heroStorySub: string;
    mainPromptQuestion: string;
    startSpeakingBtn: string;
    stopSpeakingBtn: string;
    listeningStateText: string;
    speakNowNotice: string;
    orDivider: string;
    typeYourNeedBtn: string;
    typePlaceholder: string;
    sendBtn: string;
    tryDemoBtn: string;
    demoBadgeLabel: string;
    navDiscover: string;
    navTranslator: string;
    navResources: string;
    navImpact: string;
    dontKnowBtn: string;
    dontKnowCoachBadge: string;
    dontKnowCoachReassurance: string;
    readAloudBtn: string;
    stopReadingBtn: string;
    restartBtn: string;
    matchedResourceHeader: string;
    whyRelevantHeader: string;
    matchedInfoLabel: string;
    infoAge: string;
    infoLocation: string;
    infoEducation: string;
    areYouReady: string;
    nextStepBtn: string;
    whatToDoNextHeader: string;
    actionSpeakBtn: string;
    actionViewDocsBtn: string;
    actionOfficialSiteBtn: string;
    actionExplainBtn: string;
    requiredDocumentsHeader: string;
    explainDocBtn: string;
    howToGetDocLabel: string;
    stepLabel: string;
    eligibilityHeader: string;
    explainThisTitle: string;
    explainThisSubtitle: string;
    comparisonTitle: string;
    comparisonOldTitle: string;
    comparisonOldSub: string;
    comparisonOldSteps: string[];
    comparisonNewTitle: string;
    comparisonNewSub: string;
    comparisonNewSteps: string[];
    whyPenmaiTitle: string;
    whyCards: Array<{ title: string; desc: string }>;
    impactTitle: string;
    impactSub: string;
    impactPairs: Array<{ before: string; after: string }>;
    trustBannerText: string;
    verifyEligibilityText: string;
    privacyMessageText: string;
    accessibilityLabel: string;
    fontSizeLabel: string;
    highContrastLabel: string;
    autoReadLabel: string;
    readAloudSettingTitle: string;
    readAloudActiveLabel: string;
    readAloudDisabledLabel: string;
    slowSpeechLabel: string;
    quickStarterLabel: string;
    quickStarters: Array<{ label: string; utterance: string }>;
    progressSteps: string[];
    voiceRestrictedTitle: string;
    voiceRestrictedDesc: string;
    voiceActiveNotice: string;
    switchToTextBtn: string;
    switchToVoiceBtn: string;
    curatedResourcesTitle: string;
    curatedResourcesSubtitle: string;
    verifiedSourceLabel: string;
    curatedDemoLabel: string;
    selectResourceToExploreBtn: string;
  }
> = {
  ta: {
    brandSubMeaning: 'பெண்மை + AI',
    tagline: 'Her Voice. Her Language. Her Access.',
    heroStoryHeadline:
      'எதைத் தேடுவது என்று அவளுக்குத் தெரியாது. தெரிய வேண்டிய அவசியமும் இல்லை. அவள் பேசினால் போதும்.',
    heroStorySub:
      'She doesn’t know what to search. She doesn’t need to. She just speaks.',
    mainPromptQuestion: 'உங்களுக்கு என்ன உதவி வேண்டும்?',
    startSpeakingBtn: 'பேச தொடங்குங்கள்',
    stopSpeakingBtn: 'பேசுவதை நிறுத்து',
    listeningStateText: 'நான் கேட்கிறேன்...',
    speakNowNotice: 'இப்போது பேசலாம் — உங்கள் குரல் கேட்கப்படுகிறது',
    orDivider: 'அல்லது',
    typeYourNeedBtn: 'எழுதிப் பயன்பெறுக (Type your need)',
    typePlaceholder:
      'எ.கா: எனக்கு வேலை வேண்டும். நான் வீட்டில் இருக்கிறேன்...',
    sendBtn: 'அனுப்பு',
    tryDemoBtn: '60-வினாடி டெமோ (Try Demo)',
    demoBadgeLabel: '60-வினாடி டெமோ (60-second demo)',
    navDiscover: 'உதவி தேடுக',
    navTranslator: 'எளிய விளக்கம்',
    navResources: 'திட்டங்கள்',
    navImpact: 'நோக்கம்',
    dontKnowBtn: '❓ எனக்குத் தெரியாது',
    dontKnowCoachBadge: 'அன்பான வழிகாட்டுதல் (Zero-Knowledge Coaching)',
    dontKnowCoachReassurance:
      'இங்கே தவறான பதில் என்று எதுவுமே இல்லை. தெரியாத தகவலை எப்படிக் கண்டறிவது எனப் படிப்படியாகப் பார்க்கலாம்.',
    readAloudBtn: '🔊 சொல்லுங்கள்',
    stopReadingBtn: '⏹ நிறுத்து',
    restartBtn: 'முதலில் இருந்து தொடங்கு',
    matchedResourceHeader: 'உங்களுக்கு பொருத்தமான உதவி',
    whyRelevantHeader: 'ஏன் இது பொருத்தமாக இருக்கலாம்?',
    matchedInfoLabel: 'தேவையான தகவல்கள்:',
    infoAge: 'Age (வயது)',
    infoLocation: 'Location (மாவட்டம்)',
    infoEducation: 'Education (கல்வி)',
    areYouReady: 'நீங்கள் தயாரா?',
    nextStepBtn: 'அடுத்த படி',
    whatToDoNextHeader: 'அடுத்ததாக என்ன செய்ய வேண்டும்?',
    actionSpeakBtn: '🔊 சொல்லுங்கள்',
    actionViewDocsBtn: '📋 ஆவணங்களை பார்க்க',
    actionOfficialSiteBtn: '🌐 அதிகாரப்பூர்வ தளத்திற்கு செல்ல',
    actionExplainBtn: '❓ எனக்கு விளக்குங்கள்',
    requiredDocumentsHeader: 'தேவையான ஆவணங்கள் (Document Coach)',
    explainDocBtn: 'விளக்கம் கேட்க',
    howToGetDocLabel: 'எங்கே கிடைக்கும்:',
    stepLabel: 'படி',
    eligibilityHeader: 'எளிய தகுதி விவரங்கள்',
    explainThisTitle: 'அரசு வார்த்தைகளுக்கு எளிய விளக்கம் ("Explain this")',
    explainThisSubtitle:
      'விண்ணப்பங்களில் உள்ள கடினமான வார்த்தையைத் தொட்டால் penmAI எளிய தமிழில் விளக்கும்.',
    comparisonTitle: 'அமைப்பு பெண்ணின் தேவையைப் புரிந்துகொள்கிறது',
    comparisonOldTitle: 'வழக்கமான அரசு இணையதளம்',
    comparisonOldSub: 'பயனர் முறையைக் கற்றுக்கொள்ள வேண்டும்',
    comparisonOldSteps: ['தேடுதல்', 'புரிந்துகொள்ளுதல்', 'நிரப்புதல்', 'சமர்ப்பித்தல்'],
    comparisonNewTitle: 'penmAI வழிமுறை',
    comparisonNewSub: 'தொழில்நுட்பம் பெண்ணின் மொழியைப் புரிந்துகொள்கிறது',
    comparisonNewSteps: ['பேசுதல்', 'புரிந்துகொள்ளுதல்', 'வழிகாட்டுதல்', 'பயன்பெறுதல்'],
    whyPenmaiTitle: 'ஏன் penmAI?',
    whyCards: [
      {
        title: '🎙️ VOICE FIRST (குரல் வழி)',
        desc: 'உங்கள் தாய்மொழியில் இயல்பாகப் பேசினால் போதும். தட்டச்சு செய்யத் தேவையில்லை.',
      },
      {
        title: '🧠 INTENT FIRST (தேவை அறிதல்)',
        desc: 'திட்டத்தின் பெயர் தெரிய வேண்டாம். உங்கள் வாழ்க்கைத் தேவையைச் சொன்னால் போதும்.',
      },
      {
        title: '❓ ZERO-KNOWLEDGE UX (தெரியாது என்பதும் பதில்)',
        desc: '"எனக்குத் தெரியாது" என்று சொன்னால், அதை எப்படிக் கண்டுபிடிப்பது என்று penmAI வழிகாட்டும்.',
      },
      {
        title: '🧭 ACTION GUIDANCE (செயல் வழிகாட்டி)',
        desc: 'தகவல் மட்டும் அல்ல; ஆவணங்கள் முதல் விண்ணப்பம் வரை அடுத்த அடியைக் காட்டும்.',
      },
    ],
    impactTitle: 'டிஜிட்டல் தயக்கத்திலிருந்து டிஜிட்டல் சுதந்திரம் வரை',
    impactSub: 'From digital exclusion to digital independence.',
    impactPairs: [
      { before: 'ஆங்கிலம் தெரியாது', after: 'தாய்மொழியில் உரையாடல்' },
      { before: 'தொழில்நுட்ப அறிவு இல்லை', after: 'குரல் வழிப் பயன்பாடு' },
      { before: 'கேட்க யாரும் இல்லை', after: 'penmAI வழிகாட்டுதல்' },
      { before: 'திட்டத்தின் பெயர் தெரியாது', after: 'தேவைக்கேற்ற உதவித் தேர்வு' },
      { before: 'படிவங்கள் புரியவில்லை', after: 'படிப்படியான எளிய விளக்கம்' },
    ],
    trustBannerText:
      'penmAI அரசு சேவைகளைப் புரிந்துகொள்ளவும் வழிநடத்தவும் உதவுகிறது. இது அரசு முடிவுகளை எடுப்பதில்லை.',
    verifyEligibilityText:
      'இறுதித் தகுதி மற்றும் விண்ணப்ப விவரங்களை எப்போதும் அதிகாரப்பூர்வ அரசு தளத்தில் சரிபார்க்கவும்.',
    privacyMessageText:
      'உங்கள் உரையாடல் இந்த வழிகாட்டுதலுக்கு மட்டுமே பயன்படுத்தப்படுகிறது. கடவுச்சொல், OTP, வங்கி PIN போன்ற தகவல்களைப் பகிர வேண்டாம்.',
    accessibilityLabel: 'எளிமையான பார்வை அமைப்புகள்',
    fontSizeLabel: 'எழுத்து அளவு',
    highContrastLabel: 'தெளிவான நிறம்',
    autoReadLabel: 'தானாக வாசிக்க',
    readAloudSettingTitle: 'குரல் வழி வாசிப்பு (Read Aloud)',
    readAloudActiveLabel: 'இயங்குகிறது (ON)',
    readAloudDisabledLabel: 'முடக்கப்பட்டது (OFF)',
    slowSpeechLabel: 'நிதானமான குரல்',
    quickStarterLabel: 'அல்லது கீழே உள்ள ஒன்றைத் தொட்டுத் தொடங்கவும்:',
    quickStarters: [
      {
        label: '💼 "எனக்கு வேலை வேண்டும். நான் வீட்டில் இருக்கிறேன்."',
        utterance: 'எனக்கு வேலை வேண்டும். நான் வீட்டில் இருக்கிறேன். எனக்கு என்ன உதவி கிடைக்கும்?',
      },
      {
        label: '🪙 "மாதம் ₹1,000 மகளிர் உதவித்தொகை பற்றி சொல்லுங்கள்"',
        utterance: 'எனக்கு குடும்பச் செலவுக்கு மாதம் பண உதவி வேண்டும். என்ன திட்டம் உள்ளது?',
      },
      {
        label: '🧵 "தையல் அல்லது சுயதொழில் பயிற்சி பெற வேண்டும்"',
        utterance: 'நான் தையல் தொழில் செய்ய பயிற்சி பெற விரும்புகிறேன். எனக்கு என்ன உதவி கிடைக்கும்?',
      },
    ],
    progressSteps: ['1. உங்கள் தேவை', '2. எளிய கேள்விகள்', '3. பொருத்தமான உதவி', '4. அடுத்த படிகள்'],
    voiceRestrictedTitle: 'குரல் வசதி முடக்கப்பட்ட சூழல் (Text Fallback Active)',
    voiceRestrictedDesc:
      'உங்கள் உலாவி அல்லது தனியுரிமை அமைப்புகளில் மைக் அனுமதி கிடைக்கவில்லை. கவலை வேண்டாம் — கீழே உள்ள எளிய எழுத்து வழியில் தடையின்றிப் பயன்படுத்தலாம்.',
    voiceActiveNotice: 'மைக்ரோஃபோன் இயங்குகிறது. தெளிவாகப் பேசவும்.',
    switchToTextBtn: 'எழுத்து வழிக்கு மாறுங்கள் (Type instead)',
    switchToVoiceBtn: 'குரல் வழிக்கு மாறுங்கள் (Use Voice)',
    curatedResourcesTitle: 'சரிபார்க்கப்பட்ட அரசு மற்றும் திறன் திட்டங்கள்',
    curatedResourcesSubtitle:
      'பெண்களின் வாழ்வாதாரம், திறன் பயிற்சி மற்றும் சமூகப் பாதுகாப்புத் திட்டங்கள்',
    verifiedSourceLabel: 'அதிகாரப்பூர்வ அரசு தளம்',
    curatedDemoLabel: 'தொகுக்கப்பட்ட வழிகாட்டி',
    selectResourceToExploreBtn: 'இந்தத் திட்டத்தின் படிகளைப் பார்க்க',
  },
  en: {
    brandSubMeaning: 'பெண்மை (Womanhood) + AI',
    tagline: 'Her Voice. Her Language. Her Access.',
    heroStoryHeadline:
      'She doesn’t know what to search. She doesn’t need to. She just speaks.',
    heroStorySub:
      'A voice-first digital accessibility layer between a first-time woman user and essential government services.',
    mainPromptQuestion: 'What help do you need today?',
    startSpeakingBtn: 'Start Speaking',
    stopSpeakingBtn: 'Stop Listening',
    listeningStateText: 'I am listening to you...',
    speakNowNotice: 'Speak now — your voice is being captured',
    orDivider: 'or',
    typeYourNeedBtn: 'Type your need (Text Fallback)',
    typePlaceholder: 'e.g., I need a job or skill training. I did not study much...',
    sendBtn: 'Send',
    tryDemoBtn: 'Try 60s Guided Demo',
    demoBadgeLabel: '60-second demo',
    navDiscover: 'Voice Guide',
    navTranslator: 'Explain Terms',
    navResources: 'Schemes',
    navImpact: 'Why penmAI',
    dontKnowBtn: '❓ I don’t know',
    dontKnowCoachBadge: 'Supportive Coaching (Zero-Knowledge UX)',
    dontKnowCoachReassurance:
      'There are no wrong answers here. Let us walk you through how to easily resolve or locate this missing information.',
    readAloudBtn: '🔊 Read aloud',
    stopReadingBtn: '⏹ Stop audio',
    restartBtn: 'Start Over',
    matchedResourceHeader: 'Recommended Support For You',
    whyRelevantHeader: 'Why this may be relevant for you',
    matchedInfoLabel: 'Information matched:',
    infoAge: 'Age',
    infoLocation: 'Location',
    infoEducation: 'Education',
    areYouReady: 'Are you ready for the steps?',
    nextStepBtn: 'Next Step',
    whatToDoNextHeader: 'What should I do next?',
    actionSpeakBtn: '🔊 Read aloud',
    actionViewDocsBtn: '📋 View documents',
    actionOfficialSiteBtn: '🌐 Go to official website',
    actionExplainBtn: '❓ Explain to me',
    requiredDocumentsHeader: 'Required Documents (Document Coach)',
    explainDocBtn: 'Explain document',
    howToGetDocLabel: 'Where to find it:',
    stepLabel: 'STEP',
    eligibilityHeader: 'Simple Eligibility Guide',
    explainThisTitle: 'Government Language Translator ("Explain this")',
    explainThisSubtitle:
      'Tap any confusing bureaucratic or digital term below to hear a simple explanation.',
    comparisonTitle: 'Don’t make the woman learn the system. Make the system understand the woman.',
    comparisonOldTitle: 'Traditional Government Portal',
    comparisonOldSub: 'User must adapt to the system',
    comparisonOldSteps: ['Search', 'Understand', 'Fill', 'Submit'],
    comparisonNewTitle: 'penmAI Approach',
    comparisonNewSub: 'The system adapts to the user',
    comparisonNewSteps: ['Speak', 'Understand', 'Guide', 'Access'],
    whyPenmaiTitle: 'Why penmAI?',
    whyCards: [
      {
        title: '🎙️ VOICE FIRST',
        desc: 'Speak naturally in your own language without navigating menus.',
      },
      {
        title: '🧠 INTENT FIRST',
        desc: 'Describe your life situation, not the official scheme acronym.',
      },
      {
        title: '❓ ZERO-KNOWLEDGE UX',
        desc: '“I don’t know” is a valid answer. penmAI coaches you on finding missing details.',
      },
      {
        title: '🧭 ACTION GUIDANCE',
        desc: 'Coaches documents, translates terms, and guides the next step.',
      },
    ],
    impactTitle: 'From digital exclusion to digital independence.',
    impactSub: 'Bridging the last-mile accessibility gap for first-time women users.',
    impactPairs: [
      { before: 'No English', after: 'Own language' },
      { before: 'No technical knowledge', after: 'Voice interaction' },
      { before: 'No one to ask', after: 'AI guidance' },
      { before: 'Don’t know the scheme', after: 'Need-based discovery' },
      { before: 'Don’t understand forms', after: 'Step-by-step guidance' },
    ],
    trustBannerText:
      'penmAI helps you understand and navigate services. It does not make government decisions.',
    verifyEligibilityText:
      'Always verify final eligibility and application details on the official government source.',
    privacyMessageText:
      'Your conversation is processed only to help you navigate this demo. Avoid entering passwords, OTPs, or bank PINs.',
    accessibilityLabel: 'Accessibility Settings',
    fontSizeLabel: 'Text Size',
    highContrastLabel: 'High Contrast',
    autoReadLabel: 'Read Aloud (Voice Output)',
    readAloudSettingTitle: 'Read Aloud',
    readAloudActiveLabel: 'Active (ON)',
    readAloudDisabledLabel: 'Muted (OFF)',
    slowSpeechLabel: 'Slower Voice',
    quickStarterLabel: 'Or tap an example situation to begin:',
    quickStarters: [
      {
        label: '💼 "I need a job or skill training. I am a homemaker."',
        utterance: 'I need a job. I stay at home and did not study much. What help can I get?',
      },
      {
        label: '🪙 "Tell me about monthly financial support for women"',
        utterance: 'I need monthly financial support for my family expenses. What help is available?',
      },
      {
        label: '🧵 "I want to start a tailoring business from home"',
        utterance: 'I want to learn tailoring and start small work at home. How can I get help?',
      },
    ],
    progressSteps: ['1. Your Need', '2. Simple Questions', '3. Matched Service', '4. Next Steps'],
    voiceRestrictedTitle: 'Voice Input Unavailable or Restricted (Text Fallback Active)',
    voiceRestrictedDesc:
      'Microphone access is unavailable or blocked by browser privacy settings. You can seamlessly type or use one-tap options below.',
    voiceActiveNotice: 'Microphone is active. Speak clearly.',
    switchToTextBtn: 'Type instead (Text input)',
    switchToVoiceBtn: 'Use Voice (Microphone)',
    curatedResourcesTitle: 'Curated Government & Skill Resources',
    curatedResourcesSubtitle:
      'Verified official portals paired with simplified, zero-jargon guidance',
    verifiedSourceLabel: 'Verified Official Information',
    curatedDemoLabel: 'Curated Guide',
    selectResourceToExploreBtn: 'Explore Step-by-Step Guide',
  },
  hi: {
    brandSubMeaning: 'பெண்மை (नारी शक्ति) + AI',
    tagline: 'Her Voice. Her Language. Her Access.',
    heroStoryHeadline:
      'उसे नहीं पता कि क्या खोजना है। उसे जानने की ज़रूरत भी नहीं है। वह बस बोलती है।',
    heroStorySub:
      'पहली बार डिजिटल सेवा का उपयोग करने वाली महिला और सरकारी योजनाओं के बीच एक सरल आवाज़-आधारित सेतु।',
    mainPromptQuestion: 'आज आपको क्या मदद चाहिए?',
    startSpeakingBtn: 'बोलना शुरू करें',
    stopSpeakingBtn: 'सुनना बंद करें',
    listeningStateText: 'मैं सुन रही हूँ...',
    speakNowNotice: 'अब बोलें — आपकी आवाज़ सुनी जा रही है',
    orDivider: 'या',
    typeYourNeedBtn: 'लिखकर बताएं (Text Fallback)',
    typePlaceholder: 'उदा: मुझे काम चाहिए। मैं ज़्यादा पढ़ी-लिखी नहीं हूँ...',
    sendBtn: 'भेजें',
    tryDemoBtn: '60-सेकंड डेमो देखें',
    demoBadgeLabel: '60-सेकंड डेमो (60-second demo)',
    navDiscover: 'आवाज़ गाइड',
    navTranslator: 'शब्द समझें',
    navResources: 'योजनाएं',
    navImpact: 'उद्देश्य',
    dontKnowBtn: '❓ मुझे नहीं पता',
    dontKnowCoachBadge: 'स्नेहपूर्ण मार्गदर्शन (Zero-Knowledge Coaching)',
    dontKnowCoachReassurance:
      'यहाँ कोई गलत उत्तर नहीं है। आइए देखें कि इस छूटी हुई जानकारी को आसानी से कैसे प्राप्त या समझा जा सकता है।',
    readAloudBtn: '🔊 सुनें',
    stopReadingBtn: '⏹ रोकें',
    restartBtn: 'फिर से शुरू करें',
    matchedResourceHeader: 'आपके लिए उपयुक्त सहायता',
    whyRelevantHeader: 'यह आपके लिए क्यों उपयोगी हो सकता है?',
    matchedInfoLabel: 'आवश्यक जानकारी:',
    infoAge: 'Age (आयु)',
    infoLocation: 'Location (जिला)',
    infoEducation: 'Education (शिक्षा)',
    areYouReady: 'क्या आप तैयार हैं?',
    nextStepBtn: 'अगला कदम',
    whatToDoNextHeader: 'आगे क्या करना चाहिए?',
    actionSpeakBtn: '🔊 सुनें',
    actionViewDocsBtn: '📋 दस्तावेज़ देखें',
    actionOfficialSiteBtn: '🌐 आधिकारिक वेबसाइट पर जाएं',
    actionExplainBtn: '❓ मुझे समझाएं',
    requiredDocumentsHeader: 'आवश्यक दस्तावेज़ (Document Coach)',
    explainDocBtn: 'अर्थ समझें',
    howToGetDocLabel: 'कहाँ मिलेगा:',
    stepLabel: 'कदम',
    eligibilityHeader: 'सरल पात्रता नियम',
    explainThisTitle: 'सरकारी शब्दों का सरल अर्थ ("Explain this")',
    explainThisSubtitle:
      'फॉर्म में दिखने वाले किसी भी कठिन शब्द को छुएं, penmAI उसे सरल भाषा में समझाएगी।',
    comparisonTitle: 'महिला को सिस्टम मत सिखाओ। सिस्टम को महिला की बात समझाओ।',
    comparisonOldTitle: 'पारंपरिक सरकारी पोर्टल',
    comparisonOldSub: 'उपयोगकर्ता को सिस्टम के अनुसार ढलना पड़ता है',
    comparisonOldSteps: ['खोजें', 'समझें', 'भरें', 'जमा करें'],
    comparisonNewTitle: 'penmAI का तरीका',
    comparisonNewSub: 'सिस्टम महिला की भाषा और ज़रूरत के अनुसार ढलता है',
    comparisonNewSteps: ['बोलें', 'समझें', 'मार्गदर्शन', 'लाभ पाएं'],
    whyPenmaiTitle: 'penmAI क्यों?',
    whyCards: [
      {
        title: '🎙️ VOICE FIRST (आवाज़ प्रथम)',
        desc: 'अपनी मातृभाषा में स्वाभाविक रूप से बोलें। टाइप करने की मजबूरी नहीं।',
      },
      {
        title: '🧠 INTENT FIRST (ज़रूरत प्रथम)',
        desc: 'योजना का नाम जानने की ज़रूरत नहीं। बस अपनी समस्या बताएं।',
      },
      {
        title: '❓ ZERO-KNOWLEDGE UX ("मुझे नहीं पता" सुविधा)',
        desc: '"मुझे नहीं पता" एक सही उत्तर है। penmAI आपको जानकारी ढूंढना सिखाती है।',
      },
      {
        title: '🧭 ACTION GUIDANCE (कदम-दर-कदम साथ)',
        desc: 'केवल जानकारी नहीं, बल्कि दस्तावेज़ों और आवेदन में पूरा मार्गदर्शन।',
      },
    ],
    impactTitle: 'डिजिटल दूरी से डिजिटल आत्मनिर्भरता तक',
    impactSub: 'From digital exclusion to digital independence.',
    impactPairs: [
      { before: 'अंग्रेज़ी नहीं आती', after: 'अपनी भाषा में बात' },
      { before: 'तकनीकी ज्ञान नहीं', after: 'आवाज़ से उपयोग' },
      { before: 'पूछने के लिए कोई नहीं', after: 'penmAI का मार्गदर्शन' },
      { before: 'योजना का नाम नहीं पता', after: 'ज़रूरत के आधार पर खोज' },
      { before: 'फॉर्म समझ नहीं आता', after: 'कदम-दर-कदम सरल मदद' },
    ],
    trustBannerText:
      'penmAI आपको सरकारी सेवाओं को समझने में मदद करती है। यह सरकारी निर्णय नहीं लेती है।',
    verifyEligibilityText:
      'अंतिम पात्रता और विवरण हमेशा आधिकारिक सरकारी वेबसाइट पर जांचें।',
    privacyMessageText:
      'आपकी बातचीत केवल इस डेमो में मदद के लिए है। पासवर्ड या बैंक पिन जैसी गोपनीय जानकारी दर्ज न करें।',
    accessibilityLabel: 'सुगम्यता सेटिंग्स',
    fontSizeLabel: 'अक्षर का आकार',
    highContrastLabel: 'स्पष्ट रंग',
    autoReadLabel: 'बोलकर पढ़ें (Read Aloud)',
    readAloudSettingTitle: 'बोलकर पढ़ें',
    readAloudActiveLabel: 'चालू (ON)',
    readAloudDisabledLabel: 'बंद (OFF)',
    slowSpeechLabel: 'धीमी आवाज़',
    quickStarterLabel: 'या शुरू करने के लिए नीचे किसी एक उदाहरण को छुएं:',
    quickStarters: [
      {
        label: '💼 "मुझे काम या सिलाई प्रशिक्षण चाहिए। मैं गृहिणी हूँ।"',
        utterance: 'मुझे काम चाहिए। मैं घर पर रहती हूँ और ज़्यादा पढ़ी-लिखी नहीं हूँ। मुझे क्या मदद मिल सकती है?',
      },
      {
        label: '🪙 "महिलाओं के लिए ₹1,000 मासिक सहायता के बारे में बताएं"',
        utterance: 'मुझे घर के खर्च के लिए मासिक आर्थिक सहायता चाहिए। कौन सी योजना है?',
      },
      {
        label: '🧵 "घर से सिलाई का छोटा काम शुरू करने के लिए मदद"',
        utterance: 'मैं घर से सिलाई का छोटा काम शुरू करना चाहती हूँ। मुझे क्या सहायता मिल सकती है?',
      },
    ],
    progressSteps: ['1. आपकी ज़रूरत', '2. सरल प्रश्न', '3. उपयुक्त योजना', '4. अगले कदम'],
    voiceRestrictedTitle: 'आवाज़ इनपुट अनुपलब्ध या प्रतिबंधित (Text Fallback Active)',
    voiceRestrictedDesc:
      'ब्राउज़र सुरक्षा या गोपनीयता कारणों से माइक्रोफ़ोन उपलब्ध नहीं है। आप नीचे लिखकर या दिए गए विकल्पों से बातचीत जारी रख सकती हैं।',
    voiceActiveNotice: 'माइक्रोफ़ोन चालू है। स्पष्ट रूप से बोलें।',
    switchToTextBtn: 'लिखकर बताएं (Type instead)',
    switchToVoiceBtn: 'बोलकर बताएं (Use Voice)',
    curatedResourcesTitle: 'सत्यापित सरकारी एवं कौशल विकास योजनाएं',
    curatedResourcesSubtitle:
      'आधिकारिक सरकारी पोर्टल और सरल भाषा में कदम-दर-कदम मार्गदर्शन',
    verifiedSourceLabel: 'सत्यापित आधिकारिक जानकारी',
    curatedDemoLabel: 'संकलित मार्गदर्शिका',
    selectResourceToExploreBtn: 'इस योजना के कदम देखें',
  },
};
