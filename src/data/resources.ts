import { GovernmentResource } from '../types';

export const GOVERNMENT_RESOURCES: GovernmentResource[] = [
  {
    id: 'tn-women-skill-training',
    categoryKey: 'skill',
    verificationType: 'verified_official',
    language: ['ta', 'en', 'hi'],
    officialUrl: 'https://www.tnskill.tn.gov.in/',
    officialPortalName: {
      ta: 'தமிழ்நாடு திறன் மேம்பாட்டுக் கழகம் (TNSDC)',
      en: 'Tamil Nadu Skill Development Corporation (TNSDC)',
      hi: 'तमिलनाडु कौशल विकास निगम (TNSDC)',
    },
    name: {
      ta: 'மகளிர் இலவச திறன் பயிற்சி மற்றும் வேலைவாய்ப்பு வழிகாட்டி (TNSDC)',
      en: 'Women Free Skill Training & Livelihood Placement Program (TNSDC)',
      hi: 'महिला निःशुल्क कौशल प्रशिक्षण एवं रोजगार सहायता (TNSDC)',
    },
    category: {
      ta: 'திறன் பயிற்சி மற்றும் வேலைவாய்ப்பு',
      en: 'Skill Development',
      hi: 'कौशल विकास और प्रशिक्षण',
    },
    description: {
      ta: 'அதிகம் படிக்காத பெண்கள் மற்றும் இல்லத்தரசிகள் தையல், கைவினைப் பொருட்கள், கணினி அடிப்படை, சமையல் கலை மற்றும் சுயதொழில் திறன்களை இலவசமாகக் கற்று வேலை அல்லது வருமானம் பெற உதவும் அரசுத் திட்டம்.',
      en: 'A government-backed free vocational training program helping homemakers and women with basic schooling learn tailoring, handicrafts, basic computing, food processing, and job-ready skills.',
      hi: 'कम पढ़ी-लिखी महिलाओं और गृहिणियों को सिलाई, हस्तशिल्प, बेसिक कंप्यूटर और स्वरोजगार के हुनर मुफ्त में सिखाने और काम दिलाने वाली सरकारी योजना।',
    },
    whyRelevant: {
      ta: 'வேலைக்குத் தேவையான திறன்களை கற்றுக்கொள்ள இது உதவலாம். முன்பு வேலை செய்த அனுபவம் இல்லாவிட்டாலும், வீட்டிலிருந்தபடியே அல்லது அருகிலுள்ள பயிற்சி மையத்தில் இலவசமாகப் பயிற்சி பெறலாம்.',
      en: 'This helps you learn practical skills needed for a job or home-based income. Even with no prior work experience or limited formal schooling, you can train near your home.',
      hi: 'यह आपको काम के लिए जरूरी हुनर सीखने में मदद कर सकता है। बिना किसी पुराने काम के अनुभव के भी आप अपने घर के पास मुफ्त प्रशिक्षण ले सकती हैं।',
    },
    targetUser: {
      ta: '18 முதல் 45 வயதுக்குட்பட்ட பெண்கள், இல்லத்தரசிகள், பள்ளிப் படிப்பு முடித்த அல்லது பாதியில் நிறுத்திய பெண்கள்.',
      en: 'Women aged 18–45, homemakers, and job-seeking women with school-level or basic education.',
      hi: '18 से 45 वर्ष की महिलाएं, गृहिणियां, और स्कूल स्तर तक पढ़ी काम की तलाश करने वाली महिलाएं।',
    },
    eligibility: {
      ta: [
        'வயது: 18 முதல் 45 வயது வரை இருக்கலாம் (சில பயிற்சிகளுக்கு வயது வரம்பு தளர்வு உண்டு).',
        'கல்வி: அடிப்படை பள்ளிப் படிப்பு (5-ம் வகுப்பு முதல் 12-ம் வகுப்பு வரை) அல்லது எழுதப் படிக்கத் தெரிந்தால் போதுமானது.',
        'இருப்பிடம்: தமிழ்நாட்டில் வசிப்பவராக இருக்க வேண்டும்.',
        'முந்தைய வேலை அனுபவம் தேவையில்லை.',
      ],
      en: [
        'Age: Generally between 18 and 45 years (relaxation available for select livelihood trades).',
        'Education: School-level education (Class 5 to Class 12) or basic literacy depending on trade.',
        'Location: Resident of Tamil Nadu (training centers available in Chennai and all districts).',
        'No prior employment experience is required.',
      ],
      hi: [
        'आयु: सामान्यतः 18 से 45 वर्ष के बीच (कुछ प्रशिक्षणों में आयु में छूट उपलब्ध है)।',
        'शिक्षा: स्कूल स्तर की पढ़ाई (कक्षा 5 से 12) या सामान्य पढ़ना-लिखना।',
        'निवास: संबंधित राज्य/जिले की निवासी होना आवश्यक है।',
        'पहले किसी काम का अनुभव होना जरूरी नहीं है।',
      ],
    },
    documents: [
      {
        id: 'aadhaar',
        name: {
          ta: 'ஆதார் அட்டை (Aadhaar)',
          en: 'Aadhaar Card',
          hi: 'आधार कार्ड (Aadhaar)',
        },
        explanation: {
          ta: 'ஆதார் அட்டை உங்கள் அடையாளத்தையும் முகவரியையும் உறுதி செய்யப் பயன்படுத்தப்படலாம். உங்களிடம் அது இருந்தால் அருகில் வைத்துக்கொள்ளுங்கள்.',
          en: 'Your Aadhaar card is used to confirm your identity and address. Keep it nearby when registering.',
          hi: 'आधार कार्ड आपकी पहचान और पते की पुष्टि करने के लिए उपयोग किया जाता है। यदि आपके पास है तो इसे पास रखें।',
        },
        howToGet: {
          ta: 'உங்களிடம் ஆதார் அட்டை இல்லையென்றால், அருகிலுள்ள இ-சேவை மையம் (e-Sevai) அல்லது தபால் நிலையத்தில் இலவசமாகப் பதிவு செய்யலாம்.',
          en: 'If you cannot find your Aadhaar card, you can get a reprint at any nearby e-Sevai center or Post Office.',
          hi: 'यदि आपके पास आधार नहीं है, तो नजदीकी ई-सेवा केंद्र या डाकघर से बनवाया या प्रिंट कराया जा सकता है।',
        },
      },
      {
        id: 'bank',
        name: {
          ta: 'வங்கி கணக்கு புத்தகம் (Bank details)',
          en: 'Bank Passbook / Details',
          hi: 'बैंक पासबुक (Bank details)',
        },
        explanation: {
          ta: 'பயிற்சிக் காலத்தில் உதவித்தொகை (Stipend) வழங்கப்பட்டால், அந்தப் பணம் நேரடியாக உங்கள் வங்கிக் கணக்கிற்கு வர இது பயன்படும்.',
          en: 'Your bank passbook has your account number and IFSC code so any training stipend can be sent directly to your account.',
          hi: 'प्रशिक्षण के दौरान मिलने वाली सहायता राशि सीधे आपके बैंक खाते में भेजने के लिए पासबुक के विवरण का उपयोग होता है।',
        },
        howToGet: {
          ta: 'உங்கள் வங்கி பாஸ்புக்கின் முதல் பக்கத்தில் கணக்கு எண் மற்றும் IFSC குறியீடு அச்சிடப்பட்டிருக்கும்.',
          en: 'Look at the first page of your bank passbook for your Account Number and IFSC code.',
          hi: 'आपकी बैंक पासबुक के पहले पन्ने पर खाता संख्या और IFSC कोड लिखा होता है।',
        },
      },
      {
        id: 'photo',
        name: {
          ta: 'பாஸ்போர்ட் அளவு புகைப்படம் (Photograph)',
          en: 'Passport-size Photograph',
          hi: 'पासपोर्ट आकार का फोटो (Photograph)',
        },
        explanation: {
          ta: 'பயிற்சி அடையாள அட்டை மற்றும் சான்றிதழில் உங்கள் புகைப்படம் இடம்பெற இது தேவைப்படும்.',
          en: 'A recent small photograph of yourself is used for your training ID card and completion certificate.',
          hi: 'प्रशिक्षण पहचान पत्र और प्रमाण पत्र पर लगाने के लिए आपकी एक छोटी फोटो की आवश्यकता होती है।',
        },
        howToGet: {
          ta: 'அருகிலுள்ள போட்டோ ஸ்டுடியோவில் எடுத்த சிறிய புகைப்படம் அல்லது தெளிவான செல்ஃபி போதுமானது.',
          en: 'Any small passport photo from a local studio or a clear phone photo against a plain wall works.',
          hi: 'किसी भी नजदीकी फोटो स्टूडियो से खिंचवाई गई पासपोर्ट साइज फोटो का उपयोग करें।',
        },
      },
      {
        id: 'certificate',
        name: {
          ta: 'பள்ளிச் சான்றிதழ் / மாற்றுச் சான்றிதழ் (Relevant certificate)',
          en: 'School Transfer / Educational Certificate (if available)',
          hi: 'स्कूल प्रमाण पत्र / टीसी (यदि उपलब्ध हो)',
        },
        explanation: {
          ta: 'நீங்கள் எந்த வகுப்பு வரை படித்திருக்கிறீர்கள் என்பதைத் தெரிந்துகொள்ள இது உதவும். இது இல்லையென்றாலும் சில அடிப்படைப் பயிற்சிகளில் சேரலாம்.',
          en: 'Helps show the last class you attended in school. Even if you do not have it, many foundational skill courses accept self-declaration.',
          hi: 'यह दिखाने में मदद करता है कि आपने कहाँ तक पढ़ाई की है। यदि यह नहीं भी है, तो भी कई बुनियादी प्रशिक्षणों में प्रवेश मिल सकता है।',
        },
        howToGet: {
          ta: 'நீங்கள் கடைசியாகப் படித்த பள்ளியில் கேட்டால் நகல் தருவார்கள், அல்லது அருகிலுள்ள பயிற்சி மையத்தில் நேரடியாகக் கேட்டுத் தெரிந்துகொள்ளலாம்.',
          en: 'Check your household document folder, or ask the local training center if a simple age proof is enough.',
          hi: 'अपने घर की फाइल में देखें, या प्रशिक्षण केंद्र पर पूछें कि क्या केवल आधार कार्ड पर्याप्त है।',
        },
      },
    ],
    steps: [
      {
        stepNumber: 1,
        iconName: 'file',
        title: {
          ta: 'தேவையான ஆவணங்களைத் தயாராக வைக்கவும்',
          en: 'Keep required documents ready',
          hi: 'जरूरी दस्तावेज पास में तैयार रखें',
        },
        detail: {
          ta: 'உங்கள் ஆதார் அட்டை, வங்கி பாஸ்புக் மற்றும் ஒரு சிறிய புகைப்படத்தை அருகில் எடுத்து வைத்துக்கொள்ளுங்கள்.',
          en: 'Keep your Aadhaar card, bank passbook, and one passport-size photo next to you before starting.',
          hi: 'अपना आधार कार्ड, बैंक पासबुक और एक पासपोर्ट साइज फोटो अपने पास रख लें।',
        },
      },
      {
        stepNumber: 2,
        iconName: 'globe',
        title: {
          ta: 'அதிகாரப்பூர்வ தளத்தைத் திறக்கவும்',
          en: 'Open official resource',
          hi: 'आधिकारिक सरकारी वेबसाइट खोलें',
        },
        detail: {
          ta: 'கீழே உள்ள பொத்தானை அழுத்தி தமிழ்நாடு திறன் மேம்பாட்டுத் தளத்தைத் திறக்கவும் அல்லது அருகிலுள்ள இ-சேவை மையத்தை அணுகவும்.',
          en: 'Tap the official website link below or visit your nearest e-Sevai / CSC center.',
          hi: 'नीचे दिए गए आधिकारिक लिंक पर जाएं या नजदीकी ई-सेवा केंद्र पर जाएं।',
        },
      },
      {
        stepNumber: 3,
        iconName: 'edit',
        title: {
          ta: 'பெயர் மற்றும் விருப்பமான பயிற்சியைப் பதிவு செய்யவும்',
          en: 'Complete registration / application',
          hi: 'पंजीकरण और आवेदन पूरा करें',
        },
        detail: {
          ta: 'உங்கள் பெயர், தொலைபேசி எண், மாவட்டம் மற்றும் உங்களுக்குப் பிடித்த பயிற்சி (தையல், கணினி, கைவினை) ஆகியவற்றை நிரப்பவும்.',
          en: 'Enter your name, phone number, district, and chosen skill training trade.',
          hi: 'अपना नाम, फोन नंबर, जिला और पसंदीदा प्रशिक्षण चुनें।',
        },
      },
      {
        stepNumber: 4,
        iconName: 'check',
        title: {
          ta: 'விண்ணப்பத்தைச் சமர்ப்பிக்கவும்',
          en: 'Submit & note confirmation number',
          hi: 'आवेदन जमा करें',
        },
        detail: {
          ta: 'படிவத்தைச் சமர்ப்பித்து உங்கள் தொலைபேசிக்கு வரும் SMS எண்ணைப் பத்திரமாக வைக்கவும்.',
          en: 'Submit the form and save the confirmation SMS sent to your phone.',
          hi: 'फॉर्म जमा करें और फोन पर आए एसएमएस को सुरक्षित रखें।',
        },
      },
    ],
    disclaimer: {
      ta: 'தற்போதைய தகுதி விதிகளை அதிகாரப்பூர்வ அரசு இணையதளத்தில் சரிபார்க்கவும்.',
      en: 'Please verify the current eligibility on the official government website.',
      hi: 'कृपया आधिकारिक सरकारी वेबसाइट पर वर्तमान पात्रता की जांच करें।',
    },
  },
  {
    id: 'kalaignar-magalir-urimai',
    categoryKey: 'financial',
    verificationType: 'verified_official',
    language: ['ta', 'en', 'hi'],
    officialUrl: 'https://kmut.tn.gov.in/',
    officialPortalName: {
      ta: 'கலைஞர் மகளிர் உரிமைத் திட்டம் (KMUT)',
      en: 'Kalaignar Magalir Urimai Thittam Portal',
      hi: 'कलैगनार मगलिर उरिमई थिट्टम पोर्टल',
    },
    name: {
      ta: 'கலைஞர் மகளிர் உரிமைத் திட்டம் (மாதம் ₹1,000 நிதி உதவி)',
      en: 'Kalaignar Magalir Urimai Thittam (Monthly ₹1,000 Financial Support)',
      hi: 'कलैगनार महिला अधिकार योजना (मासिक ₹1,000 आर्थिक सहायता)',
    },
    category: {
      ta: 'மகளிர் நிதி மற்றும் சமூகப் பாதுகாப்பு',
      en: "Women's Financial & Social Support",
      hi: 'महिला आर्थिक एवं सामाजिक सहायता',
    },
    description: {
      ta: 'குடும்பத் தலைவிகளின் உழைப்பை அங்கீகரிக்கும் வகையில், தகுதியுள்ள பெண்களின் வங்கிக் கணக்கில் மாதந்தோறும் ₹1,000 நேரடியாகச் செலுத்தும் தமிழ்நாடு அரசின் திட்டம்.',
      en: 'A flagship Tamil Nadu government scheme providing ₹1,000 monthly direct bank transfer to eligible women heads of households to support family livelihood.',
      hi: 'परिवार की महिला मुखियाओं के बैंक खाते में हर महीने ₹1,000 सीधे भेजने वाली तमिलनाडु सरकार की योजना।',
    },
    whyRelevant: {
      ta: 'உங்கள் அன்றாட குடும்பச் செலவுகள் மற்றும் பொருளாதாரத் தன்னிறைவுக்கு மாதந்தோறும் நேரடி நிதி உதவி பெற இது உதவும்.',
      en: 'Provides dependable monthly financial assistance transferred directly into your personal bank account.',
      hi: 'घर के खर्चों और आत्मनिर्भरता के लिए हर महीने सीधे आपके खाते में सरकारी मदद।',
    },
    targetUser: {
      ta: '21 வயது நிரம்பிய குடும்பத் தலைவிகள், ஆண்டு குடும்ப வருமானம் ₹2.5 லட்சத்திற்குள் உள்ள குடும்பங்கள்.',
      en: 'Women family heads aged 21 and above from households with annual income below ₹2.5 lakh.',
      hi: '21 वर्ष से अधिक आयु की महिलाएं जिनके परिवार की वार्षिक आय ₹2.5 लाख से कम है।',
    },
    eligibility: {
      ta: [
        'வயது: 21 வயது நிரம்பிய பெண்ணாக இருக்க வேண்டும்.',
        'குடும்ப வருமானம்: குடும்பத்தின் ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குக் கீழ் இருக்க வேண்டும்.',
        'நிலம்: 5 ஏக்கருக்குக் குறைவான நன்செய் நிலம் அல்லது 10 ஏக்கருக்குக் குறைவான புன்செய் நிலம்.',
      ],
      en: [
        'Age: Women aged 21 years or older.',
        'Family Income: Annual household income below ₹2.5 lakh.',
        'Landholding: Less than 5 acres of wetland or 10 acres of dryland.',
      ],
      hi: [
        'आयु: महिला की आयु 21 वर्ष या उससे अधिक होनी चाहिए।',
        'पारिवारिक आय: परिवार की सालाना आय ₹2.5 लाख से कम होनी चाहिए।',
        'भूमि: 5 एकड़ से कम सिंचित या 10 एकड़ से कम असिंचित भूमि।',
      ],
    },
    documents: [
      {
        id: 'ration-card',
        name: {
          ta: 'குடும்ப அட்டை / ரேஷன் கார்டு (Ration Card)',
          en: 'Family Ration Card (Smart Card)',
          hi: 'राशन कार्ड (Ration Card)',
        },
        explanation: {
          ta: 'உங்கள் குடும்ப உறுப்பினர்களின் விவரங்களை உறுதி செய்ய ரேஷன் கார்டு பயன்படுகிறது.',
          en: 'Used to verify your household members and family head details.',
          hi: 'आपके परिवार के सदस्यों का विवरण देखने के लिए राशन कार्ड का उपयोग होता है।',
        },
        howToGet: {
          ta: 'உங்கள் வீட்டில் உள்ள ஸ்மார்ட் ரேஷன் கார்டை எடுத்து வைத்துக்கொள்ளுங்கள்.',
          en: 'Use your household Smart Ration Card issued by the Civil Supplies department.',
          hi: 'अपने घर का स्मार्ट राशन कार्ड पास रखें।',
        },
      },
      {
        id: 'aadhaar',
        name: {
          ta: 'ஆதார் அட்டை (Aadhaar)',
          en: 'Aadhaar Card',
          hi: 'आधार कार्ड (Aadhaar)',
        },
        explanation: {
          ta: 'உங்கள் அடையாளம் மற்றும் விரல் ரேகை சரிபார்ப்புக்கு ஆதார் அட்டை தேவைப்படும்.',
          en: 'Required to verify your identity and link direct benefit transfers.',
          hi: 'आपकी पहचान और बायोमेट्रिक सत्यापन के लिए आधार कार्ड आवश्यक है।',
        },
        howToGet: {
          ta: 'ஆதார் அட்டை மற்றும் அதனுடன் இணைக்கப்பட்ட தொலைபேசியை உடன் வைத்திருக்கவும்.',
          en: 'Keep your Aadhaar card and linked mobile phone with you.',
          hi: 'आधार कार्ड और उससे जुड़ा मोबाइल फोन साथ रखें।',
        },
      },
      {
        id: 'bank',
        name: {
          ta: 'வங்கி கணக்கு புத்தகம் (Bank Passbook)',
          en: 'Bank Passbook (Aadhaar Linked)',
          hi: 'बैंक पासबुक (आधार से जुड़ा हुआ)',
        },
        explanation: {
          ta: 'மாதம் ₹1,000 உதவித்தொகை நேரடியாக உங்கள் வங்கிக் கணக்கில் வர இது அவசியம்.',
          en: 'Ensures the ₹1,000 monthly assistance reaches your personal bank account directly.',
          hi: 'हर महीने ₹1,000 की राशि सीधे आपके खाते में आने के लिए बैंक पासबुक जरूरी है।',
        },
        howToGet: {
          ta: 'உங்கள் வங்கிக் கணக்கு ஆதாருடன் இணைக்கப்பட்டுள்ளதா என்பதை வங்கியில் கேட்டு உறுதி செய்துகொள்ளலாம்.',
          en: 'Confirm at your bank branch or post office that Aadhaar seeding is active on your account.',
          hi: 'अपनी बैंक शाखा में पूछकर सुनिश्चित करें कि आपका खाता आधार से लिंक है।',
        },
      },
    ],
    steps: [
      {
        stepNumber: 1,
        iconName: 'file',
        title: {
          ta: 'ரேஷன் கார்டு, ஆதார் மற்றும் வங்கி பாஸ்புக்கை வைக்கவும்',
          en: 'Keep Ration Card, Aadhaar, and Passbook ready',
          hi: 'राशन कार्ड, आधार और बैंक पासबुक तैयार रखें',
        },
        detail: {
          ta: 'இந்த ஆவணங்களை எடுத்து வைத்துக்கொள்ளுங்கள்.',
          en: 'Gather these three basic household documents.',
          hi: 'ये तीनों दस्तावेज अपने पास रख लें।',
        },
      },
      {
        stepNumber: 2,
        iconName: 'globe',
        title: {
          ta: 'இணையதளத்தில் சரிபார்க்கவும் அல்லது இ-சேவை மையத்திற்குச் செல்லவும்',
          en: 'Check status on official portal or visit local e-Sevai',
          hi: 'आधिकारिक पोर्टल देखें या ई-सेवा केंद्र जाएं',
        },
        detail: {
          ta: 'அரசு இ-சேவை மையம் அல்லது சிறப்பு முகாம்களில் உதவி பெறலாம்.',
          en: 'Visit your local government e-Sevai center for assisted submission.',
          hi: 'नजदीकी ई-सेवा केंद्र पर जाकर सहायता लें।',
        },
      },
      {
        stepNumber: 3,
        iconName: 'edit',
        title: {
          ta: 'விரல் ரேகை சரிபார்ப்பை முடிக்கவும்',
          en: 'Complete biometric verification',
          hi: 'बायोमेट्रिक सत्यापन पूरा करें',
        },
        detail: {
          ta: 'மையப் பணியாளர் உங்கள் விவரங்களைப் பதிவு செய்து விரல் ரேகை வைப்பார்.',
          en: 'The operator will scan your Aadhaar and record biometric confirmation.',
          hi: 'ऑपरेटर आपके आधार की बायोमेट्रिक जांच करेगा।',
        },
      },
      {
        stepNumber: 4,
        iconName: 'check',
        title: {
          ta: 'ஒப்புகைச் சீட்டைப் பத்திரமாக வைக்கவும்',
          en: 'Keep acknowledgment receipt safe',
          hi: 'रसीद सुरक्षित रखें',
        },
        detail: {
          ta: 'விண்ணப்ப ஒப்புகை எண்ணைக் குறித்து வைத்துக்கொள்ளுங்கள்.',
          en: 'Save your printed acknowledgment number.',
          hi: 'पावती रसीद को संभाल कर रखें।',
        },
      },
    ],
    disclaimer: {
      ta: 'தற்போதைய தகுதி விதிகளை அதிகாரப்பூர்வ அரசு இணையதளத்தில் சரிபார்க்கவும்.',
      en: 'Please verify the current eligibility on the official government website.',
      hi: 'कृपया आधिकारिक सरकारी वेबसाइट पर वर्तमान पात्रता की जांच करें।',
    },
  },
  {
    id: 'mahalir-thittam-livelihood',
    categoryKey: 'employment',
    verificationType: 'verified_official',
    language: ['ta', 'en', 'hi'],
    officialUrl: 'https://www.tamilnadumahalirthittam.in/',
    officialPortalName: {
      ta: 'தமிழ்நாடு மகளிர் மேம்பாட்டு நிறுவனம்',
      en: 'Tamil Nadu Corporation for Development of Women',
      hi: 'तमिलनाडु महिला विकास निगम',
    },
    name: {
      ta: 'மகளிர் சுயஉதவிக் குழு மற்றும் உள்ளூர் வேலைவாய்ப்புத் திட்டம்',
      en: 'Mahalir Thittam Women Livelihood & Placement Support',
      hi: 'महिला स्वयं सहायता समूह एवं स्थानीय रोजगार सहायता',
    },
    category: {
      ta: 'வேலைவாய்ப்பு மற்றும் வாழ்வாதாரம்',
      en: 'Employment & Livelihood',
      hi: 'रोजगार और आजीविका',
    },
    description: {
      ta: 'பெண்கள் தங்கள் பகுதியிலேயே வேலை பெறவும், மகளிர் சுயஉதவிக் குழுக்கள் மூலம் வருமானம் ஈட்டவும் வழிகாட்டும் சேவை.',
      en: 'Connects women with local employment camps, community job placements, and Self-Help Group (SHG) livelihood programs.',
      hi: 'महिलाओं को अपने क्षेत्र में रोजगार पाने और स्वयं सहायता समूहों के माध्यम से आय अर्जित करने में मदद करने वाली सेवा।',
    },
    whyRelevant: {
      ta: 'உங்கள் மாவட்டத்திலேயே பாதுகாப்பாக வேலை தேடவும் மற்ற பெண்களுடன் இணைந்து வருமானம் ஈட்டவும் உதவும்.',
      en: 'Ideal for finding local jobs or joining a supportive women Self-Help Group in your neighborhood.',
      hi: 'अपने जिले में सुरक्षित काम ढूंढने और अन्य महिलाओं के साथ मिलकर आय कमाने के लिए उपयुक्त।',
    },
    targetUser: {
      ta: 'வேலை தேடும் பெண்கள், இல்லத்தரசிகள் மற்றும் சுயஉதவிக் குழுவில் இணைய விரும்பும் பெண்கள்.',
      en: 'Job-seeking women and homemakers looking for local livelihood opportunities.',
      hi: 'काम की तलाश करने वाली महिलाएं और गृहिणियां।',
    },
    eligibility: {
      ta: [
        'வயது: 18 வயது நிரம்பிய பெண்கள்.',
        'கல்வி: அடிப்படை பள்ளிப் படிப்பு முதல் அனைவருக்கும் வாய்ப்புகள் உண்டு.',
      ],
      en: [
        'Age: Women aged 18 years and above.',
        'Education: Opportunities available across all education levels.',
      ],
      hi: [
        'आयु: 18 वर्ष या उससे अधिक आयु की महिलाएं।',
        'शिक्षा: सभी शैक्षिक स्तरों के लिए अवसर उपलब्ध।',
      ],
    },
    documents: [
      {
        id: 'aadhaar',
        name: { ta: 'ஆதார் அட்டை (Aadhaar)', en: 'Aadhaar Card', hi: 'आधार कार्ड' },
        explanation: {
          ta: 'உங்கள் அடையாளத்தை உறுதி செய்ய ஆதார் அட்டை பயன்படும்.',
          en: 'Used to confirm your identity and residential address.',
          hi: 'आपकी पहचान और पते की पुष्टि के लिए आवश्यक।',
        },
        howToGet: {
          ta: 'உங்கள் ஆதார் அட்டையை எடுத்து வைத்துக்கொள்ளவும்.',
          en: 'Keep your Aadhaar card ready.',
          hi: 'अपना आधार कार्ड पास रखें।',
        },
      },
    ],
    steps: [
      {
        stepNumber: 1,
        iconName: 'file',
        title: {
          ta: 'ஆதார் மற்றும் புகைப்படத்தை எடுத்து வைக்கவும்',
          en: 'Keep Aadhaar and photo ready',
          hi: 'आधार और फोटो तैयार रखें',
        },
        detail: {
          ta: 'அடிப்படை அடையாள ஆவணங்களைத் தயாராக வைக்கவும்.',
          en: 'Keep your identity proof handy.',
          hi: 'पहचान पत्र पास रखें।',
        },
      },
      {
        stepNumber: 2,
        iconName: 'globe',
        title: {
          ta: 'இணையதளத்தைப் பார்க்கவும் அல்லது உள்ளூர் மையத்தை அணுகவும்',
          en: 'Check official website or visit block desk',
          hi: 'वेबसाइट देखें या ब्लॉक कार्यालय जाएं',
        },
        detail: {
          ta: 'உங்கள் வட்டாரத்தில் நடக்கும் வேலைவாய்ப்பு முகாம் விவரங்களை அறியலாம்.',
          en: 'Check local employment camps and group schedules.',
          hi: 'स्थानीय रोजगार शिविरों की जानकारी लें।',
        },
      },
      {
        stepNumber: 3,
        iconName: 'edit',
        title: {
          ta: 'பெயரைப் பதிவு செய்யவும்',
          en: 'Register your details',
          hi: 'अपना नाम दर्ज कराएं',
        },
        detail: {
          ta: 'பஞ்சாயத்து அல்லது நகராட்சி மகளிர் திட்டப் பிரதிநிதியிடம் பெயர் கொடுக்கலாம்.',
          en: 'Register with your local Mahalir Thittam community coordinator.',
          hi: 'स्थानीय महिला योजना प्रतिनिधि के पास नाम दर्ज कराएं।',
        },
      },
      {
        stepNumber: 4,
        iconName: 'check',
        title: {
          ta: 'முகாமில் கலந்து கொள்ளவும்',
          en: 'Attend local placement session',
          hi: 'रोजगार शिविर में भाग लें',
        },
        detail: {
          ta: 'உங்களுக்கு ஏற்ற வேலையைத் தேர்ந்தெடுக்கவும்.',
          en: 'Choose the job trade best suited to you.',
          hi: 'अपने अनुकूल काम चुनें।',
        },
      },
    ],
    disclaimer: {
      ta: 'தற்போதைய தகுதி விதிகளை அதிகாரப்பூர்வ அரசு இணையதளத்தில் சரிபார்க்கவும்.',
      en: 'Please verify the current eligibility on the official government website.',
      hi: 'कृपया आधिकारिक सरकारी वेबसाइट पर वर्तमान पात्रता की जांच करें।',
    },
  },
];
