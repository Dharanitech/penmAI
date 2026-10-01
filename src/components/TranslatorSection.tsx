import React, { useState } from 'react';
import { GlossaryTerm, Language } from '../types';
import { GLOSSARY_TERMS } from '../data/glossary';
import { UI_TRANSLATIONS } from '../data/translations';
import { Volume2, HelpCircle } from 'lucide-react';

interface TranslatorSectionProps {
  language: Language;
  onSpeak: (text: string) => void;
}

export const TranslatorSection: React.FC<TranslatorSectionProps> = ({
  language,
  onSpeak,
}) => {
  const t = UI_TRANSLATIONS[language];
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm>(
    GLOSSARY_TERMS[0]
  );

  const handleSelectTerm = (term: GlossaryTerm) => {
    setSelectedTerm(term);
    onSpeak(`${term.localizedTerm[language]}. ${term.simpleExplanation[language]}`);
  };

  return (
    <section
      id="explain-terms"
      className="py-14 sm:py-20 px-4 sm:px-8 border-t border-[#E6E0D6] bg-[#F3EFEA]/60"
    >
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-semibold text-[#B84A62] mb-2">
            {language === 'ta'
              ? 'டிஜிட்டல் மொழிபெயர்ப்பாளர்'
              : language === 'hi'
              ? 'सरकारी भाषा अनुवादक'
              : 'Digital Complexity Translator'}
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#181326] mb-3">
            {t.explainThisTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#4A4358]">
            {t.explainThisSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Term List */}
          <div className="lg:col-span-5 space-y-2.5">
            {GLOSSARY_TERMS.map((item) => {
              const isSelected = selectedTerm.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTerm(item)}
                  className={`w-full min-h-[54px] px-4 py-3 rounded-xl text-left transition-colors flex items-center justify-between gap-3 border ${
                    isSelected
                      ? 'bg-[#3B1E54] text-white border-[#3B1E54] shadow-xs'
                      : 'bg-white text-[#181326] border-[#DFD8CA] hover:border-[#3B1E54]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-base">{item.term}</div>
                    {language !== 'en' && (
                      <div
                        className={`text-xs mt-0.5 ${
                          isSelected ? 'text-[#E5D4F0]' : 'text-[#655B75]'
                        }`}
                      >
                        {item.localizedTerm[language]}
                      </div>
                    )}
                  </div>
                  <HelpCircle
                    className={`w-5 h-5 shrink-0 ${
                      isSelected ? 'text-[#F6C6D0]' : 'text-[#655B75]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Explanation Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#DDD5C7] p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#EAE4D9]">
                <div>
                  <span className="text-xs font-medium text-[#655B75]">
                    {language === 'ta'
                      ? 'படிவத்தில் உள்ள வார்த்தை'
                      : language === 'hi'
                      ? 'फॉर्म में लिखा शब्द'
                      : 'Term on the form'}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#181326] mt-1">
                    {selectedTerm.localizedTerm[language]}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onSpeak(
                      `${selectedTerm.localizedTerm[language]}. ${selectedTerm.simpleExplanation[language]} ${selectedTerm.exampleContext[language]}`
                    )
                  }
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#3B1E54] hover:bg-[#2B153E] text-white text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{t.readAloudBtn}</span>
                </button>
              </div>

              <div className="py-5 space-y-4">
                <p className="text-lg sm:text-xl font-medium text-[#181326] leading-relaxed">
                  “{selectedTerm.simpleExplanation[language]}”
                </p>

                <p className="text-sm sm:text-base text-[#4A4358] pt-3 border-t border-[#F2ECE1]">
                  {selectedTerm.exampleContext[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
