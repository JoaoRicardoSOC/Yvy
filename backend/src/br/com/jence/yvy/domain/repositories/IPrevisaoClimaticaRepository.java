package br.com.jence.yvy.domain.repositories;

import br.com.jence.yvy.domain.entities.PrevisaoClimatica;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

public interface IPrevisaoClimaticaRepository {
    void salvar(PrevisaoClimatica previsao);
    List<PrevisaoClimatica> buscarTodos();
    Optional<PrevisaoClimatica> buscarPorCidadeEMes(String codigoIbgeCidade, YearMonth mesAno);
}