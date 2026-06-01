package br.com.jence.yvy.application;

import br.com.jence.yvy.application.services.AnalisePreditivaService;
import br.com.jence.yvy.domain.entities.AnalisePreditiva;
import br.com.jence.yvy.domain.entities.AreaPlantio;
import br.com.jence.yvy.domain.entities.Cultura;
import br.com.jence.yvy.infrastructure.repositories.CulturaRepositoryMock;
import br.com.jence.yvy.infrastructure.repositories.PrevisaoClimaticaRepositoryMock;

public class MainTesteMotor {

    public static void main(String[] args) {

        System.out.println("==================================================");
        System.out.println("🚜 INICIANDO MOTOR PREDITIVO YVY (SERVICE LAYER)");
        System.out.println("==================================================\n");

        // 1. INICIALIZAR A INFRAESTRUTURA (Ligar os Mocks)
        CulturaRepositoryMock culturaRepo = new CulturaRepositoryMock();
        PrevisaoClimaticaRepositoryMock nasaRepo = new PrevisaoClimaticaRepositoryMock();

        // 2. INICIALIZAR O SERVIÇO (A Letra 'D' do SOLID: Injeção de Dependência)
        AnalisePreditivaService motorPreditivo = new AnalisePreditivaService(nasaRepo, culturaRepo);

        // 3. PREPARAR OS DADOS DO PRODUTOR
        // Pegamos a Soja direto do banco mockado
        Cultura soja = culturaRepo.buscarPorNome("Soja").orElseThrow();

        // Criamos a fazenda do produtor (100 hectares, SEM irrigação)
        AreaPlantio talhao1 = new AreaPlantio(1L, 100.0, "Argiloso", true, 6.5);

        // Código IBGE de Sorriso-MT
        String ibgeSorriso = "5107925";

        System.out.println("📍 Cenário de Teste (Inputs do Produtor):");
        System.out.println("   - Cultura: " + soja.getNome() + " (Exige " + soja.getNecessidadeHidricaMm() + "mm de chuva)");
        System.out.println("   - Área: " + talhao1.getTamanhoHectares() + " hectares (Irrigação: " + (talhao1.getPossuiIrrigacao() ? "Sim" : "Não") + ")");
        System.out.println("   - Cidade (IBGE): " + ibgeSorriso + "\n");

        System.out.println("⚙️ Processando dados com a NASA (Motor em ação...)...\n");

        // 4. A MÁGICA ACONTECE: Chamar o Caso de Uso
        AnalisePreditiva resultado = motorPreditivo.gerarRecomendacao(talhao1, soja, ibgeSorriso);

        // 5. EXIBIR OS RESULTADOS
        Double rendimentoMaximoPossivel = soja.getRendimentoBaseSacasHectare() * talhao1.getTamanhoHectares();

        System.out.println("==================================================");
        System.out.println("🚨 RESULTADO DA ANÁLISE CLIMÁTICA");
        System.out.println("==================================================");
        System.out.println("Mês Recomendado para Plantio: " + resultado.getMelhorDataInicioPlantio().getMonth() + "/" + resultado.getMelhorDataInicioPlantio().getYear());
        System.out.println("Nível de Risco Calculado: " + resultado.getRiscoClimaticoCalculado());
        System.out.println("Rendimento Ideal (Sem Risco): " + rendimentoMaximoPossivel + " sacas");
        System.out.println("Rendimento Estimado (Com Risco): " + resultado.getRendimentoEstimadoSacas() + " sacas");
        System.out.println("Prejuízo Evitado: " + (rendimentoMaximoPossivel - resultado.getRendimentoEstimadoSacas()) + " sacas");
    }
}