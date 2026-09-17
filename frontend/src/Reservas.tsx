import { useEffect, useState } from "react";
import { api, Quarto, Hospede, Reserva } from "./api";
import { Erro } from "./Erro";
import { Sucesso } from "./Sucesso";

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
    const [sucesso, setSucesso] = useState("");
    const [processando, setProcessando] = useState(false);
    const [carregando, setCarregando] = useState(true);

    function carregar() {
        setCarregando(true);
        Promise.all([api.listarReservas(), api.listarQuartos(), api.listarHospedes()])
            .then(([listaReservas, listaQuartos, listaHospedes]) => {
                setReservas(listaReservas);
                setQuartos(listaQuartos);
                setHospedes(listaHospedes);
            })
            .catch((err: Error) => setErro(err.message))
            .finally(() => setCarregando(false));
    }

    useEffect(() => {
        carregar();
    }, []);

    async function criarReserva(e: React.FormEvent) {
        e.preventDefault();
        if (!quartoId || !hospedeId || !dataCheckin) return;

        setErro("");
        setSucesso("");
        setProcessando(true);
        try {
            await api.criarReserva(Number(quartoId), Number(hospedeId), dataCheckin);
            setQuartoId("");
            setHospedeId("");
            setDataCheckin("");
            setSucesso("Reserva criada com sucesso.");
            carregar();
        } catch (err: any) {
            setErro(err.message);
        } finally {
            setProcessando(false);
        }
    }

    async function fazerCheckin(id: number) {
        setErro("");
        setSucesso("");
        setProcessando(true);
        try {
            await api.checkin(id);
            setSucesso("Check-in realizado com sucesso.");
            carregar();
        } catch (err: any) {
            setErro(err.message);
        } finally {
            setProcessando(false);
        }
    }

    async function fazerCheckout(id: number) {
        setErro(""); setSucesso(""); setProcessando(true);
        try {
            await api.checkout(id);
            setSucesso("Check-out realizado com sucesso.");
            carregar();
        } catch (err: any) { setErro(err.message); } finally { setProcessando(false); }
    }

    async function excluirReserva(id: number) {
        if (!confirm("Excluir essa reserva? Essa ação não pode ser desfeita.")) return;

        setErro("");
        setSucesso("");
        setProcessando(true);
        try {
            await api.excluirReserva(id);
            setSucesso("Reserva excluída com sucesso.");
            carregar();
        } catch (err: any) {
            setErro(err.message);
        } finally {
            setProcessando(false);
        }
    }

    function formatarData(data: string) {
        const [ano, mes, dia] = data.slice(0, 10).split("-");
        return ano && mes && dia ? `${dia}/${mes}/${ano}` : data;
    }

    const reservasOrdenadas = [...reservas].sort((a, b) => b.data_checkin.localeCompare(a.data_checkin));
    const quartosOrdenados = [...quartos].sort((a, b) => a.numero.localeCompare(b.numero, "pt-BR", { numeric: true }));
    const hospedesOrdenados = [...hospedes].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

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
                        {quartosOrdenados.map((q) => (
                            <option key={q.id} value={q.id}>
                                Quarto {q.numero} — {q.tipo} — {q.status}
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
                        {hospedesOrdenados.map((h) => (
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

                <button disabled={processando} className="bg-teal text-white px-5 py-2 rounded-sm hover:bg-teal-dark transition-colors disabled:opacity-50" type="submit">
                    {processando ? "Processando..." : "Reservar"}
                </button>
            </form>

            <Erro mensagem={erro} />
            <Sucesso mensagem={sucesso} />

            <div className="bg-white border border-ink/10 rounded-sm overflow-x-auto">
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
                        {reservasOrdenadas.map((r) => (
                            <tr key={r.id} className="border-b border-ink/5 last:border-0">
                                <td className="py-3 px-4">Quarto {r.quarto_numero}</td>
                                <td className="py-3 px-4">{r.hospede_nome}</td>
                                <td className="py-3 px-4 text-ink/70 whitespace-nowrap">{formatarData(r.data_checkin)}</td>
                                <td className="py-3 px-4">
                                    <span className={`text-xs px-2 py-1 rounded-sm ${estiloStatusReserva[r.status]}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 space-x-3">
                                    {r.status === "Reservado" && (
                                        <button disabled={processando} onClick={() => fazerCheckin(r.id)} className="text-teal-dark hover:underline disabled:opacity-50">
                                            Check-in
                                        </button>
                                    )}
                                    {r.status === "Em andamento" && (
                                        <button disabled={processando} onClick={() => fazerCheckout(r.id)} className="text-teal-dark hover:underline disabled:opacity-50">
                                            Check-out
                                        </button>
                                    )}
                                    <button
                                        onClick={() => excluirReserva(r.id)}
                                        disabled={processando}
                                        className="text-ink/40 hover:text-status-pendente"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {!carregando && reservas.length === 0 && (
                            <tr>
                                <td className="py-4 px-4 text-ink/50" colSpan={5}>
                                    Nenhuma reserva criada ainda.
                                </td>
                            </tr>
                        )}
                        {carregando && <tr><td className="py-4 px-4 text-ink/50" colSpan={5}>Carregando reservas...</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
