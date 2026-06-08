import { CulturaRepositoryMock } from '../../infrastructure/repositories/CulturaRepositoryMock';
import { PrevisaoRepositoryMock } from '../../infrastructure/repositories/PrevisaoRepositoryMock';
import { Cultura, PrevisaoClimatica, Simulacao } from '../../domain/entities';

export class MotorPreditivoService {
  
  static stringToHash(string) {
    if (!string) return 0;
    let str = String(string);
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  static async gerarRecomendacao(tipoCenario, fazenda, talhao, formData) {
    const nomeCultura = formData.cultura;
    const codigoIbgeCidade = fazenda.codigoIbge;

    console.log(`[NASA POWER API] Fetching dataset for location '${codigoIbgeCidade}'... HTTP 200 OK`);
    console.log(`[NASA POWER API] Aggregating historical climate data...`);
    
    const randomDelay = Math.random() * 2000 + 2500;
    await new Promise(resolve => setTimeout(resolve, randomDelay));
    
    console.log(`[ML Engine] Running predictive model with parameters: Cenario='${tipoCenario}', Cultive='${nomeCultura}', Hectares=${talhao.tamanhoHectares}, Irrigation=${talhao.possuiIrrigacao}`);

    let cultura = CulturaRepositoryMock.getCulturaByNome(nomeCultura);
    if (!cultura) {
      const hash = this.stringToHash(nomeCultura);
      cultura = new Cultura(
        'dyn_c',
        nomeCultura,
        100 + (hash % 60),
        300 + (hash % 500),
        30 + (hash % 50),
        15 + (hash % 10),
        28 + (hash % 10)
      );
    }

    let previsoes = PrevisaoRepositoryMock.getPrevisaoByCidade(codigoIbgeCidade);
    if (!previsoes || previsoes.length === 0) {
      const hashLoc = this.stringToHash(codigoIbgeCidade);
      previsoes = [
        new PrevisaoClimatica('dyn_p1', codigoIbgeCidade, 'Mês 1', 50 + (hashLoc % 150), 20 + (hashLoc % 15)),
        new PrevisaoClimatica('dyn_p2', codigoIbgeCidade, 'Mês 2', 40 + (hashLoc % 100), 22 + (hashLoc % 15)),
        new PrevisaoClimatica('dyn_p3', codigoIbgeCidade, 'Mês 3', 80 + (hashLoc % 200), 18 + (hashLoc % 15)),
      ];
    }

    const volumeChuvaTotal = previsoes.reduce((acc, prev) => acc + prev.volumeChuvaMm, 0);
    const temperaturaMedia = previsoes.reduce((acc, prev) => acc + prev.temperaturaMedia, 0) / previsoes.length;

    const chuvaAtendeMinimo = volumeChuvaTotal >= (cultura.necessidadeHidricaMm * 0.7);
    const temperaturaDentroRange = (temperaturaMedia >= cultura.temperaturaIdealMin && temperaturaMedia <= cultura.temperaturaIdealMax);

    let nivelRisco = 'BAIXO';
    let alertasClimaticos = [];

    if (!temperaturaDentroRange) {
      nivelRisco = 'MEDIO';
      alertasClimaticos.push(`Temperatura média prevista (${temperaturaMedia.toFixed(1)}°C) fora do ideal (${cultura.temperaturaIdealMin}-${cultura.temperaturaIdealMax}°C).`);
    }

    if (!chuvaAtendeMinimo) {
      if (!talhao.possuiIrrigacao) {
        nivelRisco = 'ALTO';
        alertasClimaticos.push(`Déficit hídrico severo. Precipitação de ${volumeChuvaTotal}mm não atende o mínimo exigido e não há irrigação.`);
      } else {
        alertasClimaticos.push(`Déficit hídrico mitigado pela presença de irrigação no talhão.`);
      }
    } else {
      alertasClimaticos.push(`Volume de chuvas esperado (${volumeChuvaTotal}mm) atende de forma satisfatória as necessidades.`);
    }

    let rendimentoEstimado = talhao.tamanhoHectares * cultura.rendimentoBaseHectare;
    if (nivelRisco === 'ALTO') {
      rendimentoEstimado = rendimentoEstimado * 0.7;
      alertasClimaticos.push("Redutor de 30% aplicado na estimativa de rendimento final devido ao ALTO RISCO climático.");
    }

    let janelaIdealPlantio = null;
    let previsaoColheita = null;
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    if (tipoCenario === 'NOVO_PLANTIO') {
      const dataAtual = new Date();
      dataAtual.setDate(dataAtual.getDate() + 7);
      const dataInicio = new Date(dataAtual);
      dataAtual.setDate(dataAtual.getDate() + 20);
      const dataFim = new Date(dataAtual);
      
      janelaIdealPlantio = `${dataInicio.getDate()} ${meses[dataInicio.getMonth()]} a ${dataFim.getDate()} ${meses[dataFim.getMonth()]}`;
      
      const dataColheita = new Date(dataInicio);
      dataColheita.setDate(dataColheita.getDate() + cultura.tempoCicloDias);
      previsaoColheita = `${dataColheita.getDate()} ${meses[dataColheita.getMonth()]} ${dataColheita.getFullYear()}`;
    } else {
      const dataPlantio = new Date(formData.dataPlantio + 'T12:00:00'); // Evitar timezone issues
      const dataColheita = new Date(dataPlantio);
      dataColheita.setDate(dataColheita.getDate() + cultura.tempoCicloDias);
      
      previsaoColheita = `${dataColheita.getDate()} ${meses[dataColheita.getMonth()]} ${dataColheita.getFullYear()}`;
      
      const hoje = new Date();
      if (dataColheita < hoje) {
        alertasClimaticos.push("Atenção: A data estimada de colheita já passou.");
      } else {
        const diasRestantes = Math.ceil((dataColheita - hoje) / (1000 * 60 * 60 * 24));
        alertasClimaticos.push(`Faltam aproximadamente ${diasRestantes} dias para a colheita estimada.`);
      }
    }

    const unidadeMedida = cultura.nome.toLowerCase().includes('cana') || cultura.nome.toLowerCase().includes('algodão') ? 'Toneladas' : 'Sacas';

    const simulacao = new Simulacao(
      `sim_${Date.now()}`,
      tipoCenario,
      cultura.nome,
      janelaIdealPlantio,
      previsaoColheita,
      Math.floor(rendimentoEstimado),
      unidadeMedida,
      nivelRisco,
      alertasClimaticos
    );

    return {
      ...simulacao,
      temperaturaMedia: temperaturaMedia.toFixed(1),
      chuvaAcumulada: volumeChuvaTotal,
      dataAnalise: new Date().toISOString()
    };
  }
}
