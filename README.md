
![Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)
![Global Solution](https://img.shields.io/badge/FIAP-Global_Solution-ed145b?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-POO_%7C_DDD-007396?style=for-the-badge&logo=java&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Oracle](https://img.shields.io/badge/Oracle-Database-F80000?style=for-the-badge&logo=oracle&logoColor=white)

> **JENCE Developments** - Desenvolvido para a Global Solution (1/2026).
> Focado na erradicação da fome (ODS 2) e no combate às mudanças climáticas (ODS 13) através da democratização de dados espaciais para pequenos produtores rurais.

---

## 🎯 O Projeto
A assimetria de informações climáticas é um dos maiores causadores de perdas nas safras de pequenos e médios agricultores. O **AgroSat** é uma plataforma preditiva que cruza dados agronômicos de diferentes culturas com informações meteorológicas orbitais para recomendar a melhor janela de plantio, mitigando riscos de seca ou excesso de chuvas.

### 🌟 Diferenciais e Vantagens
* **Arquitetura Limpa (Clean Architecture):** Backend em Java rigorosamente estruturado com princípios de Domain-Driven Design (DDD) e SOLID. As regras de negócio estão blindadas dentro de entidades ricas, isolando o domínio da infraestrutura.
* **Inteligência Preditiva:** Algoritmo que simula o consumo de dados da **NASA POWER API** (Prediction Of Worldwide Energy Resources) para balizar a tomada de decisão do produtor rural.
* **UX/UI Mobile-First:** Frontend desenvolvido em React como uma Single Page Application (SPA), garantindo acessibilidade, carregamento instantâneo e redução da carga cognitiva para o utilizador no campo.
* **Persistência de Dados Estruturada:** Modelagem de base de dados robusta e normalizada, garantindo a integridade das análises.

---

## 🏗️ Stack Tecnológica

* **Backend:** Java (Core) focado em POO estruturada em Consola.
* **Frontend:** React.js, Vite, JavaScript (Vanilla), HTML5 Semântico e CSS3 (Tailwind/Bootstrap).
* **Base de Dados:** Oracle SQL (Modelagem Relacional, DDL, DML e DQL).
* **Design & Prototipagem:** Figma.
* **Metodologia Ágil:** Trello, Git Flow.

---

## 📂 Arquitetura do Repositório (Monorepo)

O projeto está dividido em pacotes isolados para garantir o baixo acoplamento:

```text
AgroSat-GlobalSolution/
├── backend/            # Lógica Preditiva e Domínio (Java)
│   └── src/            # Estruturado em: domain, application, infrastructure e presentation
├── frontend/           # Interface do Utilizador (React/Vite)
├── database/           # Scripts SQL (Criação, Constraints e Mock de Dados)
└── docs/               # Diagrama de Classes (UML), Modelo Relacional e Wireframes
```

## 🚀 Como Executar o Projeto (Guia do Avaliador)
1. Backend (Motor Preditivo em Java)
Certifique-se de que tem o JDK instalado.

Navegue até à pasta backend/src.

Compile e execute a classe Main.java (localizada na raiz do pacote de apresentação) na sua IDE de preferência (Eclipse, IntelliJ, VS Code).

O sistema iniciará na consola o Menu Interativo do AgroSat. Siga as instruções no ecrã para simular o registo e correr a análise preditiva.

2. Frontend (Interface Web em React)
Certifique-se de que tem o Node.js instalado.

Abra um terminal na pasta frontend/.

Instale as dependências executando:
npm install

Inicie o servidor de desenvolvimento:
npm run dev

O sistema abrirá automaticamente no seu navegador.

3. Base de Dados (Oracle SQL)
Os scripts encontram-se na pasta database/.

Execute o ficheiro de DDL para a criação das tabelas e constraints.

Em seguida, execute o ficheiro DML para popular a base de dados com a massa de dados que alimenta a simulação no Java.

Projeto desenvolvido exclusivamente para fins académicos - FIAP 2026.