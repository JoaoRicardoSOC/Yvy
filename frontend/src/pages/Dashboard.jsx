import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bell, Cloud, Home, TrendingUp, User, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFazenda } from '../application/context/FazendaContext';
import { PrevisaoRepositoryMock } from '../infrastructure/repositories/PrevisaoRepositoryMock';

export default function Dashboard() {
  const { fazendas } = useFazenda();
  const primeiraFazenda = fazendas.length > 0 ? fazendas[0] : null;
  const talhoes = primeiraFazenda?.talhoes || [];
  const [time, setTime] = useState('09:41');
  const produtor = JSON.parse(localStorage.getItem('produtor') || '{}');
  const nome = produtor.nome ? produtor.nome.split(' ')[0] : 'Produtor'; // Pega só o primeiro nome
  const propriedade = primeiraFazenda ? primeiraFazenda.nome : 'Minha Propriedade';
  
  // Define uma localidade mock baseada no IBGE ou genérica
  const localidadeMap = {
    '3543907': 'Rio Claro, SP',
    '4115200': 'Maringá, PR',
    '4302105': 'Bento Gonçalves, RS'
  };
  const localidade = primeiraFazenda ? (localidadeMap[primeiraFazenda.codigoIbge] || 'Localidade Mapeada') : 'Não informada';

  // Obtém dados dinâmicos do clima baseado no IBGE da fazenda
  const previsoes = primeiraFazenda ? PrevisaoRepositoryMock.getPrevisaoByCidade(primeiraFazenda.codigoIbge) : [];
  
  // Se não houver previsão mapeada exata, gera valores plausíveis com base no IBGE para evitar dados estáticos
  const tempFallback = primeiraFazenda ? 22 + (Number(primeiraFazenda.codigoIbge) % 10) : 27;
  const chuvaFallback = primeiraFazenda ? 50 + (Number(primeiraFazenda.codigoIbge) % 150) : 18;
  
  const climaAtual = previsoes.length > 0 ? previsoes[0] : { temperaturaMedia: tempFallback, volumeChuvaMm: chuvaFallback };

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
    <div className="min-h-screen w-full bg-[#EEF1F0] text-black font-sans flex flex-col absolute inset-0 z-50 overflow-x-hidden">
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 px-6 py-4">
        
        {/* Top Bar - Dynamic Time */}
        <div className="flex justify-start w-full mb-6">
          <span className="text-black text-xs font-medium">
            {time}
          </span>
        </div>

        {/* Header Section */}
        <header className="flex justify-between items-start w-full mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-500">Bom dia, {nome}</span>
            <h1 className="text-[32px] font-bold leading-tight tracking-tight text-black">
              Controle da safra
            </h1>
            <div className="flex items-center gap-1.5 mt-1 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-semibold">{propriedade}, {localidade}</span>
            </div>
          </div>
          <button className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center shrink-0">
            <Bell className="w-6 h-6 text-black" />
          </button>
        </header>

        {/* Weather Widget */}
        <div className="bg-[#E2EAF4] rounded-[24px] p-5 flex flex-col mb-10 shadow-sm border border-blue-100/50">
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-gray-600 text-sm">Clima agora na fazenda</span>
            <Cloud className="w-6 h-6 text-gray-600 fill-current" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[56px] font-bold leading-none tracking-tighter">{climaAtual.temperaturaMedia}°</span>
          </div>
          <span className="text-gray-600 font-bold text-sm mb-5">Parcialmente nublado</span>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-3 flex flex-col justify-center shadow-sm">
              <span className="font-bold text-sm leading-tight text-black">68%</span>
              <span className="font-bold text-xs text-gray-500">umidade</span>
            </div>
            <div className="bg-white rounded-xl p-3 flex flex-col justify-center shadow-sm">
              <span className="font-bold text-sm leading-tight text-black">12</span>
              <span className="font-bold text-xs text-gray-500">km/h vento</span>
            </div>
            <div className="bg-white rounded-xl p-3 flex flex-col justify-center shadow-sm">
              <span className="font-bold text-sm leading-tight text-black">{climaAtual.volumeChuvaMm}</span>
              <span className="font-bold text-xs text-gray-500">mm acumulado</span>
            </div>
          </div>
        </div>

        {/* Áreas de plantio Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Áreas de plantio</h2>
          <Link to="/nova-analise/novo" className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            <Plus className="w-4 h-4" />
            Nova
          </Link>
        </div>

        {/* Plant Areas List */}
        <div className="flex flex-col gap-4">
          
          {talhoes.map((t, index) => {
            const isPlantado = t.status === 'PLANTADO';
            const culturaTexto = isPlantado && t.dadosPlantioAtual ? ` • ${t.dadosPlantioAtual.cultura.toLowerCase()}` : ' • vazio';
            
            // Variar as cores para fidelidade visual
            const cores = [
              { bg: 'from-[#8DC63F] via-[#4BA451] to-white/80', dot: 'bg-[#1F7A4C]', borderHover: 'hover:border-[#1F7A4C]', iconBg: 'bg-[#E8F5EE]' },
              { bg: 'bg-[#835C3B]', dot: 'bg-[#D59522]', borderHover: 'hover:border-[#D59522]', iconBg: 'bg-[#FDF1E3]' },
              { bg: 'bg-[#1F7A4C]', dot: 'bg-[#1F7A4C]', borderHover: 'hover:border-[#1F7A4C]', iconBg: 'bg-[#E8F5EE]' }
            ];
            const colorSet = cores[index % cores.length];

            return (
              <Link key={t.id} to={`/nova-analise/${t.id}?fazendaId=${primeiraFazenda.id}`} className={`bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100 shadow-sm ${colorSet.borderHover} transition-colors cursor-pointer block`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl shrink-0 ${colorSet.bg} shadow-inner`}></div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[15px] mb-0.5">{t.nome}</span>
                    <span className="text-gray-500 text-[13px]">{t.tamanhoHectares} ha • solo {t.tipoSolo.toLowerCase()}{culturaTexto}</span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full ${colorSet.iconBg} flex items-center justify-center shrink-0`}>
                  <div className={`w-3.5 h-3.5 rounded-full ${colorSet.dot}`}></div>
                </div>
              </Link>
            );
          })}

          {talhoes.length === 0 && (
            <div className="text-center text-gray-500 py-8">Nenhum talhão cadastrado.</div>
          )}

        </div>

      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-6 left-6 right-6">
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex justify-between items-center px-6 py-4">
          
          <button className="flex flex-col items-center gap-1.5 min-w-[64px]">
            <Home className="w-6 h-6 text-[#1F7A4C]" />
            <span className="text-xs font-semibold text-[#1F7A4C]">Home</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 min-w-[64px]">
            <MapPin className="w-6 h-6 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500">Talhões</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 min-w-[64px]">
            <TrendingUp className="w-6 h-6 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500">Análises</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 min-w-[64px]">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500">Perfil</span>
          </button>

        </div>
      </div>

    </div>
  );
}
