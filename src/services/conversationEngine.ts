import {
  ConversationState,
  Language,
  QuestionKey,
  ResourceCategoryKey,
} from '../types';
import { GOVERNMENT_RESOURCES } from '../data/resources';

export interface EngineTurnResult {
  replyText: string;
  subtext?: string;
  updatedState: ConversationState;
  isDontKnowCoaching?: boolean;
  quickReplies?: Array<{ label: string; value: string }>;
  showDontKnowButton?: boolean;
  dontKnowLabel?: string;
  matchedResourceId?: string;
}

export function getDontKnowButtonLabel(
  questionKey: QuestionKey,
  lang: Language
): string {
  switch (questionKey) {
    case 'initial':
      return lang === 'ta'
        ? '❓ எனக்குத் தெரியாது (வழிகாட்டவும்)'
        : lang === 'hi'
        ? '❓ मुझे नहीं पता (मार्गदर्शन दें)'
        : '❓ I don’t know (Guide me)';
    case 'age':
      return lang === 'ta'
        ? '❓ எனக்குத் தெரியாது (வயது அறிய)'
        : lang === 'hi'
        ? '❓ मुझे नहीं पता (आयु जानने में मदद)'
        : '❓ I don’t know (Help me find age)';
    case 'location':
      return lang === 'ta'
        ? '❓ எனக்குத் தெரியாது (மாவட்டம் அறிய)'
        : lang === 'hi'
        ? '❓ मुझे नहीं पता (जिला जानने में मदद)'
        : '❓ I don’t know (Help me find district)';
    case 'previousEmployment':
      return lang === 'ta'
        ? '❓ எனக்குத் தெரியாது (வேலை விவரம்)'
        : lang === 'hi'
        ? '❓ मुझे नहीं पता (काम की जानकारी)'
        : '❓ I don’t know (Work history)';
    case 'income':
      return lang === 'ta'
        ? '❓ எனக்குத் தெரியாது (வருமானம் அறிய)'
        : lang === 'hi'
        ? '❓ मुझे नहीं पता (आय जानने में मदद)'
        : '❓ I don’t know (Help me find income)';
    case 'complete':
      return lang === 'ta'
        ? '❓ எனக்குத் தெரியாது (ஆவணங்களை எங்கே பெறுவது?)'
        : lang === 'hi'
        ? '❓ मुझे नहीं पता (दस्तावेज़ कहाँ से मिलेंगे?)'
        : '❓ I don’t know (Where to get documents?)';
    default:
      return lang === 'ta'
        ? '❓ எனக்குத் தெரியாது'
        : lang === 'hi'
        ? '❓ मुझे नहीं पता'
        : '❓ I don’t know';
  }
}

export function detectIntentFromText(text: string): ResourceCategoryKey | 'none' {
  const lower = text.toLowerCase();

  // Out of scope check
  if (
    lower.includes('flight ticket') ||
    lower.includes('crypto') ||
    lower.includes('stock market') ||
    lower.includes('விமான டிக்கெட்')
  ) {
    return 'none';
  }

  // Entrepreneurship / Loan / Business
  if (
    lower.includes('தொழில்') ||
    lower.includes('கடை') ||
    lower.includes('கடன்') ||
    lower.includes('வியாபாரம்') ||
    lower.includes('business') ||
    lower.includes('loan') ||
    lower.includes('mudra') ||
    lower.includes('व्यवसाय') ||
    lower.includes('दुकान') ||
    lower.includes('ऋण')
  ) {
    return 'entrepreneurship';
  }

  // Financial / ₹1,000 / Pension
  if (
    lower.includes('1000') ||
    lower.includes('1,000') ||
    lower.includes('பண உதவி') ||
    lower.includes('உரிமை') ||
    lower.includes('மாதம்') ||
    lower.includes('financial') ||
    lower.includes('monthly') ||
    lower.includes('आर्थिक') ||
    lower.includes('पैसा') ||
    lower.includes('मासिक')
  ) {
    return 'financial';
  }

  // Skill / Employment
  if (
    lower.includes('வேலை') ||
    lower.includes('பயிற்சி') ||
    lower.includes('தையல்') ||
    lower.includes('வீட்டில்') ||
    lower.includes('படிக்கவில்லை') ||
    lower.includes('job') ||
    lower.includes('work') ||
    lower.includes('skill') ||
    lower.includes('training') ||
    lower.includes('tailoring') ||
    lower.includes('काम') ||
    lower.includes('नौकरी') ||
    lower.includes('प्रशिक्षण') ||
    lower.includes('सिलाई')
  ) {
    return 'skill';
  }

  return 'skill';
}

