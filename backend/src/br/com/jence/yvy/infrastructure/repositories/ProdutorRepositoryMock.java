package br.com.jence.yvy.infrastructure.repositories;

import br.com.jence.yvy.domain.entities.AreaPlantio;
import br.com.jence.yvy.domain.entities.Produtor;
import br.com.jence.yvy.domain.entities.Propriedade;
import br.com.jence.yvy.domain.entities.TipoPerfil; // Importando o nosso Enum blindado
import br.com.jence.yvy.domain.repositories.IProdutorRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ProdutorRepositoryMock implements IProdutorRepository {

    private List<Produtor> produtores = new ArrayList<>();

    public ProdutorRepositoryMock() {
        Produtor joao = new Produtor(1L, "João Ricardo", "joao.ricardo@yvy.com.br", "senhaFortissima123", TipoPerfil.AGRONOMO);

        // ÁREA 1 — Sorriso/MT
        AreaPlantio area1 = new AreaPlantio(1L, 50.0, "argiloso", true, 6.2);
        Propriedade fazendaSorriso = new Propriedade(1L, "Fazenda Planalto", "5107925", "MT", area1);

        // ÁREA 2 — segunda área na mesma fazenda
        AreaPlantio area2 = new AreaPlantio(2L, 30.0, "arenoso", false, 5.8);
        fazendaSorriso.adicionarAreaPlantio(area2);

        // ÁREA 3 — Cascavel/PR
        AreaPlantio area3 = new AreaPlantio(3L, 80.0, "siltoso", true, 6.5);
        Propriedade fazendaCascavel = new Propriedade(2L, "Fazenda Boa Esperança", "4104808", "PR", area3);

        joao.adicionarPropriedade(fazendaSorriso);
        joao.adicionarPropriedade(fazendaCascavel);

        produtores.add(joao);
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