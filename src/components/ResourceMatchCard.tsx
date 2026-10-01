import React, { useState, useRef } from 'react';
import { ConversationState, GovernmentResource, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import {
  Check,
  Volume2,
  ExternalLink,
  HelpCircle,
  FileText,
  ArrowRight,
  CheckSquare,
  Square,
  ShieldCheck,
} from 'lucide-react';

interface ResourceMatchCardProps {
  resource: GovernmentResource;
  language: Language;
  conversationState: ConversationState;
  onSpeak: (text: string) => void;
  onOpenTranslator: () => void;
  defaultExpandedSteps?: boolean;
}

export const ResourceMatchCard: React.FC<ResourceMatchCardProps> = ({
  resource,
  language,
  conversationState,
  onSpeak,
  onOpenTranslator,
  defaultExpandedSteps = false,
}) => {
  const t = UI_TRANSLATIONS[language];
  const [showSteps, setShowSteps] = useState(defaultExpandedSteps);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [activeDocId, setActiveDocId] = useState<string | null>(
    resource.documents[0]?.id || null
  );

  const docsSectionRef = useRef<HTMLDivElement>(null);
  const stepsSectionRef = useRef<HTMLDivElement>(null);

  const toggleDocCheck = (docId: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const handleExplainDoc = (docId: string, explanation: string, howToGet: string) => {
    setActiveDocId(docId);
    onSpeak(`${explanation} ${howToGet}`);
  };

  const handleReadFullGuide = () => {
    const stepsText = resource.steps
      .map(
        (s) =>
          `${t.stepLabel} ${s.stepNumber}: ${s.title[language]}. ${s.detail[language]}`
      )
      .join(' ');
    onSpeak(`${resource.name[language]}. ${resource.whyRelevant[language]} ${stepsText}`);
  };

  const handleNextStepExpand = () => {
    setShowSteps(true);
    handleReadFullGuide();
    setTimeout(() => {
      stepsSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const handleScrollToDocs = () => {
    setShowSteps(true);
    setTimeout(() => {
      docsSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DDD5C7] shadow-sm overflow-hidden transition-all">
      <div className="p-6 sm:p-8">
        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#655B75] mb-3">
          <span className="text-[#3B1E54] font-semibold">
            {t.matchedResourceHeader}
          </span>
          <span aria-hidden="true">·</span>
          <span>💼 {resource.category[language]}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-[#2E6F40]">
            <ShieldCheck className="w-3.5 h-3.5" />
            {resource.verificationType === 'verified_official'
              ? t.verifiedSourceLabel
              : t.curatedDemoLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#181326] mb-3">
          {resource.name[language]}
        </h3>

        <p className="text-base sm:text-lg text-[#3D354B] mb-6 leading-relaxed">
          {resource.description[language]}
        </p>

        {/* Why relevant */}
        <div className="py-5 border-t border-b border-[#EAE4D9] mb-6">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h4 className="text-base sm:text-lg font-bold text-[#3B1E54]">
              {t.whyRelevantHeader}
            </h4>
            <button
              type="button"
              onClick={() =>
                onSpeak(
                  `${resource.name[language]}. ${t.whyRelevantHeader} ${resource.whyRelevant[language]}`
                )
              }
              className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#F5F1EB] hover:bg-[#EAE3D8] text-[#181326] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Volume2 className="w-4 h-4 text-[#3B1E54]" />
              <span>{t.readAloudBtn}</span>
            </button>
          </div>
          <p className="text-base sm:text-lg text-[#181326] font-medium leading-relaxed">
            {resource.whyRelevant[language]}
          </p>
        </div>

        {/* Matched Info */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-[#655B75] mb-3">
            {t.matchedInfoLabel}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2.5 py-2 px-3 bg-[#FAF8F5] rounded-lg">
              <Check className="w-5 h-5 text-[#2E6F40] shrink-0" />
              <span className="text-sm sm:text-base font-medium text-[#181326]">
                {t.infoAge}:{' '}
                <strong className="tabular-nums">
                  {conversationState.age || '32'}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2.5 py-2 px-3 bg-[#FAF8F5] rounded-lg">
              <Check className="w-5 h-5 text-[#2E6F40] shrink-0" />
              <span className="text-sm sm:text-base font-medium text-[#181326]">
                {t.infoLocation}:{' '}
                <strong>{conversationState.location || 'Chennai'}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2.5 py-2 px-3 bg-[#FAF8F5] rounded-lg">
              <Check className="w-5 h-5 text-[#2E6F40] shrink-0" />
              <span className="text-sm sm:text-base font-medium text-[#181326]">
                {t.infoEducation}:{' '}
                <strong>
                  {conversationState.education ||
                    (language === 'ta'
                      ? 'பள்ளி அளவு'
                      : language === 'hi'
                      ? 'स्कूल स्तर'
                      : 'School level')}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {!showSteps ? (
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-lg font-bold text-[#181326]">{t.areYouReady}</p>
            <button
              type="button"
              onClick={handleNextStepExpand}
              className="min-h-[52px] px-7 py-3 rounded-xl bg-[#3B1E54] hover:bg-[#2B153E] text-white text-base sm:text-lg font-semibold flex items-center justify-center gap-2.5 shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.nextStepBtn}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : null}
      </div>

      {showSteps && (
        <div
          ref={stepsSectionRef}
          className="border-t border-[#DDD5C7] bg-[#FAF8F5] p-6 sm:p-8 space-y-8"
        >
          {/* 4-Step Action Guide */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#181326]">
                {language === 'ta'
                  ? 'படிப்படியான வழிகாட்டி'
                  : language === 'hi'
                  ? 'कदम-दर-कदम मार्गदर्शिका'
                  : 'Step-by-Step Action Guide'}
              </h4>
              <button
                type="button"
                onClick={handleReadFullGuide}
                className="min-h-[42px] px-4 py-2 rounded-lg bg-[#3B1E54] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-[#2B153E] transition-colors whitespace-nowrap shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                <span>{t.readAloudBtn}</span>
              </button>
            </div>

            <div className="divide-y divide-[#E4DDD1] bg-white rounded-xl border border-[#E4DDD1]">
              {resource.steps.map((step) => {
                const emoji =
                  step.stepNumber === 1
                    ? '📄'
                    : step.stepNumber === 2
                    ? '🌐'
                    : step.stepNumber === 3
                    ? '📝'
                    : '✅';
                return (
                  <div
                    key={step.stepNumber}
                    className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold tracking-wide text-[#B84A62] tabular-nums">
                        {t.stepLabel} {step.stepNumber}
                      </div>
                      <h5 className="text-lg font-bold text-[#181326]">
                        {emoji} {step.title[language]}
                      </h5>
                      <p className="text-base text-[#3D354B] leading-relaxed">
                        {step.detail[language]}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onSpeak(
                          `${t.stepLabel} ${step.stepNumber}. ${step.title[language]}. ${step.detail[language]}`
                        )
                      }
                      className="self-start min-h-[40px] px-3 py-1.5 rounded-lg bg-[#F5F1EB] hover:bg-[#EAE3D8] text-[#181326] text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#3B1E54]" />
                      <span>{t.readAloudBtn}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eligibility */}
          <div className="pt-2 border-t border-[#E4DDD1]">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h4 className="font-display text-lg sm:text-xl font-bold text-[#181326]">
                {t.eligibilityHeader}
              </h4>
              <button
                type="button"
                onClick={() =>
                  onSpeak(resource.eligibility[language].join('. '))
                }
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-white border border-[#DED6C8] text-xs font-semibold text-[#181326] hover:bg-[#F3EFEA] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#3B1E54]" />
                <span>{t.readAloudBtn}</span>
              </button>
            </div>
            <ul className="space-y-2.5">
              {resource.eligibility[language].map((rule, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-base text-[#2D2638]"
                >
                  <Check className="w-5 h-5 text-[#2E6F40] shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs sm:text-sm text-[#655B75] italic">
              * {resource.disclaimer[language]}
            </p>
          </div>

          {/* Document Coach */}
          <div ref={docsSectionRef} className="pt-4 border-t border-[#E4DDD1]">
            <div className="mb-4">
              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#181326]">
                {t.requiredDocumentsHeader}
              </h4>
              <p className="text-sm sm:text-base text-[#4A4358] mt-1">
                {language === 'ta'
                  ? 'உங்களிடம் உள்ள ஆவணங்களைத் தேர்வு செய்யவும். விவரம் கேட்க அதன் பெயரைத் தொடவும்.'
                  : language === 'hi'
                  ? 'जो दस्तावेज़ आपके पास हैं उन्हें चुनें। समझने के लिए नाम पर क्लिक करें।'
                  : 'Check off documents you have. Tap any document to hear its purpose.'}
              </p>
            </div>

            <div className="divide-y divide-[#E4DDD1] bg-white rounded-xl border border-[#E4DDD1]">
              {resource.documents.map((doc) => {
                const isChecked = Boolean(checkedDocs[doc.id]);
                const isExpanded = activeDocId === doc.id;
                return (
                  <div key={doc.id} className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => toggleDocCheck(doc.id)}
                        className="min-h-[44px] flex items-center gap-3 text-left text-base sm:text-lg font-semibold text-[#181326] hover:text-[#3B1E54] transition-colors"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-6 h-6 text-[#2E6F40] shrink-0" />
                        ) : (
                          <Square className="w-6 h-6 text-[#655B75] shrink-0" />
                        )}
                        <span className={isChecked ? 'line-through text-[#655B75]' : ''}>
                          {doc.name[language]}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleExplainDoc(
                            doc.id,
                            doc.explanation[language],
                            doc.howToGet[language]
                          )
                        }
                        className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                          isExpanded
                            ? 'bg-[#3B1E54] text-white'
                            : 'bg-[#F5F1EB] text-[#3B1E54] hover:bg-[#EAE3D8]'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{t.explainDocBtn}</span>
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-[#F0EBE1] pl-9 space-y-2 text-sm sm:text-base">
                        <p className="text-[#181326] font-medium leading-relaxed">
                          “{doc.explanation[language]}”
                        </p>
                        <p className="text-[#4A4358]">
                          <strong className="text-[#3B1E54]">
                            {t.howToGetDocLabel}
                          </strong>{' '}
                          {doc.howToGet[language]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-5 border-t border-[#DDD5C7]">
            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#181326] mb-4">
              {t.whatToDoNextHeader}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={handleReadFullGuide}
                className="min-h-[52px] px-5 py-3 rounded-xl bg-white border border-[#D5CCBC] hover:border-[#3B1E54] text-[#181326] font-semibold text-base flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap"
              >
                <Volume2 className="w-5 h-5 text-[#3B1E54] shrink-0" />
                <span>{t.actionSpeakBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleScrollToDocs}
                className="min-h-[52px] px-5 py-3 rounded-xl bg-white border border-[#D5CCBC] hover:border-[#3B1E54] text-[#181326] font-semibold text-base flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap"
              >
                <FileText className="w-5 h-5 text-[#3B1E54] shrink-0" />
                <span>{t.actionViewDocsBtn}</span>
              </button>

              <a
                href={resource.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[52px] px-5 py-3 rounded-xl bg-[#3B1E54] hover:bg-[#2B153E] text-white font-semibold text-base flex items-center justify-center gap-2.5 shadow-sm transition-colors whitespace-nowrap"
              >
                <span>{t.actionOfficialSiteBtn}</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>

              <button
                type="button"
                onClick={onOpenTranslator}
                className="min-h-[52px] px-5 py-3 rounded-xl bg-[#F9EEF1] hover:bg-[#F2DCE2] border border-[#E5C2CB] text-[#7A2337] font-semibold text-base flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap"
              >
                <HelpCircle className="w-5 h-5 shrink-0" />
                <span>{t.actionExplainBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
