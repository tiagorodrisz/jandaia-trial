type Licenca = {
  id: number;
  tipo: string;
  status: string;
  cliente_id: number;
};

async function getLicencas(): Promise<Licenca[]> {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${base}/licencas/`, {cache: 'no-store'});
  if (!res.ok) throw new Error("Falha ao carregar licenças");
  return res.json();
}

export default async function LicencasPage() {
  const licencas = await getLicencas();

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", color: "#333", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: 16 }}>Área de Licenças</h1>

      <table style={{ borderCollapse: "collapse", width: "100%", backgroundColor: "#fff", boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}>
        <thead style={{ backgroundColor: "#0070f3", color: "#fff" }}>
          <tr>
            <th style={{border: "1px solid black", padding: "8px"}}>ID</th>
            <th style={{border: "1px solid black", padding: "8px"}}>Tipo</th>
            <th style={{border: "1px solid black", padding: "8px"}}>Status</th>
            <th style={{border: "1px solid black", padding: "8px"}}>Cliente ID</th>
          </tr>
        </thead>
        <tbody>
          {licencas.map(l => (
            <tr key={l.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{border: "1px solid black", padding: "8px" }}>{l.id}</td>
              <td style={{border: "1px solid black", padding: "8px" }}>{l.tipo}</td>
              <td style={{border: "1px solid black", padding: "8px", color: l.status === "Pendente" ? "orange" : "green" }}>{l.status}</td>
              <td style={{border: "1px solid black", padding: "8px" }}>{l.cliente_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

