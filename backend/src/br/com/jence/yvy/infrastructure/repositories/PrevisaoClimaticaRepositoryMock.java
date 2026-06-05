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
        long id = 1L;

        // SORRISO - MT (5107925)
        // Mês 1: Outubro - Chuva ideal
        previsoes.add(new PrevisaoClimatica(id++, "5107925", YearMonth.of(2026, 10), 250.0, 25.0, false));
        // Mês 2: Novembro - Chuva boa
        previsoes.add(new PrevisaoClimatica(id++, "5107925", YearMonth.of(2026, 11), 210.0, 26.5, false));
        // Mês 3: Dezembro - SECA SEVERA para forçar o Motor
        previsoes.add(new PrevisaoClimatica(id++, "5107925", YearMonth.of(2026, 12),  40.0, 34.0, false));

        // CASCAVEL - PR (4104808)
        // Mês 1: Outubro - Chuva moderada, temperatura amena
        previsoes.add(new PrevisaoClimatica(id++, "4104808", YearMonth.of(2026, 10), 180.0, 20.0, false));
        // Mês 2: Novembro - Chuva leve, temperatura subindo
        previsoes.add(new PrevisaoClimatica(id++, "4104808", YearMonth.of(2026, 11), 160.0, 21.0, false));
        // Mês 3: Dezembro - Chuva leve, verão se aproximando
        previsoes.add(new PrevisaoClimatica(id++, "4104808", YearMonth.of(2026, 12), 140.0, 22.5, false));

        // CUIABÁ - MT (5103403)
        // Mês 1: Outubro - Calor intenso, chuva baixa
        previsoes.add(new PrevisaoClimatica(id++, "5103403", YearMonth.of(2026, 10), 120.0, 32.0, false));
        // Mês 2: Novembro - SECA, temperatura crítica
        previsoes.add(new PrevisaoClimatica(id++, "5103403", YearMonth.of(2026, 11),  90.0, 34.0, false));
        // Mês 3: Dezembro - SECA SEVERA com GEADA para forçar o Motor
        previsoes.add(new PrevisaoClimatica(id++, "5103403", YearMonth.of(2026, 12),  30.0, 36.0, true));

        // CAMPOS DOS GOYTACAZES - RJ (3301009)
        // Mês 1: Outubro - Chuva baixa, calor típico do RJ
        previsoes.add(new PrevisaoClimatica(id++, "3301009", YearMonth.of(2026, 10),  80.0, 28.0, false));
        // Mês 2: Novembro - Chuva moderada, temperatura subindo
        previsoes.add(new PrevisaoClimatica(id++, "3301009", YearMonth.of(2026, 11),  95.0, 29.0, false));
        // Mês 3: Dezembro - Chuva boa, verão pleno
        previsoes.add(new PrevisaoClimatica(id++, "3301009", YearMonth.of(2026, 12), 110.0, 30.0, false));

        // SÃO PAULO - SP (3550308)
        // Mês 1: Outubro - Chuva moderada, primavera
        previsoes.add(new PrevisaoClimatica(id++, "3550308", YearMonth.of(2026, 10), 130.0, 23.0, false));
        // Mês 2: Novembro - Chuva aumentando, temperatura agradável
        previsoes.add(new PrevisaoClimatica(id++, "3550308", YearMonth.of(2026, 11), 150.0, 24.0, false));
        // Mês 3: Dezembro - Chuva intensa, verão chegando
        previsoes.add(new PrevisaoClimatica(id++, "3550308", YearMonth.of(2026, 12), 170.0, 25.0, false));
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