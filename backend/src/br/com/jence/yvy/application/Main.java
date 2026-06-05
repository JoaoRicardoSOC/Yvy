package br.com.jence.yvy.application;

import br.com.jence.yvy.application.services.AnalisePreditivaService;
import br.com.jence.yvy.domain.entities.AreaPlantio;
import br.com.jence.yvy.domain.entities.Cultura;

import br.com.jence.yvy.domain.entities.Produtor;
import br.com.jence.yvy.domain.entities.Propriedade;
import br.com.jence.yvy.infrastructure.repositories.CulturaRepositoryMock;
import br.com.jence.yvy.infrastructure.repositories.PrevisaoClimaticaRepositoryMock;
import br.com.jence.yvy.infrastructure.repositories.ProdutorRepositoryMock;

import java.util.InputMismatchException;
import java.util.List;

import java.util.Optional;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // 1. SETUP INICIAL
        // 1.1. INICIALIZAR A INFRAESTRUTURA (Ligar os Mocks)
        CulturaRepositoryMock culturaRepo = new CulturaRepositoryMock();
        PrevisaoClimaticaRepositoryMock nasaRepo = new PrevisaoClimaticaRepositoryMock();
        ProdutorRepositoryMock produtorRepo = new ProdutorRepositoryMock();

        // 1.2. INICIALIZAR O SERVIÇO (A Letra 'D' do SOLID: Injeção de Dependência)
        AnalisePreditivaService motorPreditivo = new AnalisePreditivaService(nasaRepo, culturaRepo);

        // 1.3. INICIALIZAR O SCANNER
        Scanner sc = new Scanner(System.in);

        // 1.4 "LOGGANDO" O USUARIO
        Produtor usuario = null;
        System.out.println("======== INICIALIZANDO O SISTEMA =======");
        System.out.print(" Digite seu ID de Produtor: ");
        usuario = menuUsuario(sc, produtorRepo);
        System.out.println();
        System.out.println("Bem-vindo(a) " + usuario.getNome() + "!");

        // 2. LOOP DE MENU
        int opcao = 0;

        do {
            System.out.println("\n========================================");
            System.out.println("   🌱 SISTEMA DE ANÁLISE PREDITIVA 🌱  ");
            System.out.println("========================================");
            System.out.println();
            System.out.println(" [1] 🚜 Cadastrar Nova Área de Plantio");
            System.out.println(" [2] 🌱 Listar Culturas Disponíveis");
            System.out.println(" [3] 🚀 Gerar Análise Preditiva");
            System.out.println(" [0] Sair");
            System.out.println();
            System.out.println("========================================");
            System.out.print(" Escolha uma opção: ");

            // 2.1. CAPTURA E VALIDA A ESCOLHA DO USUÁRIO
            try {
                opcao = sc.nextInt();
                sc.nextLine();

                switch (opcao) {
                    case 1:
                        menuCadastro(sc, usuario);
                        break;

                    case 2:
                        System.out.println("\nListando as Culturas Disponíveis:");

                        List<Cultura> culturaList = culturaRepo.buscarTodos();

                        for (Cultura cultura : culturaList) {
                            System.out.println(cultura);
                        }

                        break;

                    case 3:
                        System.out.println("\nGerando Análise Preditiva:");

                        System.out.print("Digite o ID da Área de Plantio: ");
                        Long idArea = sc.nextLong();
                        sc.nextLine();
                        Optional<AreaPlantio> areaPlantio = usuario.getPropriedadesList()
                                        .stream()
                                                .flatMap(propriedade -> propriedade.getAreasPlantio().stream()
                                                        .filter(area -> area.getId().equals(idArea)))
                                                        .findFirst();
                        AreaPlantio areaEncontrada;
                        if (areaPlantio.isPresent()) {
                            areaEncontrada = areaPlantio.get();
                        }
                        else {
                            System.out.println("Área não Encontrada! Tente novamente.");
                            break;
                        }

                        System.out.print("Digite o ID da Cultura: ");
                        Long idCultura = sc.nextLong();
                        sc.nextLine();
                        Optional<Cultura> cultura = culturaRepo.buscarPorId(idCultura);
                        Cultura culturaEncontrada;
                        if (cultura.isPresent()) {
                            culturaEncontrada = cultura.get();
                        }
                        else {
                            System.out.println("Cultura não Encontrada! Tente novamente.");
                            break;
                        }

                        System.out.println("Digite o Número que Corresponde a Cidade na Tabela: ");
                        String codigoIbge = selecionarMunicipio(sc);
                        if (codigoIbge == null) {
                            System.out.println("Seleção de município cancelada.");
                            break;
                        }

                        System.out.println(motorPreditivo.gerarRecomendacao(areaEncontrada, culturaEncontrada, codigoIbge));

                        break;

                    case 0:
                        System.out.println("\nSaindo do sistema...");
                        break;

                    default:
                        System.out.println("\n[Erro] Opção inválida! Tente novamente.");
                }
            } catch (InputMismatchException e) {
                System.out.println("\n[Erro] Entrada inválida! Tente novamente.");
                sc.nextLine();
                opcao = -1;
            }
            } while (opcao != 0);

        //
        sc.close();
    }


    // MENUS AUXILIARES
    public static Produtor menuUsuario(Scanner scanner, ProdutorRepositoryMock produtorRepo) {
        Optional<Produtor> produtor;

        do {
            try {
                produtor = produtorRepo.buscarPorId(scanner.nextLong());
                scanner.nextLine();

                if (produtor.isPresent()) {
                    return produtor.get();
                }
                else {
                    System.out.println("Não existe produtor com esse ID! Tente Novamente.");
                }

            } catch (InputMismatchException e) {
                System.out.println("\n[Erro] Entrada inválida! Tente novamente.");
                scanner.nextLine();
            }
        } while (true);
    }

    public static void menuCadastro(Scanner scanner, Produtor usuario) {
        AreaPlantio areaPlantio = lerDadosAreaPlantio(scanner);
        if (areaPlantio == null) return;

        int opcao = 0;
        do {
            System.out.println("\n========================================");
            System.out.println(" [1] Cadastrar uma nova Fazenda para Adicionar a Área");
            System.out.println(" [2] Adicionar a Área em uma Fazenda já Cadastrada");
            System.out.println(" [0] CANCELAR");
            System.out.println("========================================");
            System.out.print(" Escolha uma opção: ");

            try {
                opcao = scanner.nextInt();
                scanner.nextLine();

                switch (opcao) {
                    case 1: cadastrarNovaFazenda(scanner, usuario, areaPlantio); opcao = 0; break;
                    case 2: adicionarAreaFazendaExistente(scanner, usuario, areaPlantio); opcao = 0; break;
                    case 0: System.out.println("Cadastro cancelado."); break;
                    default: System.out.println("\n[Erro] Opção inválida! Tente novamente.");
                }
            } catch (InputMismatchException e) {
                System.out.println("\n[Erro] Entrada inválida! Tente novamente.");
                scanner.nextLine();
                opcao = -1;
            }
        } while (opcao != 0);
    }

    private static AreaPlantio lerDadosAreaPlantio(Scanner scanner) {
        try {
            System.out.println("========================================");
            System.out.println("\nCadastrando uma Nova Área de Plantio:");

            System.out.print("Digite o ID da área: ");
            long idArea = scanner.nextLong();
            scanner.nextLine();

            System.out.print("Digite o tamanho da área em Hectares: ");
            double hectares = scanner.nextDouble();
            scanner.nextLine();

            System.out.print("Tipo de solo (argiloso/siltoso/arenoso): ");
            String tipoSolo = scanner.nextLine();

            System.out.print("A área possui irrigação? (Sim/Não): ");
            String irrigacaoInput = scanner.nextLine().trim();
            boolean irrigacao = irrigacaoInput.equalsIgnoreCase("sim")
                    || irrigacaoInput.equalsIgnoreCase("s");

            System.out.print("Digite pH do solo: ");
            double ph = scanner.nextDouble();
            scanner.nextLine();

            return new AreaPlantio(idArea, hectares, tipoSolo, irrigacao, ph);

        } catch (InputMismatchException e) {
            System.out.println("\n[Erro] Entrada inválida! Voltando ao menu principal.");
            scanner.nextLine();
            return null;
        }
    }

    private static void cadastrarNovaFazenda(Scanner scanner, Produtor usuario, AreaPlantio areaPlantio) {
        try {
            System.out.println("\nCadastrando uma Nova Fazenda:");
            System.out.print("Digite o ID da fazenda: ");
            long idFazenda = scanner.nextLong();
            scanner.nextLine();

            System.out.print("Digite o nome da fazenda: ");
            String nomeFazenda = scanner.nextLine();

            String codigoIbge = selecionarMunicipio(scanner);
            if (codigoIbge == null) {
                System.out.println("Seleção de município cancelada.");
                return;
            }

            String estadoFazenda = switch (codigoIbge.substring(0, 2)) {
                case "51" -> "MT";
                case "41" -> "PR";
                case "33" -> "RJ";
                case "35" -> "SP";
                default -> "";
            };

            Propriedade novaFazenda = new Propriedade(idFazenda, nomeFazenda, codigoIbge, estadoFazenda, areaPlantio);
            usuario.adicionarPropriedade(novaFazenda);

            System.out.println("✅ Cadastros realizados com sucesso!");
            System.out.println(novaFazenda);
            System.out.println(areaPlantio);

        } catch (InputMismatchException e) {
            System.out.println("\n[Erro] Entrada inválida! Voltando ao submenu.");
            scanner.nextLine();
        }
    }

    private static void adicionarAreaFazendaExistente(Scanner scanner, Produtor usuario, AreaPlantio areaPlantio) {
        try {
            System.out.print("\nDigite o ID da fazenda: ");
            long idPropriedade = scanner.nextLong();
            scanner.nextLine();

            Optional<Propriedade> propriedadeOptional = usuario.getPropriedadesList()
                    .stream()
                    .filter(p -> p.getId().equals(idPropriedade))
                    .findFirst();

            if (propriedadeOptional.isPresent()) {
                propriedadeOptional.get().adicionarAreaPlantio(areaPlantio);
                System.out.println("✅ Área cadastrada com sucesso!");
                System.out.println(areaPlantio);
            } else {
                System.out.println("Fazenda não encontrada! Tente a opção 1.");
            }

        } catch (InputMismatchException e) {
            System.out.println("\n[Erro] Entrada inválida! Voltando ao submenu.");
            scanner.nextLine();
        }
    }

    public static String selecionarMunicipio(Scanner scanner) {
        int option = 0;

        do {
            System.out.println("========================================");
            System.out.println();
            System.out.println(" [1] Campos dos Goytacazes/RJ");
            System.out.println(" [2] Cascavel/PR");
            System.out.println(" [3] Cuiabá/MT");
            System.out.println(" [4] São Paulo/SP");
            System.out.println(" [5] Sorriso/MT");
            System.out.println(" [0] CANCELAR");
            System.out.println();
            System.out.println("========================================");
            System.out.print(" Escolha uma opção: ");

            try {
                option = scanner.nextInt();
                scanner.nextLine();

                switch (option) {
                    case 1:
                        return "3301009";

                    case 2:
                        return "4104808";

                    case 3:
                        return "5103403";

                    case 4:
                        return "3550308";

                    case 5:
                        return "5107925";

                    case 0:
                        return null;

                    default:
                        System.out.println("\n[Erro] Opção inválida! Tente novamente.");
                }
            } catch (InputMismatchException e) {
                System.out.println("\n[Erro] Entrada inválida! Tente novamente.");
                scanner.nextLine();
                option = -1;
            }
        } while (option != 0);
        return null;
    }
}
