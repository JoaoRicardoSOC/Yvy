package br.com.jence.yvy.domain.repositories;

import br.com.jence.yvy.domain.entities.Cultura;
import java.util.List;
import java.util.Optional;

public interface ICulturaRepository {
    void salvar(Cultura cultura);
    List<Cultura> buscarTodos();
    Optional<Cultura> buscarPorId(Long id);
    Optional<Cultura> buscarPorNome(String nome);
}