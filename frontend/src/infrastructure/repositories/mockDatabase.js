import { Produtor, Fazenda, Talhao } from '../../domain/entities';

export const resetAndMockDatabase = () => {
  localStorage.clear();

  const produtor = new Produtor('prod_1', 'João da Silva', 'joao@agro.com', '123456', 'AGRONOMO');
  localStorage.setItem('produtor', JSON.stringify(produtor));

  const fazendas = [
    new Fazenda('faz_1', 'Fazenda Boa Esperança', '3543907', 1500, [
      new Talhao('tal_1', 'Talhão Norte', 200, 'Argiloso', false, 'VAZIO'),
      new Talhao('tal_2', 'Talhão Sul', 350, 'Misto', true, 'PLANTADO', { cultura: 'Soja', dataPlantio: '2026-01-15' })
    ]),
    new Fazenda('faz_2', 'Sítio Recanto', '4115200', 300, [
      new Talhao('tal_3', 'Área Central', 150, 'Arenoso', false, 'VAZIO')
    ])
  ];

  localStorage.setItem('fazendas_usuario', JSON.stringify(fazendas));
  localStorage.setItem('historico_analises', JSON.stringify([]));
  localStorage.setItem('rascunhos_analise', JSON.stringify([]));
};

export const initializeMockDatabase = () => {
  const isAuth = !!localStorage.getItem('produtor');
  const hasFazendas = !!localStorage.getItem('fazendas_usuario');

  if (!isAuth || !hasFazendas) {
    resetAndMockDatabase();
  }
};
