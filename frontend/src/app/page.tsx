import Link from 'next/link';

export default function Home() {
    return (
        <main style={{padding: 24, fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", color: "#333", minHeight: "100vh" }}>
            <ul>
                <li><Link href="/clientes">Área do Cliente (demo)</Link></li>
                <li><Link href="/licencas">Licenças</Link></li>
            </ul>
        </main>
    );
}
