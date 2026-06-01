package br.com.jence.projeto.domain.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AnalisePreditiva {
    private Long id;
    private AreaPlantio areaPlantio;
    private Cultura cultura;
    private LocalDateTime dataProcessamento;
    private LocalDate melhorDataInicioPlantio;
    private LocalDate dataPrevistaColheira;
    private String riscoClimaticoCalculado;
    private Double rendimentoEstimadoSacas;
    private String statusAnalise;


    public AnalisePreditiva() {};

    public AnalisePreditiva(Long id, AreaPlantio areaPlantio, Cultura cultura, LocalDateTime dataProcessamento, LocalDate melhorDataInicioPlantio, LocalDate dataPrevistaColheira, String riscoClimaticoCalculado, Double rendimentoEstimadoSacas, String statusAnalise) {
        this.id = id;
        this.areaPlantio = areaPlantio;
        this.cultura = cultura;
        this.dataProcessamento = dataProcessamento;
        this.melhorDataInicioPlantio = melhorDataInicioPlantio;
        this.dataPrevistaColheira = dataPrevistaColheira;
        this.riscoClimaticoCalculado = riscoClimaticoCalculado;
        this.rendimentoEstimadoSacas = rendimentoEstimadoSacas;
        this.statusAnalise = statusAnalise;
    };


    public Double calcularRendimentoFinal() {
        if (rendimentoEstimadoSacas == null || riscoClimaticoCalculado == null) {
            return 0.0;
        }

        switch (riscoClimaticoCalculado.toLowerCase()) {
            case "baixo":
                return rendimentoEstimadoSacas * 1.0;  // sem perda
            case "medio":
                return rendimentoEstimadoSacas * 0.85;  // 15% de perda
            case "alto":
                return rendimentoEstimadoSacas * 0.65;  // 35% de perda
            default:
                return rendimentoEstimadoSacas;
        }
    };


    public Long getId() {
        return id;
    }

    public AreaPlantio getAreaPlantio() {
        return areaPlantio;
    }

    public void setAreaPlantio(AreaPlantio areaPlantio) {
        this.areaPlantio = areaPlantio;
    }

    public Cultura getCultura() {
        return cultura;
    }

    public void setCultura(Cultura cultura) {
        this.cultura = cultura;
    }

    public LocalDateTime getDataProcessamento() {
        return dataProcessamento;
    }

    public void setDataProcessamento(LocalDateTime dataProcessamento) {
        this.dataProcessamento = dataProcessamento;
    }

    public LocalDate getMelhorDataInicioPlantio() {
        return melhorDataInicioPlantio;
    }

    public void setMelhorDataInicioPlantio(LocalDate melhorDataInicioPlantio) {
        this.melhorDataInicioPlantio = melhorDataInicioPlantio;
    }

    public LocalDate getDataPrevistaColheira() {
        return dataPrevistaColheira;
    }

    public void setDataPrevistaColheira(LocalDate dataPrevistaColheira) {
        this.dataPrevistaColheira = dataPrevistaColheira;
    }

    public String getRiscoClimaticoCalculado() {
        return riscoClimaticoCalculado;
    }

    public void setRiscoClimaticoCalculado(String riscoClimaticoCalculado) {
        this.riscoClimaticoCalculado = riscoClimaticoCalculado;
    }

    public Double getRendimentoEstimadoSacas() {
        return rendimentoEstimadoSacas;
    }

    public void setRendimentoEstimadoSacas(Double rendimentoEstimadoSacas) {
        this.rendimentoEstimadoSacas = rendimentoEstimadoSacas;
    }

    public String getStatusAnalise() {
        return statusAnalise;
    }

    public void setStatusAnalise(String statusAnalise) {
        this.statusAnalise = statusAnalise;
    }


    @Override
    public String toString() {
        return "AnalisePreditiva{" +
                "id=" + id +
                ", areaPlantio=" + areaPlantio +
                ", cultura=" + cultura +
                ", dataProcessamento=" + dataProcessamento +
                ", melhorDataInicioPlantio=" + melhorDataInicioPlantio +
                ", dataPrevistaColheira=" + dataPrevistaColheira +
                ", riscoClimaticoCalculado='" + riscoClimaticoCalculado + '\'' +
                ", rendimentoEstimadoSacas=" + rendimentoEstimadoSacas +
                ", statusAnalise='" + statusAnalise + '\'' +
                '}';
    }
}
