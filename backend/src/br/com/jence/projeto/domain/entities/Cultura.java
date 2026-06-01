package br.com.jence.projeto.domain.entities;

public class Cultura {
    private Long id;
    private String nome;
    private Integer tempoCicloDias;
    private Double necessidadeHidricaMm;
    private Double rendimentoBaseSacasHectare;
    private Double temperaturaIdealMin;
    private Double temperaturaIdealMax;


    public Cultura() {};

    public Cultura(Long id, String nome, Integer tempoCicloDias, Double necessidadeHidricaMm, Double rendimentoBaseSacasHectare, Double temperaturaIdealMin, Double temperaturaIdealMax) {
        this.id = id;
        this.nome = nome;
        this.tempoCicloDias = tempoCicloDias;
        this.necessidadeHidricaMm = necessidadeHidricaMm;
        this.rendimentoBaseSacasHectare = rendimentoBaseSacasHectare;
        this.temperaturaIdealMin = temperaturaIdealMin;
        this.temperaturaIdealMax = temperaturaIdealMax;
    }


    public Boolean isTemperaturaAdequada(Double temperatura) {
        if (temperatura >= temperaturaIdealMin && temperatura <= temperaturaIdealMax) {
            return true;
        }

        return false;
    };


    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Nome não pode ser null ou vazio.");
        }
        this.nome = nome;
    }

    public Integer getTempoCicloDias() {
        return tempoCicloDias;
    }

    public void setTempoCicloDias(Integer tempoCicloDias) {
        this.tempoCicloDias = tempoCicloDias;
    }

    public Double getNecessidadeHidricaMm() {
        return necessidadeHidricaMm;
    }

    public void setNecessidadeHidricaMm(Double necessidadeHidricaMm) {
        this.necessidadeHidricaMm = necessidadeHidricaMm;
    }

    public Double getRendimentoBaseSacasHectare() {
        return rendimentoBaseSacasHectare;
    }

    public void setRendimentoBaseSacasHectare(Double rendimentoBaseSacasHectare) {
        this.rendimentoBaseSacasHectare = rendimentoBaseSacasHectare;
    }

    public Double getTemperaturaIdealMin() {
        return temperaturaIdealMin;
    }

    public void setTemperaturaIdealMin(Double temperaturaIdealMin) {
        this.temperaturaIdealMin = temperaturaIdealMin;
    }

    public Double getTemperaturaIdealMax() {
        return temperaturaIdealMax;
    }

    public void setTemperaturaIdealMax(Double temperaturaIdealMax) {
        this.temperaturaIdealMax = temperaturaIdealMax;
    }


    @Override
    public String toString() {
        return "Cultura{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", tempoCicloDias=" + tempoCicloDias +
                ", necessidadeHidricaMm=" + necessidadeHidricaMm +
                ", rendimentoBaseSacasHectare=" + rendimentoBaseSacasHectare +
                ", temperaturaIdealMin=" + temperaturaIdealMin +
                ", temperaturaIdealMax=" + temperaturaIdealMax +
                '}';
    }
}
