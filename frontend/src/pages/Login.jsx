import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircleHelp, ChevronRight, MapPin, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [time, setTime] = useState('09:41');
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'criar');
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({ 
    produtor: '', 
    email: '',
    senha: '',
    propriedade: '',
    localidade: ''
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'criar') {
      if (!formData.produtor || !formData.email || !formData.senha) {
        toast.error("Preencha todos os campos obrigatórios para criar a conta.");
        return;
      }
    } else {
      if (!formData.email || !formData.senha) {
        toast.error("Preencha e-mail e senha para entrar.");
        return;
      }
    }
    
    // Save to localStorage (mocking both login and register)
    localStorage.setItem('produtor', JSON.stringify({
      id: `prod_${Date.now()}`,
      nome: activeTab === 'criar' ? formData.produtor : 'Usuário',
      email: formData.email,
      propriedade: activeTab === 'criar' ? formData.propriedade : 'Sua Fazenda',
      localidade: activeTab === 'criar' ? formData.localidade : ''
    }));

    toast.success(activeTab === 'criar' ? "Conta criada com sucesso!" : "Login realizado com sucesso!");
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-[#EEF1F0] text-black font-sans px-6 py-4 flex flex-col absolute inset-0 z-50 overflow-y-auto">
      
      {/* Top Bar - Dynamic Time */}
      <div className="flex justify-start w-full mb-4">
        <span className="text-black text-xs font-medium">
          {time}
        </span>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center w-full mb-8">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="YVY Logo" className="h-12 w-auto object-contain" />
          <span className="text-xl font-bold tracking-tight text-black uppercase">YVY</span>
        </div>
        <button className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center">
          <CircleHelp className="w-6 h-6 text-gray-600" />
        </button>
      </header>

      {/* Hero Typography */}
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-[40px] font-bold leading-[1.1] text-black">
          Comece pelo<br />gêmeo digital da<br />fazenda.
        </h1>
        <p className="text-gray-600 text-[15px] leading-relaxed max-w-[95%]">
          Seu perfil conecta produtor, propriedade, talhões e histórico climático em uma única base de decisão.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#E4E9E6] p-1 rounded-xl mb-6 shrink-0">
        <button 
          onClick={() => setActiveTab('criar')}
          type="button"
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${activeTab === 'criar' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
        >
          Criar conta
        </button>
        <button 
          onClick={() => setActiveTab('entrar')}
          type="button"
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${activeTab === 'entrar' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
        >
          Entrar
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow gap-5 pb-8">
        
        {activeTab === 'criar' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-500">Produtor</label>
            <input 
              type="text"
              value={formData.produtor}
              onChange={e => setFormData({ ...formData, produtor: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-black font-semibold focus:outline-none focus:border-[#1F7A4C]"
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-500">CPF/CNPJ ou e-mail</label>
          <input 
            type="text"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-black font-semibold focus:outline-none focus:border-[#1F7A4C]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-500">Senha</label>
          <div className="relative flex items-center">
            <input 
              type={showPassword ? "text" : "password"}
              value={formData.senha}
              onChange={e => setFormData({ ...formData, senha: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 pr-12 text-black font-semibold focus:outline-none focus:border-[#1F7A4C]"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {activeTab === 'criar' && (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-500">Primeira propriedade</label>
              <div className="relative flex items-center">
                <input 
                  type="text"
                  value={formData.propriedade}
                  onChange={e => setFormData({ ...formData, propriedade: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 pr-12 text-black font-semibold focus:outline-none focus:border-[#1F7A4C]"
                />
                <ChevronRight className="w-5 h-5 text-black absolute right-4 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-500">Localidade</label>
              <div className="relative flex items-center">
                <input 
                  type="text"
                  value={formData.localidade}
                  onChange={e => setFormData({ ...formData, localidade: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 pr-12 text-black font-semibold focus:outline-none focus:border-[#1F7A4C]"
                />
                <MapPin className="w-5 h-5 text-black absolute right-4 pointer-events-none" />
              </div>
            </div>
          </>
        )}

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-4">
          <button 
            type="submit"
            className="w-full bg-[#1F7A4C] hover:bg-[#155d38] text-white font-bold py-4 rounded-xl transition-colors shrink-0"
          >
            Continuar
          </button>
          
          {activeTab === 'criar' && (
            <button 
              type="button"
              className="w-full bg-[#E8F5EE] hover:bg-[#d1ebd9] text-[#1F7A4C] font-bold py-4 rounded-xl transition-colors shrink-0"
            >
              Usar localização atual.
            </button>
          )}
        </div>

      </form>

    </div>
  );
}
