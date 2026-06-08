import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

import { MotorPreditivoService } from '../application/services/MotorPreditivoService';
import { useFazenda } from '../application/context/FazendaContext';
import { Talhao } from '../domain/entities';

export default function NovaAnalise() {
  const navigate = useNavigate();
  const { talhaoId } = useParams();
  const [searchParams] = useSearchParams();
  const fazendaId = searchParams.get('fazendaId');

  const [time, setTime] = useState('09:41');
  
  const { fazendas, adicionarTalhao } = useFazenda();
  const [talhoesOptions, setTalhoesOptions] = useState([]);
  
  // Modal Novo Talhão
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoTalhaoNome, setNovoTalhaoNome] = useState('');
  const [novoTalhaoTamanho, setNovoTalhaoTamanho] = useState('');
  const [novoTalhaoFazendaId, setNovoTalhaoFazendaId] = useState('');
  
  // Selected context
  const [selectedFazendaId, setSelectedFazendaId] = useState(fazendaId || '');
  const [selectedTalhaoId, setSelectedTalhaoId] = useState(talhaoId || '');

  // Form State - Default para "Aha Moment" (Alto Risco)
  const [activeCultura, setActiveCultura] = useState('Milho');
  const [tamanho, setTamanho] = useState('42');
  const [declividade, setDeclividade] = useState('Alta');
  const [adubacao, setAdubacao] = useState('Atrasada');
  const [calcario, setCalcario] = useState('Não aplicado');
  const [activeSolos, setActiveSolos] = useState(['Arenoso']);

  const [isSimulating, setIsSimulating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const loadingMessages = [
    'Estabelecendo conexão orbital...',
    'Lendo dados históricos da região...',
    'Processando motor de Machine Learning...',
    'Avaliando déficit hídrico e riscos...',
    'Finalizando projeção de safra...'
  ];

  const [techLogs, setTechLogs] = useState([]);

  // Initialize time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load Fazendas and build options
  useEffect(() => {
    let options = [];
    fazendas.forEach(f => {
      if (f.talhoes) {
        f.talhoes.forEach(t => {
          options.push({
            fazendaId: f.id,
            talhaoId: t.id,
            label: `${f.nome} · ${t.nome}`,
            tamanhoHectares: t.tamanhoHectares
          });
        });
      }
    });
    setTalhoesOptions(options);

    // Initial fallback selection if missing
    if (!selectedFazendaId && !selectedTalhaoId && options.length > 0) {
      setSelectedFazendaId(options[0].fazendaId);
      setSelectedTalhaoId(options[0].talhaoId);
      setTamanho(String(options[0].tamanhoHectares));
    }
  }, [fazendas, selectedFazendaId, selectedTalhaoId]);

  // Loading animation with technical logs
  useEffect(() => {
    let interval;
    let logInterval;
    if (isSimulating) {
      let currentIndex = 0;
      setLoadingMessage(loadingMessages[currentIndex]);
      setTechLogs(['> INITIATING PREDICTIVE SEQUENCE...']);
      
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[currentIndex]);
      }, 1000);

      const possibleLogs = [
        '[NASA POWER] Fetching coordinates...',
        '[NASA POWER] 10-year historical data loaded.',
        '[ML ENGINE] Calculating NDVI index...',
        '[ML ENGINE] Applying Random Forest classifier...',
        '[AGRO] Checking soil moisture models...',
        '[SYS] Cross-referencing current market prices...',
        '[WARN] High deficit probability detected in week 4.',
        '[CALC] Adjusting yield estimation -30%.'
      ];

      logInterval = setInterval(() => {
        const randomLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
        setTechLogs(prev => [...prev.slice(-3), `> ${randomLog}`]);
      }, 600);
    }
    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [isSimulating]);

  const handleSelectTalhao = (e) => {
    const val = e.target.value;
    if (val === 'novo') {
      setNovoTalhaoFazendaId(selectedFazendaId || (fazendas.length > 0 ? fazendas[0].id : ''));
      setIsModalOpen(true);
      return;
    }
    
    if (!val) return;
    const [fId, tId] = val.split('|');
    setSelectedFazendaId(fId);
    setSelectedTalhaoId(tId);

    // Pre-fill size based on selected talhao
    const opt = talhoesOptions.find(o => o.talhaoId === tId);
    if (opt && opt.tamanhoHectares) {
      setTamanho(String(opt.tamanhoHectares));
    }
  };

  const handleCreateTalhao = (e) => {
    e.preventDefault();
    if (!novoTalhaoFazendaId) {
      toast.error('Selecione uma fazenda.');
      return;
    }
    const talhao = new Talhao(
      `talhao_${Date.now()}`,
      novoTalhaoNome,
      Number(novoTalhaoTamanho),
      'Misto', 
      false, 
      'VAZIO',
      null
    );
    adicionarTalhao(novoTalhaoFazendaId, talhao);
    toast.success('Talhão criado com sucesso!');
    setIsModalOpen(false);
    
    setSelectedFazendaId(novoTalhaoFazendaId);
    setSelectedTalhaoId(talhao.id);
    setTamanho(String(talhao.tamanhoHectares));
    setNovoTalhaoNome('');
    setNovoTalhaoTamanho('');
  };

  const toggleSolo = (solo) => {
    setActiveSolos(prev => 
      prev.includes(solo) ? prev.filter(s => s !== solo) : [...prev, solo]
    );
  };

  const handleSaveDraft = () => {
    const rascunhos = JSON.parse(localStorage.getItem('rascunhos_analise') || '[]');
    rascunhos.push({
      id: `rascunho_${Date.now()}`,
      fazendaId: selectedFazendaId,
      talhaoId: selectedTalhaoId,
      cultura: activeCultura,
      tamanho,
      declividade,
      adubacao,
      calcario,
      solos: activeSolos,
      data: new Date().toISOString()
    });
    localStorage.setItem('rascunhos_analise', JSON.stringify(rascunhos));
    toast.success('Rascunho salvo com sucesso!');
  };

  const handleGenerate = async () => {
    setIsSimulating(true);
    
    try {
      const fazenda = fazendas.find(f => f.id === selectedFazendaId) || fazendas[0] || { id: selectedFazendaId, nome: 'Fazenda' };
      const talhao = fazenda.talhoes?.find(t => t.id === selectedTalhaoId) || { id: selectedTalhaoId, nome: 'Talhão' };

      const resultado = await MotorPreditivoService.gerarRecomendacao(
        'NOVO_PLANTIO',
        fazenda,
        talhao,
        { 
          cultura: activeCultura, 
          dataPlantio: new Date().toISOString(),
          tamanho,
          declividade,
          adubacao,
          calcario,
          solos: activeSolos
        }
      );

      const historico = JSON.parse(localStorage.getItem('historico_analises') || '[]');
      const novaAnalise = {
        id: `analise_${Date.now()}`,
        fazendaId: fazenda?.id,
        talhaoId: talhao?.id,
        ...resultado
      };
      historico.push(novaAnalise);
      localStorage.setItem('historico_analises', JSON.stringify(historico));

      setTimeout(() => {
        setIsSimulating(false);
        navigate('/resultado', { state: { resultado, fazenda, talhao } });
      }, 4000);

    } catch (error) {
      setIsSimulating(false);
      toast.error(error.message || 'Erro ao gerar análise.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F9F8] text-black font-sans flex flex-col absolute inset-0 z-50 overflow-x-hidden">
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {isSimulating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#F7F9F8]/90 backdrop-blur-md"
          >
            <div className="flex flex-col items-center max-w-md text-center px-4">
              <div className="relative mb-8">
                <span className="text-[#1F7A4C] text-2xl font-bold animate-pulse">Processando...</span>
              </div>
              <motion.h2 
                key={loadingMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-black"
              >
                {loadingMessage}
              </motion.h2>
              <p className="text-gray-500 mt-4 text-sm mb-6">
                Aguarde enquanto cruzamos as variáveis agronômicas e climáticas usando os bancos de dados orbitais.
              </p>

              {/* Technical Logs */}
              <div className="w-full bg-black/5 border border-black/10 rounded-lg p-3 text-left font-mono text-[10px] text-[#1F7A4C] leading-relaxed overflow-hidden h-24 flex flex-col justify-end">
                {techLogs.map((log, i) => (
                  <motion.div 
                    key={`${log}-${i}`}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="truncate"
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            onClick={() => navigate(-1)}
            className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center shrink-0 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>
          
          <button 
            onClick={handleSaveDraft}
            className="bg-white hover:bg-gray-50 text-black text-sm font-bold px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm transition-colors"
          >
            Salvar rascunho
          </button>
        </header>

        {/* Progress Bar */}
        <div className="flex items-center w-full h-2 rounded-full overflow-hidden mb-4 bg-[#DCE3DD]">
          <div className="h-full bg-[#236A9F]" style={{ width: '66%' }}></div>
        </div>

        {/* Typography */}
        <span className="text-sm font-bold text-gray-500 mb-2 block">
          Nova análise · etapa 2 de 3
        </span>
        <h1 className="text-[32px] font-bold leading-tight tracking-tight text-black mb-3">
          Monte o cenário de<br />plantio.
        </h1>
        <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
          Use o que você já sabe. A IA cruza manejo, clima, satélite e histórico da região.
        </p>

        {/* Fazenda e Talhão Selector */}
        <div className="mb-6">
          <label className="text-[14px] font-bold text-gray-700 block mb-2">Fazenda e talhão</label>
          <div className="relative flex items-center">
            <select 
              value={`${selectedFazendaId}|${selectedTalhaoId}`}
              onChange={handleSelectTalhao}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 pr-12 text-black text-[14px] font-medium focus:outline-none focus:border-[#1F7A4C] appearance-none cursor-pointer"
            >
              <option value="" disabled>Selecione um talhão...</option>
              {talhoesOptions.map(opt => (
                <option key={`${opt.fazendaId}|${opt.talhaoId}`} value={`${opt.fazendaId}|${opt.talhaoId}`}>
                  {opt.label}
                </option>
              ))}
              {talhoesOptions.length === 0 && (
                <option value="1|1">Boa Esperança · Talhão Norte</option>
              )}
              <option value="novo">+ Criar Novo Talhão</option>
            </select>
            <ChevronDown className="w-5 h-5 text-black absolute right-4 pointer-events-none" />
          </div>
        </div>

        {/* Cultura Section */}
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-[14px] font-bold text-gray-700">Cultura</label>
            <span className="text-[13px] font-bold text-gray-400">Safra 2026</span>
          </div>
          
          <input 
            type="text"
            value={activeCultura}
            onChange={(e) => setActiveCultura(e.target.value)}
            placeholder="Digite a cultura (ex: Soja, Milho...)"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-black text-[14px] font-medium mb-3 focus:outline-none focus:border-[#1F7A4C]"
          />
        </div>

        {/* Dados do Talhão */}
        <div className="mb-6">
          <label className="text-[14px] font-bold text-gray-700 block mb-2">Dados do talhão</label>
          <div className="grid grid-cols-2 gap-3">
            
            <div className="bg-white rounded-xl p-3 border border-gray-200 flex flex-col justify-center">
              <label className="text-gray-500 font-bold text-[11px] block mb-0.5">Tamanho (ha)</label>
              <input 
                type="number"
                value={tamanho}
                onChange={e => setTamanho(e.target.value)}
                className="w-full bg-transparent font-bold text-[15px] text-black focus:outline-none"
              />
            </div>

            <div className="bg-white rounded-xl p-3 border border-gray-200 flex flex-col justify-center relative">
              <label className="text-gray-500 font-bold text-[11px] block mb-0.5">Declividade</label>
              <select 
                value={declividade}
                onChange={e => setDeclividade(e.target.value)}
                className="w-full bg-transparent font-bold text-[15px] text-black focus:outline-none appearance-none cursor-pointer"
              >
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </div>

            <div className="bg-white rounded-xl p-3 border border-gray-200 flex flex-col justify-center relative">
              <label className="text-gray-500 font-bold text-[11px] block mb-0.5">Adubação</label>
              <select 
                value={adubacao}
                onChange={e => setAdubacao(e.target.value)}
                className="w-full bg-transparent font-bold text-[15px] text-black focus:outline-none appearance-none cursor-pointer"
              >
                <option>Em dia</option>
                <option>Atrasada</option>
                <option>Não feita</option>
              </select>
            </div>

            <div className="bg-white rounded-xl p-3 border border-gray-200 flex flex-col justify-center relative">
              <label className="text-gray-500 font-bold text-[11px] block mb-0.5">Calcário</label>
              <select 
                value={calcario}
                onChange={e => setCalcario(e.target.value)}
                className="w-full bg-transparent font-bold text-[15px] text-black focus:outline-none appearance-none cursor-pointer"
              >
                <option>Aplicado</option>
                <option>Não aplicado</option>
              </select>
            </div>

          </div>
        </div>

        {/* Solo */}
        <div className="mb-8">
          <label className="text-[14px] font-bold text-gray-700 block mb-2">Solo</label>
          <div className="flex flex-wrap gap-2">
            
            {['Argiloso', 'Arenoso', 'Palhada'].map(solo => {
              const isActive = activeSolos.includes(solo);
              return (
                <button
                  key={solo}
                  onClick={() => toggleSolo(solo)}
                  className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-colors ${
                    isActive ? 'bg-[#E8F5EE] border-[#1F7A4C] text-[#1F7A4C]' : 'bg-white border-gray-200 text-gray-500'
                  }`}
                >
                  {solo}
                </button>
              );
            })}

          </div>
        </div>

      </div>

      {/* Bottom Fixed Action */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F7F9F8] via-[#F7F9F8] to-transparent">
        <button 
          onClick={handleGenerate}
          className="w-full bg-[#1F7A4C] hover:bg-[#155d38] text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex justify-center items-center"
        >
          Gerar Veredito
        </button>
      </div>

      {/* Modal Novo Talhão */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-white p-8 rounded-3xl w-full max-w-md relative border border-gray-200 shadow-2xl my-8 text-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
              >
                <span className="font-bold text-xl">X</span>
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-black">Novo Talhão</h2>
              
              <form onSubmit={handleCreateTalhao} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Fazenda</label>
                  <select 
                    value={novoTalhaoFazendaId}
                    onChange={e => setNovoTalhaoFazendaId(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F7A4C] appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Selecione uma fazenda</option>
                    {fazendas.map(f => (
                      <option key={f.id} value={f.id}>{f.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nome/Identificação</label>
                  <input 
                    type="text" 
                    required
                    value={novoTalhaoNome}
                    onChange={e => setNovoTalhaoNome(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F7A4C]"
                    placeholder="Ex: Talhão Leste"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Tamanho (ha)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={novoTalhaoTamanho}
                    onChange={e => setNovoTalhaoTamanho(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#1F7A4C]"
                    placeholder="Ex: 150"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#1F7A4C] hover:bg-[#155d38] text-white font-bold py-3.5 rounded-xl mt-6 transition-all"
                >
                  Criar e Selecionar
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
