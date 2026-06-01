package br.com.jence.projeto.domain.entities;

public class AreaPlantio {
    private Long id;
    private Double tamanhoHectares;
    private String tipoSolo;
    private Boolean possuiIrrigacao;
    private Double phSolo;
    private Cultura ultimaCulturaPlantada = null;


    public AreaPlantio() {};

    public AreaPlantio(Long id, Double tamanhoHectares, String tipoSolo, Boolean possuiIrrigacao, Double phSolo) {
        this.id = id;
        this.tamanhoHectares = tamanhoHectares;
        this.tipoSolo = tipoSolo;
        this.possuiIrrigacao = possuiIrrigacao;
        this.phSolo = phSolo;
    }


    public Double calcularPotencialRetencaoAgua() {
        Double potencial = 0.0;

        // Cada tipo de solo retém água de forma diferente
        switch (tipoSolo.toLowerCase()) {
            case "argiloso":
                potencial = tamanhoHectares * 0.6; // retém mais água
                break;
            case "siltoso":
                potencial = tamanhoHectares * 0.4;
                break;
            case "arenoso":
                potencial = tamanhoHectares * 0.2; // retém menos água
                break;
            default:
                potencial = tamanhoHectares * 0.3;
        }

        // Irrigação aumenta o potencial hídrico da área
        if (possuiIrrigacao) {
            potencial *= 1.3; // 30% a mais
        }

        return potencial;
    }


    public Long getId() {
        return id;
    }

    public Double getTamanhoHectares() {
        return tamanhoHectares;
    }

    public void setTamanhoHectares(Double tamanhoHectares) {
        if (tamanhoHectares <= 0) {
            throw new IllegalArgumentException("O tamanho deve ser positivo.");
        }
        this.tamanhoHectares = tamanhoHectares;
    }

    public String getTipoSolo() {
        return tipoSolo;
    }

    public void setTipoSolo(String tipoSolo) {
        this.tipoSolo = tipoSolo;
    }

    public Boolean getPossuiIrrigacao() {
        return possuiIrrigacao;
    }

    public void setPossuiIrrigacao(Boolean possuiIrrigacao) {
        this.possuiIrrigacao = possuiIrrigacao;
    }

    public Double getPhSolo() {
        return phSolo;
    }

    public void setPhSolo(Double phSolo) {
        this.phSolo = phSolo;
    }

    public Cultura getUltimaCulturaPlantada() {
        return ultimaCulturaPlantada;
    }

    public void setUltimaCulturaPlantada(Cultura ultimaCulturaPlantada) {
        this.ultimaCulturaPlantada = ultimaCulturaPlantada;
    }


    @Override
    public String toString() {
        return "AreaPlantio{" +
                "id=" + id +
                ", tamanhoHectares=" + tamanhoHectares +
                ", tipoSolo='" + tipoSolo + '\'' +
                ", possuiIrrigacao=" + possuiIrrigacao +
                ", phSolo=" + phSolo +
                ", ultimaCulturaPlantada=" + ultimaCulturaPlantada +
                '}';
    }
}
