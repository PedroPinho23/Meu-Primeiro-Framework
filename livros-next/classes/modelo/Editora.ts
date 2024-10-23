class Editora {
    codEditora: number;
    nome: string;

    constructor(codEditora: number, nome: string) {
        this.codEditora = codEditora;
        this.nome = nome;
    }
}

const editoras = [
    new Editora(1, 'Editora A'),
    new Editora(2, 'Editora B'),
];

export default Editora;
export { editoras }; 
