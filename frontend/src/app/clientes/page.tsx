"use client";
import {useEffect, useState} from "react";

type Cliente = {
    id: number;
    nome: string;
    cnpj: string;
    ativo: boolean;
};

export default function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/clientes/")
            .then(res => res.json())
            .then(data => {
                setClientes(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar clientes:", err);
                setLoading(false);
            });
    }, []);

    const criarCliente = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const res = await fetch("http://localhost:8000/clientes/", {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({nome, cnpj, ativo: true}),
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert("Erro: " + errorData.detail);
                return;
            }
            
            const novoCliente = await res.json();
            setClientes([...clientes, novoCliente]);
            setNome("");
            setCnpj("");
        } catch (err) {
            console.error("Erro ao criar cliente:", err);
        }
    };

    if (loading) return <p>Carregando clientes...</p>;

    return (
        <div style={{ padding: 24, fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", color: "#333", minHeight: "100vh" }}>
            <h1 style={{ marginBottom: 16 }}>Área de Clientes</h1>

            <form onSubmit={criarCliente} style={{ marginBottom: 24, display: "flex", gap: 8, alignItems: "center" }}>
                <input 
                    type="text" 
                    placeholder="Nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", flex: 1 }}
                />
                <input 
                    type="text" 
                    placeholder="CNPJ"
                    value={cnpj}
                    onChange={e => setCnpj(e.target.value)}
                    required
                    style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc", flex: 1 }}
                />
                <button type="submit" style={{ padding: "8px 16px", borderRadius: 4, border: "none", backgroundColor: "#0070f3", color: "white", cursor: "pointer" }}>Cadastrar Cliente</button>
            </form>

            <table style={{ borderCollapse: "collapse", width: "100%", backgroundColor: "#fff", boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}>
                <thead style={{ backgroundColor: "#0070f3", color: "#fff" }}>
                    <tr>
                        <th style={{border: "1px solid black", padding: "8px"}}>ID</th>
                        <th style={{border: "1px solid black", padding: "8px"}}>Nome</th>
                        <th style={{border: "1px solid black", padding: "8px"}}>CNPJ</th>
                        <th style={{border: "1px solid black", padding: "8px"}}>Ativo</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(c => (
                        <tr key={c.id}>
                            <td style={{border: "1px solid black", padding: "8px"}}>{c.id}</td>
                            <td style={{border: "1px solid black", padding: "8px"}}>{c.nome}</td>
                            <td style={{border: "1px solid black", padding: "8px"}}>{c.cnpj}</td>
                            <td style={{border: "1px solid black", padding: "8px"}}>{c.ativo ? "Sim" : "Não"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    );
}