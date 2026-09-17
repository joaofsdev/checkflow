import { useEffect, useState } from "react";
import { api, Quarto } from "./api";
import { Erro } from "./Erro";

const estiloStatus: Record<Quarto["status"], string> = {
    Livre: "bg-status-livre/10 text-status-livre",
    Ocupado: "bg-status-ocupado/10 text-status-ocupado",
    "Limpeza Pendente": "bg-status-pendente/10 text-status-pendente",
};

export function Quartos() {
    const [quartos, setQuartos] = useState<Quarto[]>([]);
    const [numero, setNumero] = useState("");
    const [tipo, setTipo] = useState("");
    const [erro, setErro] = useState("");

    function carregar() {
        api.listarQuartos().then(setQuartos);
    }

    useEffect(() => {
        carregar();
    }, []);

    async function adicionarQuarto(e: React.FormEvent) {
        e.preventDefault();
        if (!numero || !tipo) return;

        setErro("");
        try {
            await api.criarQuarto(numero, tipo);
            setNumero("");
            setTipo("");
            carregar();
        } catch (err: any) {
            setErro(err.message);
        }
    }

    async function finalizarLimpeza(id: number) {
        await api.finalizarLimpeza(id);
        carregar();
    }

    async function excluirQuarto(id: number, numero: string) {
        if (!confirm(`Excluir o quarto ${numero}? Essa ação não pode ser desfeita.`)) return;

        setErro("");
        try {
            await api.excluirQuarto(id);
            carregar();
        } catch (err: any) {
            setErro(err.message);
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="font-serif text-3xl text-ink">Quartos</h2>
                <p className="text-ink/60 mt-1">Cadastre quartos e acompanhe o status de cada um.</p>
            </div>

            <form onSubmit={adicionarQuarto} className="bg-white border border-ink/10 rounded-sm p-5 flex gap-3 flex-wrap items-end">
                <label className="flex-1 min-w-[160px]">
                    <span className="block text-xs text-ink/50 mb-1">Número</span>
                    <input
                        className="border border-ink/15 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-teal"
                        placeholder="Ex: 12"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />
                </label>
                <label className="flex-1 min-w-[160px]">
                    <span className="block text-xs text-ink/50 mb-1">Tipo</span>
                    <input
                        className="border border-ink/15 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-teal"
                        placeholder="Ex: Casal com varanda"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    />
                </label>
                <button className="bg-teal text-white px-5 py-2 rounded-sm hover:bg-teal-dark transition-colors" type="submit">
                    Adicionar quarto
                </button>
            </form>

            <Erro mensagem={erro} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {quartos.map((q) => (
                    <div key={q.id} className="bg-white border border-ink/10 rounded-sm p-5">
                        <div className="flex justify-between items-start">
                            <span className="font-serif text-lg">Quarto {q.numero}</span>
                            <span className={`text-xs px-2 py-1 rounded-sm ${estiloStatus[q.status]}`}>
                                {q.status}
                            </span>
                        </div>
                        <p className="text-sm text-ink/60 mt-1">{q.tipo}</p>

                        <div className="mt-4 flex gap-4">
                            {q.status === "Limpeza Pendente" && (
                                <button
                                    onClick={() => finalizarLimpeza(q.id)}
                                    className="text-sm text-teal-dark hover:underline"
                                >
                                    Marcar limpeza como concluída
                                </button>
                            )}
                            <button
                                onClick={() => excluirQuarto(q.id, q.numero)}
                                className="text-sm text-ink/40 hover:text-status-pendente"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}

                {quartos.length === 0 && (
                    <p className="text-sm text-ink/50 col-span-full">Nenhum quarto cadastrado ainda.</p>
                )}
            </div>
        </div>
    );
}
