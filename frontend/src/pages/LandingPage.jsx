import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, ChevronRight, Sprout } from 'lucide-react';

export default function LandingPage() {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col h-[100dvh] w-full overflow-hidden font-sans p-6">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-10" /> 
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/public/um_satélite_em_volta_da_terra.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col h-full w-full">
        
        {/* Top Bar - Dynamic Time */}
        <div className="flex justify-start w-full mb-4">
          <span className="text-white text-xs font-medium">
            {time}
          </span>
        </div>

        {/* Header */}
        <header className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <img src="/logo.png" alt="YVY Logo" className="h-12 w-auto object-contain drop-shadow-md" />
          </div>
          <Link
            to="/auth"
            state={{ tab: 'entrar' }}
            className="bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-transform hover:scale-105"
          >
            Entrar
          </Link>
        </header>

        {/* Hero Content (Pushed to bottom) */}
        <main className="flex flex-col justify-end w-full flex-grow pb-8 gap-4">
          
          {/* ODS Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/20 w-max backdrop-blur-sm">
            <Globe className="w-4 h-4 text-white" />
            <span className="text-xs font-medium text-white tracking-wide">ODS 2 + ODS 13</span>
          </div>

          {/* Typography */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[40px] font-bold leading-[1.1] text-white">
              Plante com o<br />clima a seu favor.
            </h1>
            <p className="text-[#DCE3DD] text-[15px] leading-relaxed max-w-[90%]">
              Dados orbitais, histórico da região e IA para prever janela de plantio, colheita, rendimento e risco da propriedade.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-row gap-4 items-center w-full mt-2">
            <Link
              to="/auth"
              className="bg-[#1F7A4C] hover:bg-[#155d38] text-white font-bold px-6 py-4 rounded-xl flex-grow flex flex-row items-center justify-between transition-colors"
            >
              <span>Criar gêmeo digital</span>
              <ChevronRight className="w-5 h-5 text-white" />
            </Link>
          </div>

          {/* Footer Cards */}
          <footer className="flex flex-row gap-4 w-full mt-2">
            {/* ODS 2 Card */}
            <div className="w-1/2 flex flex-col items-start p-4 rounded-xl bg-black/40 border border-white/20 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-white mb-1">ODS 2</h3>
              <p className="text-xs text-[#DCE3DD] leading-relaxed">Mais produtividade e previsibilidade no campo.</p>
            </div>

            {/* ODS 13 Card */}
            <div className="w-1/2 flex flex-col items-start p-4 rounded-xl bg-black/40 border border-white/20 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-white mb-1">ODS 13</h3>
              <p className="text-xs text-[#DCE3DD] leading-relaxed">Resposta antecipada a seca, chuva e queimadas.</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
