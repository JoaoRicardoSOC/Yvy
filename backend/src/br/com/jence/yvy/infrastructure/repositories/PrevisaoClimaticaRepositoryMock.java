package br.com.jence.yvy.infrastructure.repositories;

import br.com.jence.yvy.domain.entities.PrevisaoClimatica;
import br.com.jence.yvy.domain.repositories.IPrevisaoClimaticaRepository;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PrevisaoClimaticaRepositoryMock implements IPrevisaoClimaticaRepository {

    private List<PrevisaoClimatica> previsoes = new ArrayList<>();

    public PrevisaoClimaticaRepositoryMock() {
        String ibgeSorriso = "5107925"; // Código IBGE de Sorriso-MT

        // Mês 1: Outubro - Chuva ideal
        previsoes.add(new PrevisaoClimatica(1L, ibgeSorriso, YearMonth.of(2026, 10), 250.0, 25.0, false));

        // Mês 2: Novembro - Chuva boa
        previsoes.add(new PrevisaoClimatica(2L, ibgeSorriso, YearMonth.of(2026, 11), 210.0, 26.5, false));

        // Mês 3: Dezembro - SECA SEVERA para forçar o Motor
        previsoes.add(new PrevisaoClimatica(3L, ibgeSorriso, YearMonth.of(2026, 12), 40.0, 34.0, false));
    }

    @Override
    public void salvar(PrevisaoClimatica previsao) {
        this.previsoes.add(previsao);
    }

    @Override
    public List<PrevisaoClimatica> buscarTodos() {
        return this.previsoes;
    }

    @Override
    public Optional<PrevisaoClimatica> buscarPorCidadeEMes(String codigoIbgeCidade, YearMonth mesAno) {
        return previsoes.stream()
                .filter(p -> p.getCodigoIbgeCidade().equals(codigoIbgeCidade) && p.getMesAno().equals(mesAno))
                .findFirst();
    }
}