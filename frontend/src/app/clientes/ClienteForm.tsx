"use client";
import { useState } from "react";

type Cliente = {
  id: number;
  nome: string;
  cnpj: string;
  ativo: boolean;
};

type Props = {
  onClienteCriado: (cliente: Cliente) => void;
};

export default function ClienteForm({ onClienteCriado }: Props) {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");

  const criarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/clientes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, cnpj, ativo: true }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Erro: " + errorData.detail);
        return;
      }

      const novoCliente = await res.json();
      onClienteCriado(novoCliente);
      setNome("");
      setCnpj("");
    } catch (err) {
      console.error("Erro ao criar cliente:", err);
    }
  };

  return (
    <form onSubmit={criarCliente} style={{ marginBottom: 24, display: "flex", gap: 8, alignItems: "center" }}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
        style={{ padding: 8, borderRadius: 4, border: "1px solid #000000", flex: 1 }}
      />
      <input
        type="text"
        placeholder="CNPJ"
        value={cnpj}
        onChange={e => setCnpj(e.target.value)}
        required
        style={{ padding: 8, borderRadius: 4, border: "1px solid #000000", flex: 1 }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          borderRadius: 4,
          border: "none",
          backgroundColor: "#0070f3",
          color: "white",
          cursor: "pointer",
        }}
      >
        Cadastrar Cliente
      </button>
    </form>
  );
}
