import { useEffect, useState } from "react";
import { api, Quarto, Hospede, Reserva } from "./api";
import { Erro } from "./Erro";

const estiloStatusReserva: Record<Reserva["status"], string> = {
    Reservado: "bg-ink/5 text-ink/70",
    "Em andamento": "bg-status-ocupado/10 text-status-ocupado",
    Finalizado: "bg-ink/5 text-ink/40",
};

export function Reservas() {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [quartos, setQuartos] = useState<Quarto[]>([]);
    const [hospedes, setHospedes] = useState<Hospede[]>([]);

    const [quartoId, setQuartoId] = useState("");
    const [hospedeId, setHospedeId] = useState("");
    const [dataCheckin, setDataCheckin] = useState("");
    const [erro, setErro] = useState("");

    function carregar() {
        api.listarReservas().then(setReservas);
        api.listarQuartos().then(setQuartos);
        api.listarHospedes().then(setHospedes);
    }

    useEffect(() => {
        carregar();
    }, []);

    async function criarReserva(e: React.FormEvent) {
        e.preventDefault();
        if (!quartoId || !hospedeId || !dataCheckin) return;

        setErro("");
        try {
            await api.criarReserva(Number(quartoId), Number(hospedeId), dataCheckin);
            setQuartoId("");
            setHospedeId("");
            setDataCheckin("");
            carregar();
        } catch (err: any) {
            setErro(err.message);
        }
    }

    async function fazerCheckin(id: number) {
        setErro("");
        try {
            await api.checkin(id);
            carregar();
        } catch (err: any) {
            setErro(err.message);
        }
    }

    async function fazerCheckout(id: number) {
        await api.checkout(id);
        carregar();
    }

    async function excluirReserva(id: number) {
        if (!confirm("Excluir essa reserva? Essa ação não pode ser desfeita.")) return;

        setErro("");
        try {
            await api.excluirReserva(id);
            carregar();
        } catch (err: any) {
            setErro(err.message);
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="font-serif text-3xl text-ink">Reservas</h2>
                <p className="text-ink/60 mt-1">Crie estadias e controle check-in e check-out.</p>
            </div>

            <form onSubmit={criarReserva} className="bg-white border border-ink/10 rounded-sm p-5 flex gap-3 flex-wrap items-end">
                <label className="flex-1 min-w-[160px]">
                    <span className="block text-xs text-ink/50 mb-1">Quarto</span>
                    <select
                        className="border border-ink/15 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-teal"
                        value={quartoId}
                        onChange={(e) => setQuartoId(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        {quartos.map((q) => (
                            <option key={q.id} value={q.id}>
                                Quarto {q.numero}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex-1 min-w-[160px]">
                    <span className="block text-xs text-ink/50 mb-1">Hóspede</span>
                    <select
                        className="border border-ink/15 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-teal"
                        value={hospedeId}
                        onChange={(e) => setHospedeId(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        {hospedes.map((h) => (
                            <option key={h.id} value={h.id}>
                                {h.nome}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="min-w-[160px]">
                    <span className="block text-xs text-ink/50 mb-1">Check-in</span>
                    <input
                        type="date"
                        className="border border-ink/15 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-teal"
                        value={dataCheckin}
                        onChange={(e) => setDataCheckin(e.target.value)}
                    />
                </label>

                <button className="bg-teal text-white px-5 py-2 rounded-sm hover:bg-teal-dark transition-colors" type="submit">
                    Reservar
                </button>
            </form>

            <Erro mensagem={erro} />

            <div className="bg-white border border-ink/10 rounded-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left border-b border-ink/10 text-ink/50">
                            <th className="py-3 px-4 font-normal">Quarto</th>
                            <th className="py-3 px-4 font-normal">Hóspede</th>
                            <th className="py-3 px-4 font-normal">Check-in</th>
                            <th className="py-3 px-4 font-normal">Status</th>
                            <th className="py-3 px-4 font-normal">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((r) => (
                            <tr key={r.id} className="border-b border-ink/5 last:border-0">
                                <td className="py-3 px-4">Quarto {r.quarto_numero}</td>
                                <td className="py-3 px-4">{r.hospede_nome}</td>
                                <td className="py-3 px-4 text-ink/70">{r.data_checkin}</td>
                                <td className="py-3 px-4">
                                    <span className={`text-xs px-2 py-1 rounded-sm ${estiloStatusReserva[r.status]}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 space-x-3">
                                    {r.status === "Reservado" && (
                                        <button onClick={() => fazerCheckin(r.id)} className="text-teal-dark hover:underline">
                                            Check-in
                                        </button>
                                    )}
                                    {r.status === "Em andamento" && (
                                        <button onClick={() => fazerCheckout(r.id)} className="text-teal-dark hover:underline">
                                            Check-out
                                        </button>
                                    )}
                                    <button
                                        onClick={() => excluirReserva(r.id)}
                                        className="text-ink/40 hover:text-status-pendente"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {reservas.length === 0 && (
                            <tr>
                                <td className="py-4 px-4 text-ink/50" colSpan={5}>
                                    Nenhuma reserva criada ainda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
