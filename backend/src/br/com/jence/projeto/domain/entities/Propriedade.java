package br.com.jence.projeto.domain.entities;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Propriedade {
    private Long id;
    private String nome;
    private String codigoIbgeCidade;
    private String estado;
    private List<AreaPlantio> areasPlantio = new ArrayList<>();


    public Propriedade() {};

    public Propriedade(Long id, String nome, String codigoIbgeCidade, String estado, AreaPlantio areaPlantio) {
        this.id = id;
        this.nome = nome;
        this.codigoIbgeCidade = codigoIbgeCidade;
        this.estado = estado;
        this.areasPlantio.add(areaPlantio);
    }


    public void adicionarAreaPlantio(AreaPlantio area) {
        if (area == null) {
            throw new IllegalArgumentException("A área não pode ser null.");
        }
        areasPlantio.add(area);
    }

    public void removerAreaPlantio(AreaPlantio area) {
        if (area == null) {
            throw new IllegalArgumentException("A área não pode ser null.");
        }

        if (!areasPlantio.contains(area)) {
            throw new IllegalArgumentException("A área não pertence a esta propriedade.");
        }

        if (areasPlantio.size() <= 1) {
            throw new IllegalStateException("Propriedade deve ter pelo menos uma área de plantio.");
        }
        areasPlantio.remove(area);
    }


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

    public String getCodigoIbgeCidade() {
        return codigoIbgeCidade;
    }

    public void setCodigoIbgeCidade(String codigoIbgeCidade) {
        this.codigoIbgeCidade = codigoIbgeCidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public List<AreaPlantio> getAreasPlantio() {
        return Collections.unmodifiableList(areasPlantio);
    }


    @Override
    public String toString() {
        return "Propriedade{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", codigoIbgeCidade='" + codigoIbgeCidade + '\'' +
                ", estado='" + estado + '\'' +
                ", areasPlantio=" + areasPlantio +
                '}';
    }
}
