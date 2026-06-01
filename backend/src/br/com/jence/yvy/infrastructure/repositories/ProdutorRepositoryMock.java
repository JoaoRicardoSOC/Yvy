package br.com.jence.yvy.infrastructure.repositories;

import br.com.jence.yvy.domain.entities.Produtor;
import br.com.jence.yvy.domain.entities.TipoPerfil; // Importando o nosso Enum blindado
import br.com.jence.yvy.domain.repositories.IProdutorRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ProdutorRepositoryMock implements IProdutorRepository {

    private List<Produtor> produtores = new ArrayList<>();

    public ProdutorRepositoryMock() {
        // CORREÇÃO: Usando o Enum TipoPerfil.AGRONOMO que definimos na Opção 1
        produtores.add(new Produtor(1L, "João Ricardo", "joao.ricardo@yvy.com.br", "senhaFortissima123", TipoPerfil.AGRONOMO));
    }

    @Override
    public void salvar(Produtor produtor) {
        this.produtores.add(produtor);
    }

    @Override
    public List<Produtor> buscarTodos() {
        return this.produtores;
    }

    @Override
    public Optional<Produtor> buscarPorId(Long id) {
        return produtores.stream().filter(p -> p.getId().equals(id)).findFirst();
    }

    @Override
    public Optional<Produtor> buscarPorEmail(String email) {
        return produtores.stream().filter(p -> p.getEmail().equalsIgnoreCase(email)).findFirst();
    }
}