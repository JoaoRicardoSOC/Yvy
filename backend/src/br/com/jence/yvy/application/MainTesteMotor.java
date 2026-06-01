package br.com.jence.yvy.application;

import br.com.jence.yvy.domain.entities.*;
import br.com.jence.yvy.infrastructure.repositories.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;

public class MainTesteMotor {

    public static void main(String[] args) {

        System.out.println("==================================================");
        System.out.println("🌾 INICIANDO MOTOR PREDITIVO YVY - PROVA DE CONCEITO");
        System.out.println("==================================================\n");

        CulturaRepositoryMock culturaRepo = new CulturaRepositoryMock();
        PrevisaoClimaticaRepositoryMock nasaRepo = new PrevisaoClimaticaRepositoryMock();

        Cultura soja = culturaRepo.buscarPorNome("Soja").orElseThrow();
        PrevisaoClimatica previsaoDezembro = nasaRepo.buscarPorCidadeEMes("5107925", YearMonth.of(2026, 12)).orElseThrow();

        AreaPlantio talhao1 = new AreaPlantio(1L, 100.0, "Argiloso", false, 6.5);

        System.out.println("📍 Cenário de Teste:");
        System.out.println("   - Cultura: " + soja.getNome() + " (Exige " + soja.getNecessidadeHidricaMm() + "mm de chuva)");
        System.out.println("   - Área: " + talhao1.getTamanhoHectares() + " hectares");
        System.out.println("   - Previsão NASA: Apenas " + previsaoDezembro.getVolumeChuvaMm() + "mm e " + previsaoDezembro.getTemperaturaMedia() + "ºC\n");

        String riscoCalculado = "BAIXO";

        if (previsaoDezembro.getVolumeChuvaMm() < (soja.getNecessidadeHidricaMm() * 0.4) ||
                !soja.isTemperaturaAdequada(previsaoDezembro.getTemperaturaMedia())) {
            riscoCalculado = "ALTO";
        }

        AnalisePreditiva analise = new AnalisePreditiva(
                1L, talhao1, soja, LocalDateTime.now(), LocalDate.now().plusDays(10), LocalDate.now().plusDays(soja.getTempoCicloDias()),
                riscoCalculado, null, "CONCLUIDA"
        );

        Double rendimentoFinalEstimado = analise.calcularRendimentoFinal();
        Double rendimentoMaximoPossivel = soja.getRendimentoBaseSacasHectare() * talhao1.getTamanhoHectares();

        System.out.println("==================================================");
        System.out.println("🚨 RESULTADO DA ANÁLISE CLIMÁTICA");
        System.out.println("==================================================");
        System.out.println("Nível de Risco Calculado: " + analise.getRiscoClimaticoCalculado());
        System.out.println("Rendimento Ideal (Sem Risco): " + rendimentoMaximoPossivel + " sacas");
        System.out.println("Rendimento Estimado (Com Risco): " + rendimentoFinalEstimado + " sacas");
        System.out.println("Prejuízo Evitado: " + (rendimentoMaximoPossivel - rendimentoFinalEstimado) + " sacas");
    }
}