import { PrevisaoClimatica } from '../../domain/entities';

const previsoesDb = [
  // Bento Gonçalves (IBGE: 4302105) - Foco do nosso usuário
  new PrevisaoClimatica('p1', '4302105', 'Mês 1 (Atual)', 150, 22), // Bom começo
  new PrevisaoClimatica('p2', '4302105', 'Mês 2', 40, 28), // Veranico (risco hídrico)
  new PrevisaoClimatica('p3', '4302105', 'Mês 3', 350, 18), // Chuva excessiva
  
  // Exemplo de outra cidade apenas para mock estrutural (Sorriso/MT: 5107925)
  new PrevisaoClimatica('p4', '5107925', 'Mês 1 (Atual)', 200, 26),
  new PrevisaoClimatica('p5', '5107925', 'Mês 2', 180, 27),
  new PrevisaoClimatica('p6', '5107925', 'Mês 3', 150, 25)
];

export class PrevisaoRepositoryMock {
  static getPrevisaoByCidade(codigoIbgeCidade) {
    return previsoesDb.filter(p => p.codigoIbgeCidade === codigoIbgeCidade);
  }
}
