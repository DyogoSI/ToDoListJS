class No {
    constructor(novoDado) {
        this.dado = novoDado;
        this.ant = null;
        this.prox = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    addFirst(novoDado) {
        console.log("addFirst");
        const novoNo = new No(novoDado);
        if (novoNo === null)
            return false;
        if (this.head === null) // Lista vazia
            this.tail = novoNo;
        else {
            novoNo.prox = this.head;
            this.head.ant = novoNo;
        }
        this.head = novoNo;
        this.length++;
        return true;
    }

    addLast(novoDado) {
        const novoNo = new No(novoDado);
        if (novoNo === null)
            return false;

        if (this.head === null) // Lista vazia
            this.head = novoNo;
        else {
            novoNo.ant = this.tail;
            this.tail.prox = novoNo;
        }
        this.tail = novoNo;
        this.length++;
        return true;
    }

    removeFirst() {
        if (this.isEmpty()) return null;

        const dadoRemovido = this.head.dado;
        this.head = this.head.prox;
        if (this.head !== null)
            this.head.ant = null;
        else
            this.tail = null;
        this.length--;
        return dadoRemovido;
    }

    removeLast() {
        if (this.isEmpty()) return null;

        const dadoRemovido = this.tail.dado;
        this.tail = this.tail.ant;
        if (this.tail !== null)
            this.tail.prox = null;
        else
            this.head = null;
        this.length--;
        return dadoRemovido;
    }

    getLast() {
        return this.tail ? this.tail.dado : null;
    }

    getFirst() {
        return this.head ? this.head.dado : null;
    }

    isEmpty() {
        return this.head === null;
    }

    [Symbol.iterator]() {
        let currentNode = this.head;
        return {
            next: function() {
                if (currentNode !== null) {
                    let value = currentNode.dado;
                    currentNode = currentNode.prox;
                    return { value: value, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

    toString() {
        let result = "";
        let currentNode = this.head;
        while (currentNode !== null) {
            result += currentNode.dado + (currentNode.prox ? " -> " : "");
            currentNode = currentNode.prox;
        }
        return result;
    }

    addAtIndex(index, data) {
        console.log("Index:" + index);
        if (index < 0) {
            console.log("Indice invalido. O indice deve ser um valor inteiro maior ou igual a zero.");
            return false;
        }

        if (index === 0) {
            console.log("Adicionando no inicio");
            return this.addFirst(data);
        }

        if (index >= this.length)
            return this.addLast(data);

        const novoNo = new No(data);
        console.log("Novo no" + novoNo);
        if (novoNo === null)
            return false;

        let noAtual = this.head;
        let indiceAtual = 0;
        while (indiceAtual < index - 1) {
            noAtual = noAtual.prox;
            indiceAtual++;
        }
        novoNo.ant = noAtual;
        novoNo.prox = noAtual.prox;
        noAtual.prox.ant = novoNo;
        noAtual.prox = novoNo;
        this.length++;
        return true;
    }

    addInOrder(novoDado) {
        if (this.head === null || novoDado.prioridade < this.head.dado.prioridade) {
            // Inserir no início
            return this.addFirst(novoDado);
        }

        let current = this.head;
        while (current.prox !== null && current.prox.dado.prioridade <= novoDado.prioridade) {
            current = current.prox;
        }

        // Inserir entre current e current.prox
        const novoNo = new No(novoDado);
        novoNo.prox = current.prox;
        if (current.prox !== null) {
            current.prox.ant = novoNo;
        } else {
            this.tail = novoNo;
        }
        current.prox = novoNo;
        novoNo.ant = current;
        this.length++;
        return true;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}
