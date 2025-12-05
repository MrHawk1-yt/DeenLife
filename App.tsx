import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './views/Dashboard';
import { PrayerTimes } from './views/PrayerTimes';
import { Habits } from './views/Habits';
import { AskAI } from './views/AskAI';
import { Landing } from './components/Landing';
import { Settings } from './views/Settings';
import { QuranAudio } from './views/QuranAudio';
import { Profile } from './views/Profile';
import { HadithCollection } from './views/HadithCollection';
import { QuranTracker } from './views/QuranTracker';
import { DuaCollection } from './views/DuaCollection';
import { IslamicInfo } from './views/IslamicInfo';
import { QiblaFinder } from './views/QiblaFinder';
import { ContactUs, PrivacyPolicy, TermsConditions, Disclaimer } from './views/LegalDocs';
import { ViewState, AppSettings } from './types';
import { BannerAd, InterstitialAd } from './components/Ads';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({
      language: 'en',
      calculationMethod: 2,
      asrMethod: 0,
      notifications: {
        Fajr: true, Sunrise: false, Dhuhr: true, Asr: true, Maghrib: true, Isha: true
      }
  });

  // Ad State
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [pendingView, setPendingView] = useState<ViewState | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('appSettings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
    const visited = localStorage.getItem('hasVisited');
    if (visited) {
      setShowLanding(false);
    }
  }, []);

  const handleGetStarted = () => {
    setShowLanding(false);
    localStorage.setItem('hasVisited', 'true');
  };

  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  // Intercept navigation to show ads
  const handleNavigation = (view: ViewState) => {
    // If we are already on the view, do nothing
    if (view === currentView) return;

    // Trigger Ad
    setPendingView(view);
    setShowInterstitial(true);
  };

  // Called when ad is closed/continued
  const handleAdClose = () => {
    setShowInterstitial(false);
    if (pendingView) {
      setCurrentView(pendingView);
      setPendingView(null);
    }
  };

  const isRTL = settings.language === 'ar' || settings.language === 'ur';

  if (showLanding) {
    return <Landing onGetStarted={handleGetStarted} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Dashboard changeView={handleNavigation} />;
      case 'prayer-times':
        return <PrayerTimes />;
      case 'sunnah-habits':
        return <Habits lang={settings.language} />;
      case 'ask-ai':
        return <AskAI />;
      case 'hadith-collection':
        return <HadithCollection lang={settings.language} />;
      case 'dua-collection':
        return <DuaCollection />;
      case 'islamic-info':
        return <IslamicInfo />;
      case 'settings':
        return <Settings lang={settings.language} updateSettings={updateSettings} changeView={handleNavigation} />;
      case 'quran-audio':
        return <QuranAudio />;
      case 'profile':
        return <Profile lang={settings.language} />;
      case 'quran-tracker':
        return <QuranTracker />;
       case 'qibla-finder':
        return <QiblaFinder />;
      case 'contact':
        return <ContactUs />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsConditions />;
      case 'disclaimer':
        return <Disclaimer />;
      default:
        return <div className="text-white p-10">Feature Under Development</div>;
    }
  };

  return (
    <div className="min-h-screen bg-deen-900 text-gray-100 flex overflow-hidden font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Interstitial Ad Overlay */}
      <InterstitialAd isOpen={showInterstitial} onClose={handleAdClose} />

      <Sidebar 
        currentView={currentView} 
        setView={handleNavigation} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        lang={settings.language} 
      />

      {/* Main Container - Adjusts margin based on direction */}
      <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${isRTL ? 'md:mr-64' : 'md:ml-64'}`}>
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-deen-900 border-b border-deen-800 z-10 sticky top-0 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-deen-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
            <span className="font-bold text-lg">DeenLife</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-200 p-2">
            <Menu size={24} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative custom-scrollbar">
          {renderView()}
        </main>
        
        {/* Banner Ad Fixed Bottom */}
        <BannerAd />
      </div>
    </div>
  );
}

export default App;