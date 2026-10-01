import React from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { Play } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onStartDemo: () => void;
  isDemoActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onStartDemo,
  isDemoActive,
}) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6E0D6]">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#voice-assistant"
        className="font-display text-2xl font-bold tracking-tight text-[#181326] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B1E54]"
      >
        penm<span className="text-[#B84A62]">AI</span>
      </a>

      {/* Zone 2: Clean navigation links */}
      <nav
        aria-label="Primary Navigation"
        className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A4358]"
      >
        <a
          href="#voice-assistant"
          className="hover:text-[#181326] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          {t.navDiscover}
        </a>
        <a
          href="#explain-terms"
          className="hover:text-[#181326] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          {t.navTranslator}
        </a>
        <a
          href="#curated-resources"
          className="hover:text-[#181326] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          {t.navResources}
        </a>
        <a
          href="#why-penmai"
          className="hover:text-[#181326] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          {t.navImpact}
        </a>
      </nav>

      {/* Zone 3: Language Selector + 60-Second Demo Trigger */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div
          role="group"
          aria-label="Language selector"
          className="flex items-center p-1 bg-[#EFECE6] rounded-lg border border-[#E2DBD0]"
        >
          {(
            [
              { code: 'ta', label: 'தமிழ்' },
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिन्दी' },
            ] as const
          ).map((item) => {
            const active = language === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => onLanguageChange(item.code)}
                className={`min-h-[36px] px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#3B1E54] text-white shadow-xs'
                    : 'text-[#4A4358] hover:text-[#181326]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onStartDemo}
          className={`min-h-[40px] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
            isDemoActive
              ? 'bg-[#B84A62] text-white'
              : 'bg-[#181326] text-white hover:bg-[#3B1E54]'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{t.demoBadgeLabel}</span>
        </button>
      </div>
    </header>
  );
};
