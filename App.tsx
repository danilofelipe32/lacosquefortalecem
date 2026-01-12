import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Methodology from './components/Methodology';
import Interventions from './components/Interventions';
import Statistics from './components/Statistics';
import Conclusion from './components/Conclusion';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import GlobalStyles from './components/GlobalStyles';
import { ProfileModal, ImageModal, InstitutionModal, MunicipalityModal } from './components/Modals';

function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInstOpen, setIsInstOpen] = useState(false);
  const [isMunOpen, setIsMunOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-slate-50">
        <Navbar onOpenProfile={() => setIsProfileOpen(true)} />
        
        <main>
          <Hero />
          <About />
          <Methodology />
          <Interventions onImageClick={setSelectedImage} />
          <Statistics 
            onOpenInstitution={() => setIsInstOpen(true)} 
            onOpenMunicipality={() => setIsMunOpen(true)} 
          />
          <Conclusion />
        </main>
        
        <Footer />
        <ChatWidget />

        {/* Modals */}
        <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        <InstitutionModal isOpen={isInstOpen} onClose={() => setIsInstOpen(false)} />
        <MunicipalityModal isOpen={isMunOpen} onClose={() => setIsMunOpen(false)} />
        <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      </div>
    </>
  );
}

export default App;