export function mapIntentToResourceId(
  intent: ResourceCategoryKey,
  previousEmployment?: string
): string {
  switch (intent) {
    case 'skill':
      if (
        previousEmployment &&
        (previousEmployment.toLowerCase().includes('ஆம்') ||
          previousEmployment.toLowerCase().includes('yes') ||
          previousEmployment.toLowerCase().includes('हाँ'))
      ) {
        return 'mahalir-thittam-livelihood';
      }
      return 'tn-women-skill-training';
    case 'employment':
      return 'mahalir-thittam-livelihood';
    case 'financial':
      return 'kalaignar-magalir-urimai';
    default:
      return 'tn-women-skill-training';
  }
}

export function getDontKnowExplanation(
  questionKey: QuestionKey,
  lang: Language
): {
  coachingText: string;
  followUpQuestion: string;
  quickReplies: Array<{ label: string; value: string }>;
} {
  if (questionKey === 'initial') {
    const coaching = {
      ta: 'கவலைப்படாதீர்கள்! உங்களுக்கு எந்த அரசுத் திட்டத்தின் பெயரோ, விதிமுறைகளோ தெரிய வேண்டிய அவசியமில்லை. உங்களுக்கு என்ன உதவி தேவை (வேலை அல்லது திறன் பயிற்சி, குடும்ப மாத உதவித்தொகை, அல்லது தையல்/சுயதொழில்) என்று இயல்பாகச் சொன்னால் போதும். நான் உங்களுக்கு வழிகாட்டுகிறேன்.',
      en: 'Do not worry at all! You do not need to know the name of any government scheme or official jargon. Simply tell me what kind of help you need in your life — such as a job, skill training, monthly cash assistance, or starting a small work from home — and penmAI will guide you step-by-step.',
      hi: 'बिल्कुल चिंता न करें! आपको किसी सरकारी योजना का नाम या नियम जानने की आवश्यकता नहीं है। बस यह बताएं कि आपको जीवन में क्या मदद चाहिए — जैसे नौकरी, सिलाई प्रशिक्षण, मासिक सहायता या स्वरोजगार। मैं आपको सही सहायता ढूंढ कर दूंगी।',
    };
    const followUp = {
      ta: 'உங்களுக்கு இப்போது எந்த உதவி மிகவும் பயனுள்ளதாக இருக்கும்?',
      en: 'Which support would be most useful for you right now?',
      hi: 'अभी आपके लिए कौन सी सहायता सबसे उपयोगी होगी?',
    };
    return {
      coachingText: coaching[lang],
      followUpQuestion: followUp[lang],
      quickReplies:
        lang === 'ta'
          ? [
              { label: '💼 வேலை அல்லது திறன் பயிற்சி', value: 'வேலை அல்லது பயிற்சி வேண்டும்' },
              { label: '🪙 மாதம் ₹1,000 மகளிர் உதவித்தொகை', value: 'மாதம் பண உதவி வேண்டும்' },
              { label: '🧵 தையல் / சுயதொழில் பயிற்சி', value: 'தையல் சுயதொழில் பயிற்சி' },
            ]
          : lang === 'hi'
          ? [
              { label: '💼 काम या कौशल प्रशिक्षण', value: 'मुझे काम या प्रशिक्षण चाहिए' },
              { label: '🪙 मासिक आर्थिक सहायता', value: 'मुझे मासिक सहायता चाहिए' },
              { label: '🧵 सिलाई / स्वरोजगार', value: 'सिलाई स्वरोजगार सीखना है' },
            ]
          : [
              { label: '💼 Job or Skill Training', value: 'I need a job or skill training' },
              { label: '🪙 Monthly Financial Support', value: 'I need monthly financial support' },
              { label: '🧵 Tailoring / Self-Employment', value: 'I want to learn tailoring and small business' },
            ],
    };
  }

  if (questionKey === 'age') {
    const coaching = {
      ta: 'பரவாயில்லை! உங்கள் சரியான வயது அல்லது பிறந்த தேதி நினைவில் இல்லையென்றால் அது முற்றிலும் இயல்பானது. உங்கள் ஆதார் அட்டையில் உள்ள "பிறந்த வருடம்" (Year of Birth) பார்த்து வயதைக் கணக்கிடலாம். இப்போது தோராயமான வயதைத் தேர்ந்தெடுத்தாலே திட்டங்களை அணுக முடியும்.',
      en: 'That is completely fine! You do not need to recall your exact birthdate. Your year of birth is printed directly on your Aadhaar card. Choosing an approximate age range below is all you need to find the right support.',
      hi: 'कोई बात नहीं! यदि सही उम्र या जन्मतिथि याद नहीं है, तो यह बहुत सामान्य है। आपके आधार कार्ड पर जन्म का वर्ष लिखा होता है। अभी के लिए नीचे से एक अनुमानित उम्र चुनना ही काफी है।',
    };
    const followUp = {
      ta: 'உங்கள் தோராயமான வயது எதுவாக இருக்கும்?',
      en: 'What is your approximate age group?',
      hi: 'आपकी अनुमानित आयु क्या है?',
    };
    return {
      coachingText: coaching[lang],
      followUpQuestion: followUp[lang],
      quickReplies:
        lang === 'ta'
          ? [
              { label: '18 – 25 வயது', value: '22' },
              { label: '26 – 35 வயது (எ.கா. 32)', value: '32' },
              { label: '36 – 50 வயது', value: '40' },
              { label: '50 வயதுக்கு மேல்', value: '55' },
            ]
          : lang === 'hi'
          ? [
              { label: '18 – 25 वर्ष', value: '22' },
              { label: '26 – 35 वर्ष (उदा: 32)', value: '32' },
              { label: '36 – 50 वर्ष', value: '40' },
              { label: '50 वर्ष से अधिक', value: '55' },
            ]
          : [
              { label: '18 – 25 years', value: '22' },
              { label: '26 – 35 years (e.g. 32)', value: '32' },
              { label: '36 – 50 years', value: '40' },
              { label: 'Above 50 years', value: '55' },
            ],
    };
  }

  if (questionKey === 'location') {
    const coaching = {
      ta: 'பரவாயில்லை. உங்கள் சரியான தாலுகா அல்லது மாவட்டம் தெரியவில்லை என்றால், உங்கள் ஆதார் அட்டை அல்லது ஸ்மார்ட் ரேஷன் கார்டின் பின்புறத்தில் முகவரியைப் பார்க்கலாம். நீங்கள் வசிக்கும் பகுதி அல்லது அருகிலுள்ள பெரிய ஊரைத் தேர்வு செய்தாலே போதுமானது.',
      en: 'That is completely okay. Your official district is printed on the back of your Aadhaar card or Smart Ration card. You can also simply pick your nearest city or district from the list below.',
      hi: 'कोई बात नहीं। आपके आधार कार्ड या स्मार्ट राशन कार्ड के पीछे आपके जिले का नाम लिखा होता है। आप नीचे से अपने सबसे नज़दीकी शहर या जिले का नाम चुन सकती हैं।',
    };
    const followUp = {
      ta: 'நீங்கள் எந்தப் பகுதி அல்லது மாவட்டத்திற்கு அருகில் வசிக்கிறீர்கள்?',
      en: 'Which district or nearby area do you live in?',
      hi: 'आप किस जिले या नज़दीकी क्षेत्र में रहती हैं?',
    };
    return {
      coachingText: coaching[lang],
      followUpQuestion: followUp[lang],
      quickReplies:
        lang === 'ta'
          ? [
              { label: 'Chennai (சென்னை)', value: 'Chennai' },
              { label: 'Madurai (மதுரை)', value: 'Madurai' },
              { label: 'Coimbatore (கோயம்புத்தூர்)', value: 'Coimbatore' },
              { label: 'Tiruchirappalli (திருச்சி)', value: 'Tiruchirappalli' },
              { label: 'Salem (சேலம்)', value: 'Salem' },
            ]
          : lang === 'hi'
          ? [
              { label: 'चेन्नई (Chennai)', value: 'Chennai' },
              { label: 'मदुरै (Madurai)', value: 'Madurai' },
              { label: 'कोयम्बटूर (Coimbatore)', value: 'Coimbatore' },
              { label: 'अन्य जिला (Other)', value: 'Chennai' },
            ]
          : [
              { label: 'Chennai', value: 'Chennai' },
              { label: 'Madurai', value: 'Madurai' },
              { label: 'Coimbatore', value: 'Coimbatore' },
              { label: 'Tiruchirappalli', value: 'Tiruchirappalli' },
              { label: 'Salem', value: 'Salem' },
            ],
    };
  }

  if (questionKey === 'previousEmployment') {
    const coaching = {
      ta: 'பரவாயில்லை! வீட்டைப் பராமரிப்பதும் குடும்பத்தை வழிநடத்துவதும் மிகப் பெரிய உழைப்புதான். நீங்கள் அலுவலகம் சென்று மாதச் சம்பளத்திற்கு வேலை செய்யவில்லை என்றால் தயங்காமல் "இல்லை (வீட்டில் இருக்கிறேன்)" என்பதைத் தேர்ந்தெடுக்கலாம். அரசுத் திட்டங்கள் இல்லத்தரசிகளுக்கு சிறப்பு முன்னுரிமை அளிக்கின்றன.',
      en: 'That is completely fine! Managing a home and family is significant hard work. If you have not worked an outside salaried job before, simply choose "No (Homemaker)". Many government livelihood and skill schemes actively prioritize homemakers who want to begin afresh.',
      hi: 'कोई चिंता की बात नहीं। घर और परिवार की ज़िम्मेदारी संभालना बहुत बड़ा परिश्रम है। यदि आपने बाहर कोई नौकरी नहीं की है, तो बेझिझक "नहीं (गृहिणी हूँ)" चुनें। सरकारी योजनाएं गृहिणियों को विशेष प्राथमिकता देती हैं।',
    };
    const followUp = {
      ta: 'நீங்கள் முன்பு வெளியே சென்று வேலை செய்திருக்கிறீர்களா?',
      en: 'Have you worked an outside job before?',
      hi: 'क्या आपने पहले बाहर कोई काम किया है?',
    };
    return {
      coachingText: coaching[lang],
      followUpQuestion: followUp[lang],
      quickReplies:
        lang === 'ta'
          ? [
              { label: 'இல்லை (வீட்டில் இருக்கிறேன்)', value: 'இல்லை' },
              { label: 'ஆம், முன்பு செய்துள்ளேன்', value: 'ஆம்' },
              { label: 'குடும்ப வருமானம் பற்றி அறிய', value: 'ASK_INCOME_QUESTION' },
            ]
          : lang === 'hi'
          ? [
              { label: 'नहीं (गृहिणी हूँ)', value: 'नहीं' },
              { label: 'हाँ, पहले किया है', value: 'हाँ' },
              { label: 'आय के बारे में पूछें', value: 'ASK_INCOME_QUESTION' },
            ]
          : [
              { label: 'No (Homemaker / Stay at home)', value: 'No' },
              { label: 'Yes, previously worked', value: 'Yes' },
              { label: 'Ask about family income', value: 'ASK_INCOME_QUESTION' },
            ],
    };
  }

  if (questionKey === 'income') {
    const coaching = {
      ta: 'இது மிகவும் பொதுவான சந்தேகம், கவலைப்பட வேண்டாம்! பலருக்கு குடும்ப ஆண்டு வருமானம் சரியாகத் தெரியாது. இதை எப்படிக் கண்டறிவது:\n1) உங்கள் குடும்பத்தில் "வருமானச் சான்றிதழ்" (Income Certificate) இருந்தால் அதில் உள்ள தொகையைப் பார்க்கலாம்.\n2) உங்களிடம் பச்சை/அரிசி ரேஷன் கார்டு (PHH / NPHH) இருந்தால் பொதுவாக வருமானம் தகுதி வரம்பிற்குள் இருக்கும்.\n3) கிராம நிர்வாக அலுவலர் (VAO) அல்லது உள்ளூர் இ-சேவை மையம் மூலம் இதை எளிதாக அறியலாம்.\n\nஇப்போது தோராயமான வரம்பைத் தேர்வு செய்தால் போதும், நாம் பொருத்தமான திட்டத்தைக் காணலாம்.',
      en: 'This is a very common question, so please do not worry at all! Most people do not know their family’s exact annual income figure. Here is how to find it:\n1. If your family has an official Income Certificate, the approved annual income is printed right on it.\n2. If you hold a Smart Rice Ration Card (PHH / NPHH), your family is generally within the government eligible income ceiling.\n3. You can also easily obtain this information from your Village Administrative Officer (VAO) or local e-Sevai centre.\n\nFor now, choosing an approximate range is more than enough to proceed.',
      hi: 'यह बहुत सामान्य बात है, बिल्कुल परेशान न हों! अधिकांश लोगों को परिवार की वार्षिक आय ठीक से पता नहीं होती। इसे ऐसे समझें:\n1. यदि आपके पास आय प्रमाण पत्र है तो उसमें राशि लिखी होती है।\n2. यदि आपके पास राशन कार्ड है तो आप प्रायः सरकारी सीमा के अंतर्गत आती हैं।\n3. यह जानकारी आपके स्थानीय ई-सेवा केंद्र या पंचायत कार्यालय से भी मिल सकती है।\n\nअभी के लिए अनुमानित विकल्प चुनकर आगे बढ़ सकते हैं।',
    };
    const followUp = {
      ta: 'இப்போது நாம் உங்கள் பொருத்தமான திட்டத்தைப் பார்க்கலாமா?',
      en: 'Shall we proceed to see your matching scheme now?',
      hi: 'क्या अब हम आपके लिए उपयुक्त योजना देखें?',
    };
    return {
      coachingText: coaching[lang],
      followUpQuestion: followUp[lang],
      quickReplies:
        lang === 'ta'
          ? [
              { label: 'சரி, அடுத்த படிக்குச் செல்லலாம்', value: 'தொடரவும்' },
              { label: 'ஆண்டுக்கு ₹2.5 லட்சத்திற்குள்', value: '₹2.5 லட்சத்திற்குள்' },
              { label: 'பச்சை ரேஷன் கார்டு உள்ளது', value: 'ரேஷன் அட்டை உள்ளது' },
            ]
          : lang === 'hi'
          ? [
              { label: 'हाँ, आगे बढ़ें', value: 'आगे बढ़ें' },
              { label: 'वार्षिक ₹2.5 लाख से कम', value: '₹2.5 लाख से कम' },
              { label: 'राशन कार्ड धारक', value: 'राशन कार्ड' },
            ]
          : [
              { label: 'Yes, show me matching scheme', value: 'Continue' },
              { label: 'Under ₹2.5 Lakh per year', value: 'Under ₹2.5 Lakh' },
              { label: 'Hold Rice Ration Card', value: 'Rice Ration Card' },
            ],
    };
  }

  // complete
  const coaching = {
    ta: 'கவலைப்படாதீர்கள்! உங்களுக்கு உதவ கீழே "ஆவண வழிகாட்டி" (Document Coach) உள்ளது. தொடங்குவதற்கு உங்களிடம் ஆதார் அட்டை, ரேஷன் கார்டு மற்றும் வங்கி கணக்கு புத்தகம் மட்டுமே தேவை. அருகிலுள்ள இ-சேவை மையத்திற்குச் சென்றால் அவர்கள் முழுமையாக விண்ணப்பித்து தருவார்கள். எந்த ஆவணத்தை எங்கே பெறுவது என்று அறிய கீழே உள்ள ஆவண விவரங்களைத் தொடவும்.',
    en: 'Do not worry! We have a built-in Document Coach right below. To get started, you usually only need your Aadhaar card, Ration card, and Bank passbook. Your nearest local e-Sevai / Common Service Centre can complete the online application for you without any technical knowledge. Tap any document below to hear how to get it.',
    hi: 'चिंता न करें! नीचे "दस्तावेज़ गाइड" दी गई है। शुरुआत के लिए आपको केवल आधार कार्ड, राशन कार्ड और बैंक पासबुक की ज़रूरत होती है। नज़दीकी ई-सेवा केंद्र में जाकर आप आसानी से आवेदन करवा सकती हैं।',
  };
  const followUp = {
    ta: 'ஆவண வழிகாட்டியைப் பார்க்கலாமா அல்லது அதிகாரப்பூர்வ தளம் செல்லலாமா?',
    en: 'Would you like to explore the Document Coach or visit the official portal?',
    hi: 'क्या आप दस्तावेज़ गाइड देखना चाहती हैं या आधिकारिक पोर्टल पर जाना चाहती हैं?',
  };
  return {
    coachingText: coaching[lang],
    followUpQuestion: followUp[lang],
    quickReplies:
      lang === 'ta'
        ? [
            { label: '📋 தேவையான ஆவணங்களைப் பார்க்க', value: 'ஆவணங்கள்' },
            { label: '🌐 அதிகாரப்பூர்வ தளம் செல்ல', value: 'அதிகாரப்பூர்வ தளம்' },
            { label: '❓ கடினமான வார்த்தைகளுக்கு விளக்கம்', value: 'சொற்கள்' },
          ]
        : lang === 'hi'
        ? [
            { label: '📋 आवश्यक दस्तावेज़ देखें', value: 'दस्तावेज़' },
            { label: '🌐 आधिकारिक पोर्टल पर जाएं', value: 'आधिकारिक पोर्टल' },
            { label: '❓ कठिन शब्दों का अर्थ जानें', value: 'कठिन शब्द' },
          ]
        : [
            { label: '📋 View Required Documents', value: 'Documents' },
            { label: '🌐 Go to Official Portal', value: 'Official Portal' },
            { label: '❓ Explain Difficult Words', value: 'Explain Words' },
          ],
  };
}

