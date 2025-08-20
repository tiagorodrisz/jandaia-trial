"use client";

type Cliente = {
  id: number;
  nome: string;
  cnpj: string;
  ativo: boolean;
};

type Props = {
  clientes: Cliente[];
};

export default function ClientesTable({ clientes }: Props) {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%", backgroundColor: "#fff", boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}>
      <thead style={{ backgroundColor: "#0070f3", color: "#fff" }}>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Nome</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>CNPJ</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Ativo</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map(c => (
          <tr key={c.id}>
            <td style={{ border: "1px solid black", padding: "8px" }}>{c.id}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{c.nome}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{c.cnpj}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>{c.ativo ? "Sim" : "Não"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
