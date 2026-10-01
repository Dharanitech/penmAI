import { GlossaryTerm } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'beneficiary-id',
    term: 'Beneficiary ID',
    localizedTerm: {
      ta: 'பயனாளி அடையாள எண் (Beneficiary ID)',
      en: 'Beneficiary ID',
      hi: 'लाभार्थी पहचान संख्या (Beneficiary ID)',
    },
    simpleExplanation: {
      ta: 'இது திட்டத்தின் பயனாளியாக உங்களை அடையாளம் காண பயன்படுத்தப்படும் எண். அரசுத் திட்டத்தில் நீங்கள் சேர்ந்த பிறகு உங்களுக்குத் தனியாகத் தரப்படும் அடையாள எண் இது.',
      en: 'This is a unique number given to you to identify you as the person receiving help from a government scheme.',
      hi: 'यह सरकारी योजना का लाभ पाने वाले व्यक्ति के रूप में आपकी पहचान करने के लिए दिया जाने वाला एक विशेष नंबर है।',
    },
    exampleContext: {
      ta: 'உதாரணம்: வங்கி கணக்கு எண் போல, அரசு உதவி பெறுபவர்களுக்கான தனி எண்.',
      en: 'Example: Just like an account number, it helps officials look up your record quickly.',
      hi: 'उदाहरण: बैंक खाता संख्या की तरह, यह योजना में आपका नाम तुरंत खोजने में मदद करता है।',
    },
  },
  {
    id: 'upload-document',
    term: 'Upload supporting document',
    localizedTerm: {
      ta: 'ஆதார ஆவணத்தைப் பதிவேற்றவும் (Upload supporting document)',
      en: 'Upload supporting document',
      hi: 'सहायक दस्तावेज़ अपलोड करें (Upload supporting document)',
    },
    simpleExplanation: {
      ta: 'நீங்கள் சொன்ன தகவல் உண்மை என்பதைக் காட்ட, உங்கள் ஆதார் அட்டை அல்லது சான்றிதழின் தெளிவான புகைப்படத்தை போன் மூலம் இணைப்பது என்று அர்த்தம்.',
      en: 'This simply means taking a clear photo of your ID card or certificate on your phone and attaching it to the form.',
      hi: 'इसका सीधा मतलब है अपने आधार कार्ड या प्रमाण पत्र की साफ फोटो फोन से खींचकर फॉर्म में जोड़ना।',
    },
    exampleContext: {
      ta: 'உதாரணம்: வாட்ஸ்அப்பில் படம் அனுப்புவது போல, விண்ணப்பத்தில் உங்கள் சான்றிதழ் படத்தை வைப்பது.',
      en: 'Example: Similar to sending a photo on WhatsApp, you attach a picture of your document.',
      hi: 'उदाहरण: जैसे व्हाट्सएप पर फोटो भेजते हैं, वैसे ही फॉर्म में अपने दस्तावेज की फोटो लगाना।',
    },
  },
  {
    id: 'application-status',
    term: 'Application status',
    localizedTerm: {
      ta: 'விண்ணப்ப நிலை (Application status)',
      en: 'Application status',
      hi: 'आवेदन की स्थिति (Application status)',
    },
    simpleExplanation: {
      ta: 'நீங்கள் கொடுத்த விண்ணப்பம் அதிகாரிகளால் பார்க்கப்படுகிறதா, ஏற்றுக்கொள்ளப்பட்டதா என்பதைத் தெரிந்துகொள்வது.',
      en: 'This tells you whether officials are still reviewing your form or if it has been approved.',
      hi: 'इससे पता चलता है कि आपका फॉर्म अभी जांचा जा रहा है या मंजूर हो चुका है।',
    },
    exampleContext: {
      ta: 'உதாரணம்: "Pending" என்றால் இன்னும் சரிபார்க்கிறார்கள்; "Approved" என்றால் உதவி உறுதியாகிவிட்டது.',
      en: 'Example: "Pending" means still in review; "Approved" means your support is sanctioned.',
      hi: 'उदाहरण: "Pending" का अर्थ है जांच जारी है; "Approved" का अर्थ है आवेदन स्वीकार हो गया है।',
    },
  },
  {
    id: 'annual-income',
    term: 'Annual income',
    localizedTerm: {
      ta: 'ஆண்டு வருமானம் (Annual income)',
      en: 'Annual income',
      hi: 'वार्षिक आय (Annual income)',
    },
    simpleExplanation: {
      ta: 'உங்கள் குடும்பத்தில் உள்ள அனைவரும் சேர்ந்து ஒரு முழு வருடத்தில் (12 மாதங்களில்) சம்பாதிக்கும் மொத்தப் பணம்.',
      en: 'The total money your entire family earns together in one full year (12 months).',
      hi: 'पूरे एक साल (12 महीनों) में आपके परिवार के सभी सदस्यों द्वारा मिलकर कमाई गई कुल राशि।',
    },
    exampleContext: {
      ta: 'உதாரணம்: மாதம் ₹10,000 என்றால், ஒரு வருடத்திற்கு ₹1,20,000 ஆண்டு வருமானம் ஆகும்.',
      en: 'Example: If your family earns ₹10,000 a month, your annual income is ₹1,20,000.',
      hi: 'उदाहरण: यदि परिवार महीने में ₹10,000 कमाता है, तो 12 महीनों की वार्षिक आय ₹1,20,000 होगी।',
    },
  },
  {
    id: 'registration',
    term: 'Registration',
    localizedTerm: {
      ta: 'பதிவு செய்தல் (Registration)',
      en: 'Registration',
      hi: 'पंजीकरण (Registration)',
    },
    simpleExplanation: {
      ta: 'ஒரு திட்டத்தில் சேருவதற்காக முதல் முறையாக உங்கள் பெயர், தொலைபேசி எண் மற்றும் முகவரியை அரசிடம் கொடுத்துப் பெயரைச் சேர்ப்பது.',
      en: 'Giving your name, phone number, and basic details so the government system knows you want to enroll.',
      hi: 'किसी योजना में जुड़ने के लिए पहली बार अपना नाम, फोन नंबर और पता दर्ज कराना।',
    },
    exampleContext: {
      ta: 'உதாரணம்: பள்ளியில் அல்லது பயிற்சி வகுப்பில் முதலில் பெயர் கொடுப்பது போன்றது.',
      en: 'Example: Just like writing your name in a notebook when joining a new community center.',
      hi: 'उदाहरण: किसी केंद्र में पहली बार अपना नाम दर्ज कराना।',
    },
  },
];
