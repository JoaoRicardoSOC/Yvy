package br.com.jence.yvy.infrastructure.repositories;

import br.com.jence.yvy.domain.entities.Cultura;
import br.com.jence.yvy.domain.repositories.ICulturaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CulturaRepositoryMock implements ICulturaRepository {

    private List<Cultura> culturas = new ArrayList<>();

    public CulturaRepositoryMock() {
        // Mock Data: Instanciando as sementes que o Motor Preditivo vai usar
        culturas.add(new Cultura(1L, "Soja", 120, 800.0, 60.0, 20.0, 30.0));
        culturas.add(new Cultura(2L, "Milho", 90, 600.0, 100.0, 18.0, 28.0));
    }

    @Override
    public void salvar(Cultura cultura) {
        this.culturas.add(cultura);
    }

    @Override
    public List<Cultura> buscarTodos() {
        return this.culturas;
    }

    @Override
    public Optional<Cultura> buscarPorId(Long id) {
        return culturas.stream().filter(c -> c.getId().equals(id)).findFirst();
    }

    @Override
    public Optional<Cultura> buscarPorNome(String nome) {
        return culturas.stream().filter(c -> c.getNome().equalsIgnoreCase(nome)).findFirst();
    }
}