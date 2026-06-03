-- ============================================================================
-- SCRIPT DE POPULAÇÃO DE DADOS (YVY - AGTECH)
-- ============================================================================

SET DEFINE OFF;

-- 1. CULTURA
INSERT INTO CULTURA (ID_Cultura, Nome, Tempo_Ciclo_Dias, Necessidade_Hidrica_mm, Temperatura_Ideal_Min, Temperatura_Ideal_Max, Rendimento_Base_Sacas_Hectare)
VALUES (1, 'Soja', 120, 600.00, 20.0, 30.0, 60.00);

INSERT INTO CULTURA (ID_Cultura, Nome, Tempo_Ciclo_Dias, Necessidade_Hidrica_mm, Temperatura_Ideal_Min, Temperatura_Ideal_Max, Rendimento_Base_Sacas_Hectare)
VALUES (2, 'Milho', 140, 500.00, 18.0, 33.0, 90.00);

INSERT INTO CULTURA (ID_Cultura, Nome, Tempo_Ciclo_Dias, Necessidade_Hidrica_mm, Temperatura_Ideal_Min, Temperatura_Ideal_Max, Rendimento_Base_Sacas_Hectare)
VALUES (3, 'Trigo', 130, 350.00, 10.0, 24.0, 45.00);


-- 2. PRODUTOR
INSERT INTO PRODUTOR (ID_Produtor, Nome, Email, Senha, Tipo_Perfil)
VALUES (1, 'Raimundo Nonato Silva', 'raimundo.silva@yvyagro.com.br', '$2a$12$EjR7Xb8QY8Z2jZ9WvK8uO.e3gR1wZfS9XyZ7vM5bN3c4d5e6f7g8h', 'PRODUTOR');

INSERT INTO PRODUTOR (ID_Produtor, Nome, Email, Senha, Tipo_Perfil)
VALUES (2, 'Beatriz Junqueira Rezende', 'beatriz.junqueira@agroholding.com', '$2a$12$K9vW8xZ2jZ9WvK8uO.e3gR1wZfS9XyZ7vM5bN3c4d5e6f7g8h9i0j', 'AGRONOMO');


-- 3. PROPRIEDADE
INSERT INTO PROPRIEDADE (ID_Propriedade, ID_Produtor, Nome_Propriedade, Codigo_IBGE_Cidade, Estado)
VALUES (10, 1, 'Sítio Boa Vista', '4314102', 'RS');

INSERT INTO PROPRIEDADE (ID_Propriedade, ID_Produtor, Nome_Propriedade, Codigo_IBGE_Cidade, Estado)
VALUES (20, 2, 'Fazenda Horizonte Infinito', '5107925', 'MT');


-- 4. PREVISAO_CLIMATICA_REGIAO
-- Passo Fundo/RS (Cenário de Geada em Junho e transição para Primavera Ideal)
INSERT INTO PREVISAO_CLIMATICA_REGIAO (ID_Previsao, Codigo_IBGE_Cidade, Mes_Ano, Volume_Chuva_Esperado_mm, Temperatura_Media_Prevista, Risco_Geada)
VALUES (101, '4314102', TO_DATE('2026-06-01', 'YYYY-MM-DD'), 45.00, 11.5, 1);

INSERT INTO PREVISAO_CLIMATICA_REGIAO (ID_Previsao, Codigo_IBGE_Cidade, Mes_Ano, Volume_Chuva_Esperado_mm, Temperatura_Media_Prevista, Risco_Geada)
VALUES (102, '4314102', TO_DATE('2026-07-01', 'YYYY-MM-DD'), 60.00, 13.0, 0);

INSERT INTO PREVISAO_CLIMATICA_REGIAO (ID_Previsao, Codigo_IBGE_Cidade, Mes_Ano, Volume_Chuva_Esperado_mm, Temperatura_Media_Prevista, Risco_Geada)
VALUES (103, '4314102', TO_DATE('2026-08-01', 'YYYY-MM-DD'), 95.00, 16.5, 0);

INSERT INTO PREVISAO_CLIMATICA_REGIAO (ID_Previsao, Codigo_IBGE_Cidade, Mes_Ano, Volume_Chuva_Esperado_mm, Temperatura_Media_Prevista, Risco_Geada)
VALUES (104, '4314102', TO_DATE('2026-09-01', 'YYYY-MM-DD'), 140.00, 19.5, 0);

