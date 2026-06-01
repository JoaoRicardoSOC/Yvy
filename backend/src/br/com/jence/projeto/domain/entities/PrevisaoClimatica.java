package br.com.jence.projeto.domain.entities;

import java.time.YearMonth;

public class PrevisaoClimatica {
    private Long id;
    private String codigoIbgeCidade;
    private YearMonth mesAno;
    private Double volumeChuvaMm;
    private Double temperaturaMedia;
    private Boolean riscoGeada;

    public PrevisaoClimatica() {
    }

    public PrevisaoClimatica(Long id, String codigoIbgeCidade, YearMonth mesAno, Double volumeChuvaMm, Double temperaturaMedia, Boolean riscoGeada) {
        this.id = id;
        this.codigoIbgeCidade = codigoIbgeCidade;
        this.mesAno = mesAno;
        this.volumeChuvaMm = volumeChuvaMm;
        this.temperaturaMedia = temperaturaMedia;
        this.riscoGeada = riscoGeada;
    }

    public Long getId() {
        return id;
    }

    public String getCodigoIbgeCidade() {
        return codigoIbgeCidade;
    }

    public void setCodigoIbgeCidade(String codigoIbgeCidade) {
        this.codigoIbgeCidade = codigoIbgeCidade;
    }

    public YearMonth getMesAno() {
        return mesAno;
    }

    public void setMesAno(YearMonth mesAno) {
        this.mesAno = mesAno;
    }

    public Double getVolumeChuvaMm() {
        return volumeChuvaMm;
    }

    public void setVolumeChuvaMm(Double volumeChuvaMm) {
        this.volumeChuvaMm = volumeChuvaMm;
    }

    public Double getTemperaturaMedia() {
        return temperaturaMedia;
    }

    public void setTemperaturaMedia(Double temperaturaMedia) {
        this.temperaturaMedia = temperaturaMedia;
    }

    public Boolean getRiscoGeada() {
        return riscoGeada;
    }

    public void setRiscoGeada(Boolean riscoGeada) {
        this.riscoGeada = riscoGeada;
    }


    @Override
    public String toString() {
        return "PrevisaoClimatica{" +
                "id=" + id +
                ", codigoIbgeCidade='" + codigoIbgeCidade + '\'' +
                ", mesAno=" + mesAno +
                ", volumeChuvaMm=" + volumeChuvaMm +
                ", temperaturaMedia=" + temperaturaMedia +
                ", riscoGeada=" + riscoGeada +
                '}';
    }
}
