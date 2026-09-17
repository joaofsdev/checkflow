import { useEffect, useState } from "react";
import { api, Quarto, Hospede, Reserva } from "./api";
import { IconCama, IconHospede, IconReserva } from "./icons";
import { Pagina } from "./types";

export function Home({ onNavigate }: { onNavigate: (p: Pagina) => void }) {
    const [quartos, setQuartos] = useState<Quarto[]>([]);
    const [hospedes, setHospedes] = useState<Hospede[]>([]);
    const [reservas, setReservas] = useState<Reserva[]>([]);

    useEffect(() => {
        api.listarQuartos().then(setQuartos);
        api.listarHospedes().then(setHospedes);
        api.listarReservas().then(setReservas);
    }, []);

    const livres = quartos.filter((q) => q.status === "Livre").length;
    const ocupados = quartos.filter((q) => q.status === "Ocupado").length;
    const pendentes = quartos.filter((q) => q.status === "Limpeza Pendente").length;
    const emAndamento = reservas.filter((r) => r.status === "Em andamento").length;

    return (
        <div className="space-y-10">
            <div>
                <h2 className="font-serif text-3xl text-ink">Painel da pousada</h2>
                <p className="text-ink/60 mt-1">
                    Acompanhe o status dos quartos e gerencie hóspedes e reservas.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                    onClick={() => onNavigate("quartos")}
                    className="text-left bg-white border border-ink/10 border-l-4 border-l-teal rounded-sm p-5 hover:border-l-teal-dark transition-colors"
                >
                    <IconCama className="w-6 h-6 text-teal" />
                    <h3 className="font-serif text-lg mt-3">Quartos</h3>
                    <p className="text-sm text-ink/60 mt-1">
                        Cadastro e controle de status de cada quarto.
                    </p>
                    <p className="text-sm text-ink/80 mt-4">
                        {livres} livre{livres !== 1 && "s"} · {ocupados} ocupado{ocupados !== 1 && "s"} ·{" "}
                        {pendentes} limpeza pendente
                    </p>
                </button>

                <button
                    onClick={() => onNavigate("hospedes")}
                    className="text-left bg-white border border-ink/10 border-l-4 border-l-clay rounded-sm p-5 hover:border-l-clay transition-colors"
                >
                    <IconHospede className="w-6 h-6 text-clay" />
                    <h3 className="font-serif text-lg mt-3">Hóspedes</h3>
                    <p className="text-sm text-ink/60 mt-1">Cadastro de quem se hospeda na pousada.</p>
                    <p className="text-sm text-ink/80 mt-4">{hospedes.length} cadastrados</p>
                </button>

                <button
                    onClick={() => onNavigate("reservas")}
                    className="text-left bg-white border border-ink/10 border-l-4 border-l-ink rounded-sm p-5 hover:border-l-ink transition-colors"
                >
                    <IconReserva className="w-6 h-6 text-ink" />
                    <h3 className="font-serif text-lg mt-3">Reservas</h3>
                    <p className="text-sm text-ink/60 mt-1">Check-in, check-out e estadias.</p>
                    <p className="text-sm text-ink/80 mt-4">
                        {reservas.length} no total · {emAndamento} em andamento
                    </p>
                </button>
            </div>
        </div>
    );
}
