package br.com.jence.yvy.application.services;

import br.com.jence.yvy.domain.entities.AnalisePreditiva;
import br.com.jence.yvy.domain.entities.AreaPlantio;
import br.com.jence.yvy.domain.entities.Cultura;
import br.com.jence.yvy.domain.entities.PrevisaoClimatica;
import br.com.jence.yvy.domain.repositories.ICulturaRepository;
import br.com.jence.yvy.domain.repositories.IPrevisaoClimaticaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

public class AnalisePreditivaService {

    private final IPrevisaoClimaticaRepository previsaoRepo;
    private final ICulturaRepository culturaRepo;

    public AnalisePreditivaService(IPrevisaoClimaticaRepository previsaoRepo, ICulturaRepository culturaRepo) {
        this.previsaoRepo = previsaoRepo;
        this.culturaRepo = culturaRepo;
    }

    public AnalisePreditiva gerarRecomendacao(AreaPlantio area, Cultura cultura, String codigoIbgeCidade) {

        if (area == null || cultura == null || codigoIbgeCidade == null || codigoIbgeCidade.isBlank()) {
            throw new IllegalArgumentException("Parâmetros inválidos para gerar recomendação.");
        }

        List<PrevisaoClimatica> previsoes = previsaoRepo.buscarTodos().stream()
                .filter(p -> p.getCodigoIbgeCidade().equals(codigoIbgeCidade))
                .sorted(Comparator.comparing(PrevisaoClimatica::getMesAno))
                .toList();

        if (previsoes.isEmpty()) {
            throw new IllegalStateException("Sem dados climáticos da NASA para a cidade: " + codigoIbgeCidade);
        }

        String riscoFinal = "ALTO";
        PrevisaoClimatica previsaoEscolhida = previsoes.get(0);

        for (PrevisaoClimatica previsao : previsoes) {

            boolean tempAdequada = cultura.isTemperaturaAdequada(previsao.getTemperaturaMedia());
            Double necessidadeHidrica = cultura.getNecessidadeHidricaMm() != null ? cultura.getNecessidadeHidricaMm() : 0.0;
            boolean chuvaAdequada = previsao.getVolumeChuvaMm() >= (necessidadeHidrica * 0.7);

            if (tempAdequada) {
                if (chuvaAdequada) {
                    riscoFinal = "BAIXO";
                    previsaoEscolhida = previsao;
                    break;

                } else if (Boolean.TRUE.equals(area.getPossuiIrrigacao())) {
                    riscoFinal = "BAIXO";
                    previsaoEscolhida = previsao;
                    break;
                }
            }
        }

        LocalDate dataInicio = previsaoEscolhida.getMesAno().atDay(1); // Assume o dia 1º do mês escolhido
        LocalDate dataColheita = dataInicio.plusDays(cultura.getTempoCicloDias());

        AnalisePreditiva analise = new AnalisePreditiva(
                null,
                area,
                cultura,
                LocalDateTime.now(),
                dataInicio,
                dataColheita,
                riscoFinal,
                0.0, // Valor temporário
                "CONCLUIDA"
        );

        Double rendimentoFinal = analise.calcularRendimentoFinal();
        analise.setRendimentoEstimadoSacas(rendimentoFinal);

        return analise;
    }
}