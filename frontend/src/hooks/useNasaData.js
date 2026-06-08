import { useState } from 'react';

export function useNasaData() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const calcularRisco = (dados) => {
    // Simulação do peso da temperatura e chuva na safra
    let riscoScore = 0;
    let mensagens = [];

    const temp = Number(dados.temperatura);
    const chuva = Number(dados.chuva);
    const cultura = dados.cultura;

    // Regras de Temperatura baseadas no modelo agrícola
    if (temp > 35) {
      riscoScore += 35;
      mensagens.push("Estresse térmico severo detectado para os próximos dias.");
    } else if (temp > 30) {
      riscoScore += 15;
      mensagens.push("Temperatura acima do ideal para desenvolvimento da planta.");
    } else if (temp < 15) {
      riscoScore += 20;
      mensagens.push("Risco de desenvolvimento fenológico tardio devido ao frio.");
    }

    // Regras hídricas (Chuva)
    if (chuva < 10) {
      riscoScore += 40;
      mensagens.push("Déficit hídrico crítico na região do talhão.");
    } else if (chuva < 30) {
      riscoScore += 20;
      mensagens.push("Volume de chuva esperado muito abaixo da média histórica.");
    } else if (chuva > 150) {
      riscoScore += 15;
      mensagens.push("Alerta: Excesso de chuvas pode causar lixiviação severa do solo.");
    }

    // Cruzamento com a sensibilidade específica da Cultura
    if (cultura === 'Soja Safrinha' && chuva < 20) {
      riscoScore += 15;
      mensagens.push("A Soja Safrinha apresenta alta sensibilidade à estiagem neste estágio.");
    }
    if (cultura === 'Milho' && temp > 33) {
      riscoScore += 10;
      mensagens.push("Temperaturas extremas previstas podem afetar o pendoamento do milho.");
    }

    // Normalização
    riscoScore = Math.min(riscoScore, 100);
    const viabilidade = 100 - riscoScore;

    let nivel = 'Seguro';
    let cor = 'green';
    
    if (viabilidade < 40) {
      nivel = 'Crítico';
      cor = 'red';
    } else if (viabilidade < 75) {
      nivel = 'Atenção';
      cor = 'amber';
    }

    return { viabilidade, nivel, cor, mensagens };
  };

  const simularAnalise = (dados) => {
    return new Promise((resolve) => {
      setIsAnalyzing(true);
      setTimeout(() => {
        const resultado = calcularRisco(dados);
        setIsAnalyzing(false);
        resolve(resultado);
      }, 2500); // 2.5s para simular "Cruzando dados da NASA"
    });
  };

  return { simularAnalise, isAnalyzing };
}