INSERT INTO PREVISAO_CLIMATICA_REGIAO (ID_Previsao, Codigo_IBGE_Cidade, Mes_Ano, Volume_Chuva_Esperado_mm, Temperatura_Media_Prevista, Risco_Geada)
VALUES (105, '4314102', TO_DATE('2026-10-01', 'YYYY-MM-DD'), 160.00, 22.0, 0);


-- Sorriso/MT (Cenário de Seca em Junho e chuvas abundantes de Verão de Out a Jan)
INSERT INTO PREVISAO_CLIMATICA_REGIAO (ID_Previsao, Codigo_IBGE_Cidade, Mes_Ano, Volume_Chuva_Esperado_mm, Temperatura_Media_Prevista, Risco_Geada)
VALUES (201, '5107925', TO_DATE('2026-06-01', 'YYYY-MM-DD'), 5.00, 26.8, 0);

INSERT INTO PREVISAO_CLIMATICA_REGIAO (ID_Previsao, Codigo_IBGE_Cidade, Mes_Ano, Volume_Chuva_Esperado_mm, Temperatura_Media_Prevista, Risco_Geada)
VALUES (202, '5107925', TO_DATE('2026-10-01', 'YYYY-MM-DD'), 180.00, 28.2, 0);

INSERT INTO PREVISAO_CLIMATICA_REGIAO (ID_Previsao, Codigo_IBGE_Cidade, Mes_Ano, Volume_Chuva_Esperado_mm, Temperatura_Media_Prevista, Risco_Geada)
VALUES (203, '5107925', TO_DATE('2026-11-01', 'YYYY-MM-DD'), 210.00, 27.5, 0);

INSERT INTO PREVISAO_CLIMATICA_REGIAO (ID_Previsao, Codigo_IBGE_Cidade, Mes_Ano, Volume_Chuva_Esperado_mm, Temperatura_Media_Prevista, Risco_Geada)
VALUES (204, '5107925', TO_DATE('2026-12-01', 'YYYY-MM-DD'), 260.00, 26.5, 0);

INSERT INTO PREVISAO_CLIMATICA_REGIAO (ID_Previsao, Codigo_IBGE_Cidade, Mes_Ano, Volume_Chuva_Esperado_mm, Temperatura_Media_Prevista, Risco_Geada)
VALUES (205, '5107925', TO_DATE('2027-01-01', 'YYYY-MM-DD'), 290.00, 26.0, 0);


-- 5. AREA_PLANTIO
INSERT INTO AREA_PLANTIO (ID_Area, ID_Propriedade, Tamanho_Hectares, Tipo_Solo, Possui_Irrigacao, Ultima_Cultura_Plantada, Ph_Solo)
VALUES (501, 10, 15.50, 'ARGILOSO', 0, 3, 5.8);

INSERT INTO AREA_PLANTIO (ID_Area, ID_Propriedade, Tamanho_Hectares, Tipo_Solo, Possui_Irrigacao, Ultima_Cultura_Plantada, Ph_Solo)
VALUES (502, 20, 320.00, 'ARENOSO', 1, 2, 6.2);


-- 6. ANALISE_PREDITIVA (Histórico Base)
INSERT INTO ANALISE_PREDITIVA (ID_Analise, ID_Area, ID_Cultura, Data_Processamento, Melhor_Data_Inicio_Plantio, Data_Prevista_Colheita, Risco_Climatico_Calculado, Rendimento_Estimado_Sacas, Status_Analise)
VALUES (901, 501, 3, TO_TIMESTAMP_TZ('2026-05-15 14:30:00 -03:00', 'YYYY-MM-DD HH24:MI:SS TZH:TZM'), TO_DATE('2026-05-20', 'YYYY-MM-DD'), TO_DATE('2026-09-27', 'YYYY-MM-DD'), 'MEDIO', 650.00, 'PLANTADO');

INSERT INTO ANALISE_PREDITIVA (ID_Analise, ID_Area, ID_Cultura, Data_Processamento, Melhor_Data_Inicio_Plantio, Data_Prevista_Colheita, Risco_Climatico_Calculado, Rendimento_Estimado_Sacas, Status_Analise)
VALUES (902, 502, 1, TO_TIMESTAMP_TZ('2026-06-02 09:15:00 -03:00', 'YYYY-MM-DD HH24:MI:SS TZH:TZM'), TO_DATE('2026-10-05', 'YYYY-MM-DD'), TO_DATE('2027-02-02', 'YYYY-MM-DD'), 'BAIXO', 20800.00, 'AGUARDANDO');

COMMIT;