export function runConversationTurn(
  userInput: string,
  currentState: ConversationState,
  isDontKnowClick = false
): EngineTurnResult {
  const lang = currentState.language;
  const trimmed = userInput.trim();
  const lower = trimmed.toLowerCase();

  // Check for "I don't know" click or utterance in Tamil, English, and Hindi
  const isDontKnowPhrase =
    isDontKnowClick ||
    trimmed.includes('தெரியாது') ||
    trimmed.includes('தெரியல') ||
    trimmed.includes('புரியல') ||
    lower.includes("don't know") ||
    lower.includes('dont know') ||
    lower.includes('not sure') ||
    lower.includes('no idea') ||
    trimmed.includes('नहीं पता') ||
    trimmed.includes('मालूम नहीं');

  if (isDontKnowPhrase) {
    const qKey = currentState.currentQuestionKey;
    const coaching = getDontKnowExplanation(qKey, lang);
    const alreadyAsked = currentState.askedDontKnowOn?.includes(qKey);

    return {
      replyText: coaching.coachingText,
      subtext: coaching.followUpQuestion,
      isDontKnowCoaching: true,
      showDontKnowButton: false,
      quickReplies: coaching.quickReplies,
      updatedState: {
        ...currentState,
        askedDontKnowOn: alreadyAsked
          ? currentState.askedDontKnowOn
          : [...(currentState.askedDontKnowOn || []), qKey],
      },
    };
  }

  // Turn 1: Initial Need Expression -> Ask Age (Question 1)
  if (currentState.currentQuestionKey === 'initial') {
    const detected = detectIntentFromText(trimmed);

    if (detected === 'none') {
      const noMatchText = {
        ta: 'இந்த நேரத்தில் எனது தகவல்களில் உங்களுக்கு பொருத்தமான சேவை கிடைக்கவில்லை. அதிகாரப்பூர்வ அரசு தளத்தில் சரிபார்க்கலாம்.',
        en: 'At this time, I could not find a matching service in my records. Please check the official government portal.',
        hi: 'इस समय मेरे रिकॉर्ड में आपके लिए उपयुक्त सेवा नहीं मिली। कृपया आधिकारिक सरकारी वेबसाइट पर जांच करें।',
      };
      return {
        replyText: noMatchText[lang],
        showDontKnowButton: true,
        dontKnowLabel: getDontKnowButtonLabel('initial', lang),
        updatedState: currentState,
      };
    }

    const introText = {
      ta: 'நிச்சயமாக. உங்களுக்கு பொருத்தமான வேலை அல்லது திறன் பயிற்சியை கண்டுபிடிக்க நான் உதவுகிறேன்.',
      en: 'Certainly. I will help you find a suitable job or skill training program.',
      hi: 'बिल्कुल। मैं आपके लिए उपयुक्त काम या कौशल प्रशिक्षण ढूंढने में आपकी मदद करूँगी।',
    };

    const ageQuestion = {
      ta: 'உங்கள் வயது என்ன?',
      en: 'What is your age?',
      hi: 'आपकी उम्र क्या है?',
    };

    return {
      replyText: introText[lang],
      subtext: ageQuestion[lang],
      showDontKnowButton: true,
      dontKnowLabel: getDontKnowButtonLabel('age', lang),
      quickReplies: [
        { label: '32', value: '32' },
        { label: '25', value: '25' },
        { label: '40', value: '40' },
      ],
      updatedState: {
        ...currentState,
        intent: detected,
        education:
          lang === 'ta'
            ? 'பள்ளி அளவு (School level)'
            : lang === 'hi'
            ? 'स्कूल स्तर'
            : 'School level',
        currentQuestionKey: 'age',
      },
    };
  }

  // Turn 2: Age answered -> Ask Location / District (Question 2)
  if (currentState.currentQuestionKey === 'age') {
    const locationQuestion = {
      ta: 'நீங்கள் எந்த மாவட்டத்தில் வசிக்கிறீர்கள்?',
      en: 'Which district do you live in?',
      hi: 'आप किस जिले में रहती हैं?',
    };

    return {
      replyText: lang === 'ta' ? 'நன்றி.' : lang === 'hi' ? 'धन्यवाद।' : 'Thank you.',
      subtext: locationQuestion[lang],
      showDontKnowButton: true,
      dontKnowLabel: getDontKnowButtonLabel('location', lang),
      quickReplies:
        lang === 'ta'
          ? [
              { label: 'Chennai (சென்னை)', value: 'Chennai' },
              { label: 'Madurai (மதுரை)', value: 'Madurai' },
              { label: 'Coimbatore (கோயம்புத்தூர்)', value: 'Coimbatore' },
            ]
          : [
              { label: 'Chennai', value: 'Chennai' },
              { label: 'Madurai', value: 'Madurai' },
              { label: 'Coimbatore', value: 'Coimbatore' },
            ],
      updatedState: {
        ...currentState,
        age: trimmed,
        currentQuestionKey: 'location',
      },
    };
  }

  // Turn 3: Location answered -> Ask Previous Employment (Question 3)
  if (currentState.currentQuestionKey === 'location') {
    const prevWorkQuestion = {
      ta: 'நீங்கள் முன்பு ஏதாவது வேலை செய்திருக்கிறீர்களா?',
      en: 'Have you done any job before?',
      hi: 'क्या आपने पहले कोई काम किया है?',
    };

    return {
      replyText: lang === 'ta' ? 'நல்லது.' : lang === 'hi' ? 'बहुत अच्छा।' : 'Got it.',
      subtext: prevWorkQuestion[lang],
      showDontKnowButton: true,
      dontKnowLabel: getDontKnowButtonLabel('previousEmployment', lang),
      quickReplies:
        lang === 'ta'
          ? [
              { label: 'இல்லை', value: 'இல்லை' },
              { label: 'ஆம்', value: 'ஆம்' },
              { label: 'குடும்ப வருமானம் பற்றியும் கேள்', value: 'ASK_INCOME_QUESTION' },
            ]
          : lang === 'hi'
          ? [
              { label: 'नहीं', value: 'नहीं' },
              { label: 'हाँ', value: 'हाँ' },
            ]
          : [
              { label: 'No', value: 'No' },
              { label: 'Yes', value: 'Yes' },
            ],
      updatedState: {
        ...currentState,
        location: trimmed,
        currentQuestionKey: 'previousEmployment',
      },
    };
  }

  // Optional Branch: Ask Income Question
  if (
    currentState.currentQuestionKey === 'previousEmployment' &&
    trimmed === 'ASK_INCOME_QUESTION'
  ) {
    const incomeQuestion = {
      ta: 'உங்கள் குடும்பத்தில் ஒரு வருடத்திற்கு சுமார் எவ்வளவு வருமானம் வருகிறது?',
      en: 'Approximately how much is your family’s annual income in a year?',
      hi: 'आपके परिवार में एक साल में लगभग कितनी आय होती है?',
    };
    return {
      replyText:
        lang === 'ta'
          ? 'இதோ அடுத்த கேள்வி:'
          : lang === 'hi'
          ? 'अगला प्रश्न:'
          : 'Here is the next question:',
      subtext: incomeQuestion[lang],
      showDontKnowButton: true,
      dontKnowLabel: getDontKnowButtonLabel('income', lang),
      quickReplies: [
        { label: lang === 'ta' ? '₹2 லட்சத்திற்குள்' : 'Under ₹2 Lakh', value: '₹2.5 லட்சத்திற்குள்' },
        { label: lang === 'ta' ? 'மாதம் ₹10,000' : '₹10,000/month', value: 'மாதம் ₹10,000' },
      ],
      updatedState: {
        ...currentState,
        employmentStatus: lang === 'ta' ? 'இல்லை' : 'No',
        currentQuestionKey: 'income',
      },
    };
  }

  // Turn 4: Match Resource & Complete
  const matchedId = mapIntentToResourceId(
    currentState.intent || 'skill',
    trimmed
  );
  const resource =
    GOVERNMENT_RESOURCES.find((r) => r.id === matchedId) ||
    GOVERNMENT_RESOURCES[0];

  const completionMsg = {
    ta: `நன்றி! நீங்கள் சொன்ன விவரங்களின் அடிப்படையில் "${resource.name.ta}" உங்களுக்கு மிகவும் பொருத்தமாக இருக்கும். கீழே அதன் முழு விவரங்களையும் அடுத்த படிகளையும் பாருங்கள்.`,
    en: `Thank you! Based on what you shared, "${resource.name.en}" is a strong match for you. See why it fits and your step-by-step action guide below.`,
    hi: `धन्यवाद! आपके द्वारा दी गई जानकारी के आधार पर "${resource.name.hi}" आपके लिए उपयुक्त है। नीचे इसके विवरण और अगले कदम देखें।`,
  };

  return {
    replyText: completionMsg[lang],
    showDontKnowButton: true,
    dontKnowLabel: getDontKnowButtonLabel('complete', lang),
    matchedResourceId: resource.id,
    updatedState: {
      ...currentState,
      employmentStatus:
        currentState.currentQuestionKey === 'previousEmployment'
          ? trimmed
          : currentState.employmentStatus || (lang === 'ta' ? 'இல்லை' : 'No'),
      currentQuestionKey: 'complete',
      matchedResourceId: resource.id,
    },
  };
}
