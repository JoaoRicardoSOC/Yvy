import { useState, useEffect } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, Upload, CalendarDays, LineChart, Leaf, Crosshair, Droplet, DollarSign } from 'lucide-react';

export default function Resultado() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resultado, fazenda, talhao } = location.state || {};
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

  if (!resultado || !fazenda || !talhao) return <Navigate to="/dashboard" replace />;

  // Mapeamento dinâmico baseado no risco
  const isRiscoAlto = resultado.nivelRisco === 'ALTO';
  const isRiscoBaixo = resultado.nivelRisco === 'BAIXO';
  const isRiscoMedio = !isRiscoAlto && !isRiscoBaixo;

  const getRiscoTitle = () => {
    if (isRiscoAlto) return "Risco alto.";
    if (isRiscoBaixo) return "Risco baixo.";
    return "Risco moderado.";
  };

  const getRiscoSubtitle = () => {
    if (isRiscoAlto) return "O talhão apresenta vulnerabilidades severas, sugerimos rever a janela ou estratégia.";
    if (isRiscoBaixo) return "Cenário altamente favorável. A janela escolhida maximiza o potencial da safra.";
    return "O talhão está apto, mas a chuva prevista pede uma janela de plantio mais precisa.";
  };

  // Calcula total baseado no rendimento e tamanho
  const rendimentoNumerico = parseFloat(String(resultado.estimativaRendimento).replace(/\./g, '').replace(',', '.')) || 63;
  const tamanho = talhao.tamanhoHectares || 42;
  const totalSacas = Math.round(rendimentoNumerico * tamanho);

  return (
    <div className="min-h-screen w-full bg-[#F7F9F8] text-black font-sans flex flex-col absolute inset-0 z-50 overflow-x-hidden">
      
      <div className="flex-1 overflow-y-auto pb-24 px-6 py-4">
        
        {/* Top Bar - Dynamic Time */}
        <div className="flex justify-start w-full mb-6">
          <span className="text-black text-xs font-medium">
            {time}
          </span>
        </div>

        {/* Header Actions */}
        <header className="flex justify-between items-center w-full mb-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center shrink-0 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>
          
          <div className="flex gap-2">
            <button className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50">
              <Download className="w-5 h-5 text-black" />
            </button>
            <button className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50">
              <Upload className="w-5 h-5 text-black" />
            </button>
          </div>
        </header>

        {/* Title Section */}
        <div className="mb-6">
          <span className="text-[13px] font-bold text-gray-500 mb-1 block">
            Veredito espacial • {resultado.cultura}
          </span>
          <h1 className="text-[34px] font-bold leading-tight tracking-tight text-black mb-3">
            {getRiscoTitle()}
          </h1>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            {getRiscoSubtitle()}
          </p>
        </div>

        {/* Main Janela de Plantio Card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm mb-6">
          <div className="grid grid-cols-3 gap-3 mb-6">
            
            <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${isRiscoBaixo ? 'bg-[#FFF9EC] border-[#F2D6A2]' : 'bg-[#F2F4F3] border-transparent'}`}>
              <div className="w-8 h-8 rounded-full bg-[#E5EBE8] flex items-center justify-center mb-2">
                <div className="w-5 h-5 rounded-full bg-[#8EB19D]"></div>
              </div>
              <span className="text-[13px] text-gray-500 font-medium">Baixo</span>
            </div>

            <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${isRiscoMedio ? 'bg-[#FFF9EC] border-[#F2D6A2]' : 'bg-[#F2F4F3] border-transparent'}`}>
              <div className="w-8 h-8 rounded-full bg-[#F5E6D3] flex items-center justify-center mb-2">
                <div className="w-5 h-5 rounded-full bg-[#D59522]"></div>
              </div>
              <span className="text-[13px] text-black font-medium">Médio</span>
            </div>

            <div className={`flex flex-col items-center justify-center p-3 rounded-xl border ${isRiscoAlto ? 'bg-[#FFF9EC] border-[#F2D6A2]' : 'bg-[#F2F4F3] border-transparent'}`}>
              <div className="w-8 h-8 rounded-full bg-[#F5E1E1] flex items-center justify-center mb-2">
                <div className="w-5 h-5 rounded-full bg-[#D98C8C]"></div>
              </div>
              <span className="text-[13px] text-gray-500 font-medium">Alto</span>
            </div>

          </div>

          <h3 className="text-[18px] font-bold text-black mb-2">
            Plantar entre {resultado.janelaIdealPlantio || '12 e 18 de outubro'}
          </h3>
          <p className="text-gray-500 text-[14px] leading-relaxed">
            Essa janela equilibra umidade do solo, baixa chance de seca inicial e colheita antes do pico de chuva.
          </p>
        </div>

        {/* 4x Grid Indicators */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex flex-col justify-center">
            <CalendarDays className="w-6 h-6 text-gray-500 mb-3" strokeWidth={1.5} />
            <span className="text-gray-600 font-bold text-[12px] block mb-1">Colheita prevista</span>
            <span className="font-bold text-[18px] text-black block">{resultado.previsaoColheita?.substring(0, 6) || '24 fev'}</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex flex-col justify-center">
            <LineChart className="w-6 h-6 text-gray-500 mb-3" strokeWidth={1.5} />
            <span className="text-gray-600 font-bold text-[12px] block mb-1">Rendimento</span>
            <span className="font-bold text-[18px] text-black block">{resultado.estimativaRendimento || '63'} {resultado.unidadeMedida || 'sc/ha'}</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex flex-col justify-center">
            <Leaf className="w-6 h-6 text-gray-500 mb-3" strokeWidth={1.5} />
            <span className="text-gray-600 font-bold text-[12px] block mb-1">Total provável</span>
            <span className="font-bold text-[18px] text-black block">{totalSacas.toLocaleString('pt-BR')} sc</span>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex flex-col justify-center">
            <Crosshair className="w-6 h-6 text-gray-500 mb-3" strokeWidth={1.5} />
            <span className="text-gray-600 font-bold text-[12px] block mb-1">Confiança</span>
            <span className="font-bold text-[18px] text-black block">82%</span>
          </div>

        </div>

        {/* Principais Riscos */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[22px] font-bold text-black">Principais riscos</h2>
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm text-sm font-bold text-black hover:bg-gray-50 transition-colors">
              Detalhes
            </button>
          </div>

          <div className="flex flex-col gap-3">
            
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <Droplet className="w-6 h-6 text-gray-600 shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="font-bold text-[14px] text-black">Excesso de chuva</span>
                  <span className="text-[13px] text-gray-500">Risco se plantar antes de 10/out.</span>
                </div>
              </div>
              <div className="bg-[#FFF3E0] px-3 py-1 rounded-full shrink-0">
                <span className="text-[#A46714] font-bold text-[12px]">Médio</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <DollarSign className="w-6 h-6 text-gray-600 shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="font-bold text-[14px] text-black">Perda econômica</span>
                  <span className="text-[13px] text-gray-500">Estimativa controlada na janela indicada.</span>
                </div>
              </div>
              <div className="bg-[#E8F5EE] px-3 py-1 rounded-full shrink-0">
                <span className="text-[#1F7A4C] font-bold text-[12px]">Baixo</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
