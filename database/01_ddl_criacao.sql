-- ============================================================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS (YVY - AGTECH)
-- ============================================================================

DROP TABLE ANALISE_PREDITIVA CASCADE CONSTRAINTS;
DROP TABLE AREA_PLANTIO CASCADE CONSTRAINTS;
DROP TABLE PREVISAO_CLIMATICA_REGIAO CASCADE CONSTRAINTS;
DROP TABLE PROPRIEDADE CASCADE CONSTRAINTS;
DROP TABLE CULTURA CASCADE CONSTRAINTS;
DROP TABLE PRODUTOR CASCADE CONSTRAINTS;

-- ============================================================================
-- 1. TABELA: PRODUTOR
-- ============================================================================
CREATE TABLE PRODUTOR (
    ID_Produtor   NUMBER,
    Nome          VARCHAR2(150) NOT NULL,
    Email         VARCHAR2(150) NOT NULL,
    Senha         VARCHAR2(255) NOT NULL,
    Tipo_Perfil   VARCHAR2(20)  NOT NULL,
    
    CONSTRAINT PK_PRODUTOR PRIMARY KEY (ID_Produtor),
    CONSTRAINT UK_PRODUTOR_EMAIL UNIQUE (Email)
);

-- ============================================================================
-- 2. TABELA: CULTURA
-- ============================================================================
CREATE TABLE CULTURA (
    ID_Cultura                    NUMBER,
    Nome                          VARCHAR2(100) NOT NULL,
    Tempo_Ciclo_Dias              NUMBER NOT NULL,
    Necessidade_Hidrica_mm        NUMBER(6,2) NOT NULL,
    Temperatura_Ideal_Min         NUMBER(4,1) NOT NULL,
    Temperatura_Ideal_Max         NUMBER(4,1) NOT NULL,
    Rendimento_Base_Sacas_Hectare NUMBER(6,2) NOT NULL,
    
    CONSTRAINT PK_CULTURA PRIMARY KEY (ID_Cultura),
    CONSTRAINT UK_CULTURA_NOME UNIQUE (Nome) -- CORREÇÃO: Trava de unicidade restaurada
);

-- ============================================================================
-- 3. TABELA: PROPRIEDADE
-- ============================================================================
CREATE TABLE PROPRIEDADE (
    ID_Propriedade     NUMBER,
    ID_Produtor        NUMBER NOT NULL,
    Nome_Propriedade   VARCHAR2(150) NOT NULL,
    Codigo_IBGE_Cidade VARCHAR2(20) NOT NULL,
    Estado             CHAR(2) NOT NULL,
    
    CONSTRAINT PK_PROPRIEDADE PRIMARY KEY (ID_Propriedade),
    CONSTRAINT FK_PROPRIEDADE_PRODUTOR FOREIGN KEY (ID_Produtor) 
        REFERENCES PRODUTOR (ID_Produtor)
);

CREATE INDEX IDX_PROPRIEDADE_IBGE ON PROPRIEDADE (Codigo_IBGE_Cidade);

-- ============================================================================
-- 4. TABELA: PREVISAO_CLIMATICA_REGIAO 
-- ============================================================================
CREATE TABLE PREVISAO_CLIMATICA_REGIAO (
    ID_Previsao                NUMBER,
    Codigo_IBGE_Cidade         VARCHAR2(20) NOT NULL,
    Mes_Ano                    DATE NOT NULL, -- CORREÇÃO: Restaurado para DATE
    Volume_Chuva_Esperado_mm   NUMBER(6,2) NOT NULL,
    Temperatura_Media_Prevista NUMBER(4,1) NOT NULL,
    Risco_Geada                NUMBER(1) NOT NULL,
    
    CONSTRAINT PK_PREVISAO_CLIMATICA PRIMARY KEY (ID_Previsao),
    CONSTRAINT UK_PREVISAO_CIDADE_PERIODO UNIQUE (Codigo_IBGE_Cidade, Mes_Ano),
    CONSTRAINT CK_PREVISAO_RISCO_GEADA CHECK (Risco_Geada IN (0, 1))
);

-- ============================================================================
-- 5. TABELA: AREA_PLANTIO 
-- ============================================================================
CREATE TABLE AREA_PLANTIO (
    ID_Area                  NUMBER,
    ID_Propriedade           NUMBER NOT NULL,
    Tamanho_Hectares         NUMBER(8,2) NOT NULL,
    Tipo_Solo                VARCHAR2(30) NOT NULL,
    Possui_Irrigacao         NUMBER(1) NOT NULL,
    Ultima_Cultura_Plantada  NUMBER, 
    Ph_Solo                  NUMBER(3,1) NOT NULL,
    
    CONSTRAINT PK_AREA_PLANTIO PRIMARY KEY (ID_Area),
    CONSTRAINT FK_AREA_PLANTIO_PROPRIEDADE FOREIGN KEY (ID_Propriedade) 
        REFERENCES PROPRIEDADE (ID_Propriedade),
    CONSTRAINT FK_AREA_PLANTIO_CULTURA FOREIGN KEY (Ultima_Cultura_Plantada) 
        REFERENCES CULTURA (ID_Cultura),
    CONSTRAINT CK_AREA_POSSUI_IRRIGACAO CHECK (Possui_Irrigacao IN (0, 1))
);

-- ============================================================================
-- 6. TABELA: ANALISE_PREDITIVA 
-- ============================================================================
CREATE TABLE ANALISE_PREDITIVA (
    ID_Analise                  NUMBER,
    ID_Area                     NUMBER NOT NULL,
    ID_Cultura                  NUMBER NOT NULL,
    Data_Processamento          TIMESTAMP WITH TIME ZONE NOT NULL, -- CORREÇÃO: Restaurada precisão
    Melhor_Data_Inicio_Plantio  DATE NOT NULL,
    Data_Prevista_Colheita      DATE NOT NULL,
    Risco_Climatico_Calculado   VARCHAR2(10) NOT NULL,
    Rendimento_Estimado_Sacas   NUMBER(8,2) NOT NULL,
    Status_Analise              VARCHAR2(20) NOT NULL,
    
    CONSTRAINT PK_ANALISE_PREDITIVA PRIMARY KEY (ID_Analise),
    CONSTRAINT FK_ANALISE_AREA FOREIGN KEY (ID_Area) 
        REFERENCES AREA_PLANTIO (ID_Area),
    CONSTRAINT FK_ANALISE_CULTURA FOREIGN KEY (ID_Cultura) 
        REFERENCES CULTURA (ID_Cultura)
);