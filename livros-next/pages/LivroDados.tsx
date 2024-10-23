import React, { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Menu } from '../componentes/Menu';
import { editoras } from '../classes/controle/ControleEditora';

const baseURL = "http://localhost:3000/api/livros";

const LivroDados: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(0);
    const router = useRouter();

    const incluirLivro = async (e: React.FormEvent) => {
        e.preventDefault();
        const livro = { titulo, resumo, autores: autores.split('\n'), codEditora };
        await fetch(baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro),
        });
        router.push('/LivroLista');
    };

    return (
        <div className="container mt-4">
            <Menu /> 
            <h1>Incluir Livro</h1>
            <form onSubmit={incluirLivro}>
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                        placeholder="Título"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="resumo" className="form-label">Resumo</label>
                    <textarea
                        className="form-control"
                        id="resumo"
                        value={resumo}
                        onChange={e => setResumo(e.target.value)}
                        placeholder="Resumo"
                        rows={3}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="autores" className="form-label">Autores (um por linha)</label>
                    <textarea
                        className="form-control"
                        id="autores"
                        value={autores}
                        onChange={e => setAutores(e.target.value)}
                        placeholder="Autores"
                        rows={3}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="codEditora" className="form-label">Editora</label>
                    <select
                        className="form-select"
                        id="codEditora"
                        value={codEditora}
                        onChange={e => setCodEditora(Number(e.target.value))}
                        required
                    >
                        <option value={0}>Selecione uma editora</option>
                        {editoras.map(editora => (
                            <option key={editora.codEditora} value={editora.codEditora}>
                                {editora.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Incluir Livro</button>
            </form>
        </div>
    );
};

export default LivroDados;