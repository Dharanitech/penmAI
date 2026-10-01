export type Language = 'ta' | 'en' | 'hi';

export type ResourceCategoryKey =
  | 'skill'
  | 'employment'
  | 'financial'
  | 'entrepreneurship'
  | 'education'
  | 'digital';

export interface DocumentItem {
  id: string;
  name: Record<Language, string>;
  explanation: Record<Language, string>;
  howToGet: Record<Language, string>;
}

export interface ActionStep {
  stepNumber: number;
  iconName: 'file' | 'globe' | 'edit' | 'check';
  title: Record<Language, string>;
  detail: Record<Language, string>;
}

export interface GovernmentResource {
  id: string;
  name: Record<Language, string>;
  category: Record<Language, string>;
  categoryKey: ResourceCategoryKey;
  verificationType: 'verified_official' | 'curated_demo';
  description: Record<Language, string>;
  whyRelevant: Record<Language, string>;
  targetUser: Record<Language, string>;
  eligibility: Record<Language, string[]>;
  documents: DocumentItem[];
  steps: ActionStep[];
  language: Language[];
  officialUrl: string;
  officialPortalName: Record<Language, string>;
  disclaimer: Record<Language, string>;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  localizedTerm: Record<Language, string>;
  simpleExplanation: Record<Language, string>;
  exampleContext: Record<Language, string>;
}

export type QuestionKey =
  | 'initial'
  | 'age'
  | 'location'
  | 'previousEmployment'
  | 'income'
  | 'complete';

export interface ConversationState {
  intent?: ResourceCategoryKey;
  language: Language;
  age?: string;
  location?: string;
  education?: string;
  employmentStatus?: string;
  annualIncome?: string;
  currentQuestionKey: QuestionKey;
  matchedResourceId?: string;
  askedDontKnowOn?: QuestionKey[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  subtext?: string;
  isDontKnowCoaching?: boolean;
  questionKey?: QuestionKey;
  quickReplies?: Array<{
    label: string;
    value: string;
  }>;
  showDontKnowButton?: boolean;
  dontKnowLabel?: string;
  matchedResourceId?: string;
  timestamp: number;
}

export interface AccessibilitySettings {
  fontScale: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  autoReadAloud: boolean;
  slowSpeech: boolean;
}

export type SpeechSupportStatus =
  | 'checking'
  | 'supported'
  | 'unsupported'
  | 'permission-denied'
  | 'service-unavailable'
  | 'restricted';
