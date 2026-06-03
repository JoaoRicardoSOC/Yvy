-- ============================================================================
-- SCRIPT DE CONSULTAS CRÍTICAS (YVY - AGTECH)
-- ============================================================================

-- Query 1: O Raio-X da Propriedade (Onde vou plantar?)
SELECT 
    pr.ID_Produtor,
    pr.Nome AS Produtor_Nome,
    pr.Email AS Produtor_Email,
    prop.ID_Propriedade,
    prop.Nome_Propriedade,
    prop.Estado,
    ap.ID_Area,
    ap.Tamanho_Hectares,
    ap.Tipo_Solo,
    ap.Possui_Irrigacao
FROM PRODUTOR pr
INNER JOIN PROPRIEDADE prop ON pr.ID_Produtor = prop.ID_Produtor
LEFT JOIN AREA_PLANTIO ap ON prop.ID_Propriedade = ap.ID_Propriedade
ORDER BY pr.Nome, prop.Nome_Propriedade, ap.ID_Area;


-- Query 2: O Motor Climático (Vai chover?)
SELECT 
    p.ID_Propriedade,
    p.Nome_Propriedade,
    p.Codigo_IBGE_Cidade,
    p.Estado,
    pc.ID_Previsao,
    pc.Mes_Ano,
    pc.Volume_Chuva_Esperado_mm,
    pc.Temperatura_Media_Prevista,
    pc.Risco_Geada
FROM PROPRIEDADE p
INNER JOIN PREVISAO_CLIMATICA_REGIAO pc ON p.Codigo_IBGE_Cidade = pc.Codigo_IBGE_Cidade
WHERE p.ID_Propriedade = :id_propriedade_param
ORDER BY pc.Mes_Ano ASC;


-- Query 3: A Validação da Semente (O que ela precisa?)
SELECT 
    c.ID_Cultura,
    c.Nome AS Cultura_Nome,
    c.Tempo_Ciclo_Dias,
    c.Necessidade_Hidrica_mm,
    c.Temperatura_Ideal_Min,
    c.Temperatura_Ideal_Max,
    c.Rendimento_Base_Sacas_Hectare
FROM CULTURA c
WHERE UPPER(c.Nome) = UPPER('Soja');


-- Query 4: O Histórico do Produtor (O Dashboard)
SELECT 
    pr.ID_Produtor,
    pr.Nome AS Produtor_Nome,
    prop.Nome_Propriedade,
    ap.ID_Area AS Numero_Talhao,
    c.Nome AS Cultura_Analisada,
    an.ID_Analise,
    an.Data_Processamento,
    an.Melhor_Data_Inicio_Plantio,
    an.Data_Prevista_Colheita,
    an.Risco_Climatico_Calculado,
    an.Rendimento_Estimado_Sacas,
    an.Status_Analise
FROM PRODUTOR pr
INNER JOIN PROPRIEDADE prop ON pr.ID_Produtor = prop.ID_Produtor
INNER JOIN AREA_PLANTIO ap   ON prop.ID_Propriedade = ap.ID_Propriedade
INNER JOIN ANALISE_PREDITIVA an ON ap.ID_Area = an.ID_Area
INNER JOIN CULTURA c         ON an.ID_Cultura = c.ID_Cultura
WHERE pr.ID_Produtor = :id_produtor_dashboard
ORDER BY an.Data_Processamento DESC;