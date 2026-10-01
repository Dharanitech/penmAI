import React from 'react';
import { AccessibilitySettings, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { Volume2, VolumeX, Eye, Type as TypeIcon, Gauge } from 'lucide-react';

interface AccessibilityBarProps {
  language: Language;
  settings: AccessibilitySettings;
  onUpdateSettings: (next: Partial<AccessibilitySettings>) => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  language,
  settings,
  onUpdateSettings,
}) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <div
      role="region"
      aria-label={t.accessibilityLabel}
      className="bg-[#F3EFEA] border-b border-[#E6E0D6] px-4 sm:px-8 py-2"
    >
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#4A4358]">
        <span className="font-medium text-[#181326] flex items-center gap-2">
          <span>{t.accessibilityLabel}</span>
        </span>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {/* Font Scale */}
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-[#E2DBD0]">
            <TypeIcon className="w-3.5 h-3.5 text-[#3B1E54]" />
            <span className="sr-only">{t.fontSizeLabel}</span>
            {(
              [
                { key: 'normal', label: 'A' },
                { key: 'large', label: 'A+' },
                { key: 'xlarge', label: 'A++' },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => onUpdateSettings({ fontScale: item.key })}
                className={`min-h-[28px] min-w-[28px] px-2 rounded text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  settings.fontScale === item.key
                    ? 'bg-[#3B1E54] text-white'
                    : 'text-[#4A4358] hover:text-[#181326]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Global 'Read Aloud' Setting (Defaults to active as per accessibility requirements) */}
          <button
            type="button"
            role="switch"
            aria-checked={settings.autoReadAloud}
            onClick={() =>
              onUpdateSettings({ autoReadAloud: !settings.autoReadAloud })
            }
            title={
              settings.autoReadAloud
                ? 'Read Aloud is active: all assistant responses will be spoken aloud'
                : 'Read Aloud is muted: click to re-enable voice responses'
            }
            className={`min-h-[36px] px-3.5 py-1.5 rounded-lg border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
              settings.autoReadAloud
                ? 'bg-[#3B1E54] text-white border-[#3B1E54] shadow-xs'
                : 'bg-white text-[#655B75] border-[#D8CFC0] hover:text-[#181326] hover:border-[#3B1E54]'
            }`}
          >
            {settings.autoReadAloud ? (
              <>
                <Volume2 className="w-4 h-4 text-[#F6C6D0]" />
                <span className="flex items-center gap-1.5">
                  <span>{t.readAloudSettingTitle}:</span>
                  <span className="text-[#F6C6D0] font-bold">
                    {t.readAloudActiveLabel}
                  </span>
                </span>
                <span className="w-2 h-2 rounded-full bg-[#48D576]" />
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#8A8098]" />
                <span className="flex items-center gap-1.5">
                  <span>{t.readAloudSettingTitle}:</span>
                  <span className="text-[#8A8098] font-bold">
                    {t.readAloudDisabledLabel}
                  </span>
                </span>
              </>
            )}
          </button>

          {/* Slower Speech */}
          <button
            type="button"
            onClick={() =>
              onUpdateSettings({ slowSpeech: !settings.slowSpeech })
            }
            aria-pressed={settings.slowSpeech}
            className={`min-h-[34px] px-3 py-1 rounded-md border text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              settings.slowSpeech
                ? 'bg-[#3B1E54] text-white border-[#3B1E54]'
                : 'bg-white text-[#4A4358] border-[#E2DBD0] hover:text-[#181326]'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{t.slowSpeechLabel}</span>
          </button>

          {/* High Contrast */}
          <button
            type="button"
            onClick={() =>
              onUpdateSettings({ highContrast: !settings.highContrast })
            }
            aria-pressed={settings.highContrast}
            className={`min-h-[34px] px-3 py-1 rounded-md border text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              settings.highContrast
                ? 'bg-[#181326] text-white border-[#181326]'
                : 'bg-white text-[#4A4358] border-[#E2DBD0] hover:text-[#181326]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.highContrastLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
