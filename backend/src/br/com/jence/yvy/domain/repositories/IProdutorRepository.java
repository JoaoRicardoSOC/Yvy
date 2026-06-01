package br.com.jence.yvy.domain.repositories;

import br.com.jence.yvy.domain.entities.Produtor;
import java.util.List;
import java.util.Optional;

public interface IProdutorRepository {
    void salvar(Produtor produtor);
    List<Produtor> buscarTodos();
    Optional<Produtor> buscarPorId(Long id);
    Optional<Produtor> buscarPorEmail(String email);
}