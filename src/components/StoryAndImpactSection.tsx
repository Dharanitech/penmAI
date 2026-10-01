import React from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { ArrowDown, ArrowRight, ShieldAlert, Lock, Volume2 } from 'lucide-react';

interface StoryAndImpactSectionProps {
  language: Language;
  onSpeak: (text: string) => void;
}

export const StoryAndImpactSection: React.FC<StoryAndImpactSectionProps> = ({
  language,
  onSpeak,
}) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <div id="why-penmai" className="border-t border-[#E6E0D6]">
      {/* Visual Comparison: Traditional vs penmAI */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-semibold text-[#B84A62] mb-2">
              {language === 'ta'
                ? 'முக்கியக் கோட்பாடு'
                : language === 'hi'
                ? 'मुख्य सिद्धांत'
                : 'Core Product Principle'}
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#181326]">
              “{t.comparisonTitle}”
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Portal */}
            <div className="bg-[#F3EFEA] rounded-2xl border border-[#DFD8CA] p-6 sm:p-8">
              <div className="text-xs font-semibold text-[#655B75] mb-1">
                {t.comparisonOldSub}
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#3D354B] mb-6">
                {t.comparisonOldTitle}
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                {t.comparisonOldSteps.map((step, i) => (
                  <React.Fragment key={i}>
                    <div className="px-3.5 py-2.5 bg-white rounded-lg border border-[#DFD8CA] text-sm font-medium text-[#4A4358]">
                      {step}
                    </div>
                    {i < t.comparisonOldSteps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-[#8A8098] shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* penmAI Approach */}
            <div className="bg-[#3B1E54] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="text-xs font-semibold text-[#F6C6D0] mb-1">
                {t.comparisonNewSub}
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6">
                {t.comparisonNewTitle}
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                {t.comparisonNewSteps.map((step, i) => (
                  <React.Fragment key={i}>
                    <div className="px-3.5 py-2.5 bg-white/15 rounded-lg border border-white/25 text-sm font-semibold text-white">
                      {step}
                    </div>
                    {i < t.comparisonNewSteps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-[#F6C6D0] shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why penmAI? 4 Cards */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 bg-white border-t border-[#E6E0D6]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#181326] mb-8">
            {t.whyPenmaiTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.whyCards.map((card, index) => (
              <div
                key={index}
                className="bg-[#FAF8F5] rounded-2xl border border-[#E4DDD1] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#B84A62] tabular-nums mb-2">
                    0{index + 1}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#181326] mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#4A4358] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 bg-[#FAF8F5] border-t border-[#E6E0D6]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#181326] mb-2">
              {t.impactTitle}
            </h2>
            <p className="text-base sm:text-lg text-[#4A4358]">{t.impactSub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {t.impactPairs.map((pair, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#DDD5C7] p-5 flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-[#655B75] line-through">
                    {pair.before}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <ArrowDown className="w-4 h-4 text-[#B84A62] -rotate-90 shrink-0" />
                    <span className="text-base sm:text-lg font-bold text-[#181326]">
                      {pair.after}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#3B1E54] tabular-nums">
                  0{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Panel */}
      <footer className="py-12 px-4 sm:px-8 bg-[#181326] text-[#EDE8F5] border-t border-[#2E2542]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F6C6D0]">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>
                  {language === 'ta'
                    ? 'நம்பிக்கை மற்றும் பாதுகாப்பு'
                    : language === 'hi'
                    ? 'विश्वास और सुरक्षा'
                    : 'Trust & Safety'}
                </span>
              </div>
              <p className="text-sm text-[#D9D2E6] leading-relaxed">
                {t.trustBannerText}
              </p>
              <p className="text-xs text-[#B5ABC9] pt-1">
                {t.verifyEligibilityText}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F6C6D0]">
                <Lock className="w-4 h-4 shrink-0" />
                <span>
                  {language === 'ta'
                    ? 'தனியுரிமைப் பாதுகாப்பு'
                    : language === 'hi'
                    ? 'गोपनीयता सुरक्षा'
                    : 'Privacy Guarantee'}
                </span>
              </div>
              <p className="text-sm text-[#D9D2E6] leading-relaxed">
                {t.privacyMessageText}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B5ABC9]">
            <div>
              <strong className="text-white font-display text-base">
                penmAI
              </strong>{' '}
              · {t.brandSubMeaning} · {t.tagline}
            </div>
            <div>
              Built for “THE INVISIBLE WOMAN” Challenge · Zero Prior Digital Knowledge Needed
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
