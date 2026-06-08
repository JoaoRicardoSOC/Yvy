import { Cultura } from '../../domain/entities';

export const culturasDb = [
  new Cultura('c1', 'Soja Safrinha', 120, 600, 60, 20, 30), // 60 sacas/ha
  new Cultura('c2', 'Milho', 150, 500, 100, 22, 32), // 100 sacas/ha
  new Cultura('c3', 'Uva (Bento Gonçalves)', 180, 700, 25, 15, 25), // 25 ton/ha
  new Cultura('c4', 'Trigo', 120, 400, 50, 10, 22) // 50 sacas/ha
];

export class CulturaRepositoryMock {
  static getCulturaByNome(nome) {
    return culturasDb.find(c => c.nome === nome);
  }

  static getAllCulturas() {
    return culturasDb;
  }
}
