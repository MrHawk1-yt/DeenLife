export interface NavItem {
  id: string;
  label: string;
  icon: any; // Lucide icon component type
}

export interface PrayerTimeData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export interface Habit {
  id: string;
  name: string;
  completedDates: string[]; // ISO date strings
  streak: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ContentItem {
  id: string;
  title: string;
  arabic?: string;
  translation: string;
  reference?: string;
  category?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export type Language = 'en' | 'ur' | 'ar' | 'id' | 'ru'; // English, Urdu, Arabic, Indonesian, Roman Urdu

export interface UserProfile {
  displayName: string;
  email: string;
  bio: string;
  location: string;
}

export interface AppSettings {
  language: Language;
  calculationMethod: number;
  asrMethod: 0 | 1; // 0 = Standard (Shafi, Maliki, Hanbali), 1 = Hanafi
  notifications: {
    Fajr: boolean;
    Sunrise: boolean;
    Dhuhr: boolean;
    Asr: boolean;
    Maghrib: boolean;
    Isha: boolean;
  };
}

export type ViewState = 
  | 'home' 
  | 'sunnah-habits' 
  | 'quran-tracker' 
  | 'quran-audio' 
  | 'hadith-collection' 
  | 'dua-collection' 
  | 'islamic-info'
  | 'prayer-times' 
  | 'qibla-finder' 
  | 'settings'
  | 'profile'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'disclaimer';
