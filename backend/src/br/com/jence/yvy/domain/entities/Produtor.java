package br.com.jence.yvy.domain.entities;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Produtor {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private TipoPerfil tipoPerfil;
    private List<br.com.jence.yvy.domain.entities.Propriedade> propriedadesList = new ArrayList<>();


    public Produtor() {};

    public Produtor(Long id, String nome, String email, String senha, String tipoPerfil) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipoPerfil = tipoPerfil;
    }


    public void adicionarPropriedade(Propriedade propriedade) {
        if (propriedade == null) {
            throw new IllegalArgumentException("A propriedade não pode ser null.");
        }

        propriedadesList.add(propriedade);
    }

    public void removerPropriedade(Propriedade propriedade) {
        if (propriedade == null) {
            throw new IllegalArgumentException("A propriedade não pode ser null.");
        }

        if (!propriedadesList.contains(propriedade)) {
            throw new IllegalArgumentException("A propriedade não pertence a este produtor.");
        }

        propriedadesList.remove(propriedade);
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTipoPerfil() {
        return tipoPerfil;
    }

    public void setTipoPerfil(String tipoPerfil) {
        this.tipoPerfil = tipoPerfil;
    }

    public List<Propriedade> getPropriedadesList() {
        return Collections.unmodifiableList(propriedadesList);
    }


    @Override
    public String toString() {
        return "Produtor{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                ", tipoPerfil='" + tipoPerfil + '\'' +
                ", propriedadesList=" + propriedadesList +
                '}';
    }
}
