import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FazendaContext = createContext();

export const useFazenda = () => useContext(FazendaContext);

export const FazendaProvider = ({ children }) => {
  const [fazendas, setFazendas] = useState([]);

  const carregarFazendas = useCallback(() => {
    const data = JSON.parse(localStorage.getItem('fazendas_usuario') || '[]');
    setFazendas(data);
  }, []);

  useEffect(() => {
    carregarFazendas();
  }, [carregarFazendas]);

  const adicionarTalhao = (fazendaId, novoTalhao) => {
    setFazendas(prev => {
      const updatedFazendas = prev.map(f => {
        if (f.id === fazendaId) {
          const talhoes = f.talhoes ? [...f.talhoes] : [];
          talhoes.push(novoTalhao);
          return { ...f, talhoes };
        }
        return f;
      });
      localStorage.setItem('fazendas_usuario', JSON.stringify(updatedFazendas));
      return updatedFazendas;
    });
  };

  const atualizarFazendas = () => {
      carregarFazendas();
  }

  return (
    <FazendaContext.Provider value={{ fazendas, carregarFazendas, adicionarTalhao, atualizarFazendas }}>
      {children}
    </FazendaContext.Provider>
  );
};
