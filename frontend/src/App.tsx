import { useState } from "react";
import { Home } from "./Home";
import { Quartos } from "./Quartos";
import { Hospedes } from "./Hospedes";
import { Reservas } from "./Reservas";
import { Pagina } from "./types";

const itensNav: { id: Pagina; label: string }[] = [
    { id: "home", label: "Início" },
    { id: "quartos", label: "Quartos" },
    { id: "hospedes", label: "Hóspedes" },
    { id: "reservas", label: "Reservas" },
];

export default function App() {
    const [pagina, setPagina] = useState<Pagina>("home");

    return (
        <div className="min-h-screen">
            <header className="border-b border-ink/10 bg-white">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => setPagina("home")}
                        className="font-serif text-xl text-ink"
                    >
                        Synccheck
                    </button>

                    <nav className="flex gap-1">
                        {itensNav.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setPagina(item.id)}
                                className={`text-sm px-3 py-1.5 rounded-sm transition-colors ${
                                    pagina === item.id
                                        ? "bg-teal-light text-teal-dark font-medium"
                                        : "text-ink/60 hover:text-ink"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-10">
                {pagina === "home" && <Home onNavigate={setPagina} />}
                {pagina === "quartos" && <Quartos />}
                {pagina === "hospedes" && <Hospedes />}
                {pagina === "reservas" && <Reservas />}
            </main>
        </div>
    );
}
