const minhaLista = new LinkedList();

// Função para adicionar uma tarefa ordenada pela prioridade
function adicionarElementoOrdenado() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const prioridade = parseInt(document.getElementById("txtnovaPrioridade").value.trim(), 10);

    if (descricao && !isNaN(prioridade)) {
        const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());
        minhaLista.addInOrder(novaTarefa); // Adiciona a tarefa ordenada pela prioridade
        console.log(minhaLista.toString());
        document.getElementById("txtnovaTarefa").value = "";
        document.getElementById("txtnovaPrioridade").value = "";
        atualizarLista();
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

// Função para resolver a primeira tarefa (remover do início da lista)
function resolverTarefa() {
    if (!minhaLista.isEmpty()) {
        const tarefaRealizada = minhaLista.removeFirst();
        mostrarMensagemRemocao(tarefaRealizada);
        atualizarLista();
    } else {
        alert("Lista de Tarefas Vazia");
    }
}

// Função para carregar a tarefa mais antiga
function carregarTarefaMaisAntiga() {
    if (!minhaLista.isEmpty()) {
        let tarefaMaisAntiga = minhaLista.getFirst(); // Inicia com o primeiro item
        for (const tarefa of minhaLista) {
            if (comparaTarefasDataHora(tarefa, tarefaMaisAntiga) === tarefa) {
                tarefaMaisAntiga = tarefa;
            }
        }
        const mensagem = `Tarefa mais antiga: ${tarefaMaisAntiga.toString()}`;
        document.getElementById("mensagem-remocao").innerHTML = mensagem;
        document.getElementById("mensagem-remocao").style.display = "block";
    } else {
        alert("Lista de Tarefas Vazia");
    }
}

// Função para mostrar a mensagem de remoção
function mostrarMensagemRemocao(tarefaRealizada) {
    const mensagem = document.getElementById("mensagem-remocao");
    const dataConclusao = obterDataAtual();
    const horaConclusao = obterHoraAtual();
    const diferencaDias = calcularDiferencaDias(tarefaRealizada.data, dataConclusao);
    const diferencaHoras = calcularDiferencaHoras(tarefaRealizada.hora, horaConclusao);
    mensagem.innerHTML = `Tarefa realizada: ${tarefaRealizada.descricao}<br>Tempo para conclusão: ${diferencaDias} dias, ${diferencaHoras} horas`;
    mensagem.style.display = "block";
}

// Função para atualizar a exibição da lista
function atualizarLista() {
    const listaTarefas = document.getElementById("list_listadeTarefas");
    const lblTarefas = document.getElementById("lblmostraTarefas");
    listaTarefas.innerHTML = "";
    if (!minhaLista.isEmpty()) {
        lblTarefas.innerHTML = "Lista de Tarefas";
        for (const tarefa of minhaLista) {
            const novaLinha = document.createElement("li");
            novaLinha.innerHTML = tarefa.toString();
            listaTarefas.appendChild(novaLinha);
        }
    } else {
        lblTarefas.innerHTML = "Lista de Tarefas Vazia";
    }
}

// Função para salvar a lista no Local Storage
function saveLinkedListToLocalStorage() {
    console.log("saveLinkedListToLocalStorage");
    let listaParaSalvar = [];
    for (const item of minhaLista) {
        listaParaSalvar.push({
            _descricao: item.descricao,
            _prioridade: item.prioridade,
            _data: item.data,
            _hora: item.hora
        });
    }
    let jsonStr = JSON.stringify(listaParaSalvar);
    localStorage.setItem('myLinkedList', jsonStr);
    alert("Lista salva com sucesso!");
}

// Função para carregar a lista do Local Storage
function loadLinkedListFromLocalStorage() {
    console.log("loadLinkedListFromLocalStorage");
    let jsonStr = localStorage.getItem('myLinkedList');
    if (jsonStr) {
        let listaCarregada = JSON.parse(jsonStr);
        minhaLista.clear(); // Limpa a lista antes de carregar
        for (let i = 0; i < listaCarregada.length; i++) {
            let obj = listaCarregada[i];
            let novaTarefa = new Tarefa(obj._descricao, obj._prioridade, obj._data, obj._hora);
            minhaLista.addLast(novaTarefa);
        }
        atualizarLista();
        alert("Lista carregada com sucesso!");
    } else {
        alert("Nenhuma lista encontrada para carregar.");
    }
}

// Função para obter a data atual
function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1;
    let ano = dataAtual.getFullYear();
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}

// Função para obter a hora atual
function obterHoraAtual() {
    const data = new Date();
    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');
    const segundo = data.getSeconds().toString().padStart(2, '0');
    return `${hora}:${minuto}:${segundo}`;
}

// Função para calcular a diferença de horas
function calcularDiferencaHoras(hora1, hora2) {
    const [h1, m1, s1] = hora1.split(':').map(Number);
    const [h2, m2, s2] = hora2.split(':').map(Number);
    const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
    const horas = Math.floor(diferencaSegundos / 3600);
    const minutos = Math.floor((diferencaSegundos % 3600) / 60);
    const segundos = diferencaSegundos % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Função para calcular a diferença de dias
function calcularDiferencaDias(dataInicial, dataFinal) {
    const msPorDia = 24 * 60 * 60 * 1000;
    const [diaIni, mesIni, anoIni] = dataInicial.split('/').map(Number);
    const [diaFim, mesFim, anoFim] = dataFinal.split('/').map(Number);
    const dataIni = new Date(anoIni, mesIni - 1, diaIni);
    const dataFim = new Date(anoFim, mesFim - 1, diaFim);
    const diferencaMs = dataFim - dataIni;
    const diferencaDias = Math.floor(diferencaMs / msPorDia);
    return diferencaDias;
}

// Função para converter a data para o formato ISO 8601
function converterDataFormatoISO8601(data) {
    const partes = data.split('/');
    const dia = partes[0].padStart(2, '0');
    const mes = partes[1].padStart(2, '0');
    const ano = partes[2];
    return `${ano}-${mes}-${dia}`;
}

// Função para comparar tarefas por data e hora
function comparaTarefasDataHora(tarefa1, tarefa2) {
    const dataHoraTarefa1 = new Date(`${converterDataFormatoISO8601(tarefa1.data)}T${tarefa1.hora}`);
    const dataHoraTarefa2 = new Date(`${converterDataFormatoISO8601(tarefa2.data)}T${tarefa2.hora}`);
    return dataHoraTarefa1.getTime() < dataHoraTarefa2.getTime() ? tarefa1 : tarefa2;
}
