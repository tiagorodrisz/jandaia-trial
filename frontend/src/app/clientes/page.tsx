"use client";
import { useEffect, useState } from "react";
import ClienteForm from "./ClienteForm";
import ClientesTable from "./ClientesTable";

type Cliente = {
  id: number;
  nome: string;
  cnpj: string;
  ativo: boolean;
};

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

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

  const adicionarCliente = (novoCliente: Cliente) => {
    setClientes([...clientes, novoCliente]);
  };

  if (loading) return <p>Carregando clientes...</p>;

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", color: "#000", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 16 }}>Área de Clientes</h1>
      <ClienteForm onClienteCriado={adicionarCliente} />
      <ClientesTable clientes={clientes} />
    </div>
  );
}
