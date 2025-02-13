// Autor: Lucas Matheus Duarte

function formatarValor(event) {
    let valor = event.target.value.replace(/[^\d]/g, '');
    if (valor === '') {
        event.target.value = '';
        return;
    }
    valor = (Number(valor) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    event.target.value = valor;
}

function limparValor(event) {
    if (event.target.value === 'R$ 0,00' || event.target.value.trim() === '') {
        event.target.value = '';
    }
}

function restaurarValor(event) {
    if (event.target.value.trim() === '') {
        event.target.value = 'R$ 0,00';
    }
}

function converterValorParaNumero(valorFormatado) {
    return parseFloat(valorFormatado.replace("R$", "").replace(".", "").replace(",", "."));
}

function calcularPreco() {
    const tipoMovel = document.getElementById("tipo-movel").value;
    const valorMovel = converterValorParaNumero(document.getElementById("valor-movel").value);
    const qtdMoveis = parseInt(document.getElementById("qtd-moveis").value);
    const tempoHoras = parseInt(document.getElementById("horas").value) || 0;
    const tempoMinutos = parseInt(document.getElementById("minutos").value) || 0;
    const km = parseInt(document.getElementById("km").value);
    const necessitaInstalacao = document.querySelector('input[name="instalacao"]:checked').value;

    if (isNaN(valorMovel) || valorMovel <= 0) {
        alert("Por favor, insira um valor válido para o móvel.");
        return;
    }
    if (isNaN(qtdMoveis) || qtdMoveis <= 0 || isNaN(km) || km < 0) {
        alert("Por favor, preencha todos os campos corretamente com valores válidos.");
        return;
    }

    const tempoTotalHoras = tempoHoras + (tempoMinutos / 60);

    let precoPorHora;
    let percentual = 0;

    switch (tipoMovel) {
        case "guarda-roupa": precoPorHora = 70; break;
        case "cozinha": precoPorHora = 100; percentual = 5; break;
        case "painel-tv": precoPorHora = 60; percentual = 5; break;
        case "cama": precoPorHora = 50; break;
        case "closet": precoPorHora = 80; break;
        case "mesa": precoPorHora = 40; break;
        case "estante": precoPorHora = 60; break;
        case "escritorio": precoPorHora = 90; break;
        case "buffet": precoPorHora = 70; break;
        case "rack-tv": precoPorHora = 55; break;
        case "sofa": precoPorHora = 120; break;
        case "banheiro": precoPorHora = 50; break;
        default:
            alert("Tipo de móvel não reconhecido. Por favor, selecione um tipo válido.");
            return;
    }

    if (tipoMovel !== "cozinha" && tipoMovel !== "painel-tv") {
        if (valorMovel < 1000) {
            percentual = 18;
        } else if (valorMovel >= 1000 && valorMovel <= 2000) {
            percentual = 14;
        } else if (valorMovel > 2000 && valorMovel <= 3000) {
            percentual = 16;
        } else if (valorMovel > 3000) {
            percentual = 15;
        }
    }

    const precoPorHoraComPorcentagem = precoPorHora + (precoPorHora * (percentual / 100));
    let precoTotal = (precoPorHoraComPorcentagem * tempoTotalHoras * qtdMoveis) + (km * 1);

    if (necessitaInstalacao === "sim") {
        precoTotal += 50;
    }

    document.getElementById("preco-total").textContent = precoTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}
