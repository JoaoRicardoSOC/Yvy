export class Produtor {
  constructor(id, nome, email, senha, tipoPerfil) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.tipoPerfil = tipoPerfil;
  }
}

export class Fazenda {
  constructor(id, nome, codigoIbge, tamanhoTotalHectares, talhoes = []) {
    this.id = id;
    this.nome = nome;
    this.codigoIbge = codigoIbge;
    this.tamanhoTotalHectares = tamanhoTotalHectares;
    this.talhoes = talhoes;
  }
}

export class Talhao {
  constructor(id, nome, tamanhoHectares, tipoSolo, possuiIrrigacao, status = 'VAZIO', dadosPlantioAtual = null) {
    if (tamanhoHectares <= 0) {
      throw new Error("O tamanho em hectares deve ser maior que zero.");
    }
    this.id = id;
    this.nome = nome;
    this.tamanhoHectares = tamanhoHectares;
    this.tipoSolo = tipoSolo;
    this.possuiIrrigacao = possuiIrrigacao;
    this.status = status; // 'VAZIO' ou 'PLANTADO'
    this.dadosPlantioAtual = dadosPlantioAtual; // { cultura, dataPlantio }
  }
}

export class Simulacao {
  constructor(id, tipoCenario, cultura, janelaIdealPlantio, previsaoColheita, estimativaRendimento, unidadeMedida, nivelRisco, alertasClimaticos = []) {
    this.id = id;
    this.tipoCenario = tipoCenario; // 'NOVO_PLANTIO' ou 'SAFRA_EM_ANDAMENTO'
    this.cultura = cultura;
    this.janelaIdealPlantio = janelaIdealPlantio;
    this.previsaoColheita = previsaoColheita;
    this.estimativaRendimento = estimativaRendimento;
    this.unidadeMedida = unidadeMedida; // 'Sacas' ou 'Toneladas'
    this.nivelRisco = nivelRisco; // 'BAIXO', 'MEDIO', 'ALTO'
    this.alertasClimaticos = alertasClimaticos;
  }
}

export class Cultura {
  constructor(id, nome, tempoCicloDias, necessidadeHidricaMm, rendimentoBaseHectare, temperaturaIdealMin, temperaturaIdealMax) {
    this.id = id;
    this.nome = nome;
    this.tempoCicloDias = tempoCicloDias;
    this.necessidadeHidricaMm = necessidadeHidricaMm;
    this.rendimentoBaseHectare = rendimentoBaseHectare; // Sacas ou Toneladas
    this.temperaturaIdealMin = temperaturaIdealMin;
    this.temperaturaIdealMax = temperaturaIdealMax;
  }
}

export class PrevisaoClimatica {
  constructor(id, codigoIbgeCidade, mesAno, volumeChuvaMm, temperaturaMedia) {
    this.id = id;
    this.codigoIbgeCidade = codigoIbgeCidade;
    this.mesAno = mesAno;
    this.volumeChuvaMm = volumeChuvaMm;
    this.temperaturaMedia = temperaturaMedia;
  }
}
