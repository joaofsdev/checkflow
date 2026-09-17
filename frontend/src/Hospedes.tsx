import { useEffect, useState } from "react";
import { api, Hospede } from "./api";
import { Erro } from "./Erro";

export function Hospedes() {
    const [hospedes, setHospedes] = useState<Hospede[]>([]);
    const [nome, setNome] = useState("");
    const [documento, setDocumento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [erro, setErro] = useState("");

    function carregar() {
        api.listarHospedes().then(setHospedes);
    }

    useEffect(() => {
        carregar();
    }, []);

    async function adicionarHospede(e: React.FormEvent) {
        e.preventDefault();
        if (!nome || !documento) return;

        setErro("");
        try {
            await api.criarHospede(nome, documento, telefone);
            setNome("");
            setDocumento("");
            setTelefone("");
            carregar();
        } catch (err: any) {
            setErro(err.message);
        }
    }

    async function excluirHospede(id: number, nome: string) {
        if (!confirm(`Excluir o hóspede ${nome}? Essa ação não pode ser desfeita.`)) return;

        setErro("");
        try {
            await api.excluirHospede(id);
            carregar();
        } catch (err: any) {
            setErro(err.message);
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="font-serif text-3xl text-ink">Hóspedes</h2>
                <p className="text-ink/60 mt-1">Cadastro de quem se hospeda na pousada.</p>
            </div>

            <form onSubmit={adicionarHospede} className="bg-white border border-ink/10 rounded-sm p-5 flex gap-3 flex-wrap items-end">
                <label className="flex-1 min-w-[160px]">
                    <span className="block text-xs text-ink/50 mb-1">Nome</span>
                    <input
                        className="border border-ink/15 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-teal"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </label>
                <label className="flex-1 min-w-[160px]">
                    <span className="block text-xs text-ink/50 mb-1">Documento</span>
                    <input
                        className="border border-ink/15 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-teal"
                        placeholder="CPF ou RG"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                    />
                </label>
                <label className="flex-1 min-w-[160px]">
                    <span className="block text-xs text-ink/50 mb-1">Telefone</span>
                    <input
                        className="border border-ink/15 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-teal"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </label>
                <button className="bg-teal text-white px-5 py-2 rounded-sm hover:bg-teal-dark transition-colors" type="submit">
                    Adicionar hóspede
                </button>
            </form>

            <Erro mensagem={erro} />

            <div className="bg-white border border-ink/10 rounded-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left border-b border-ink/10 text-ink/50">
                            <th className="py-3 px-4 font-normal">Nome</th>
                            <th className="py-3 px-4 font-normal">Documento</th>
                            <th className="py-3 px-4 font-normal">Telefone</th>
                            <th className="py-3 px-4 font-normal"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospedes.map((h) => (
                            <tr key={h.id} className="border-b border-ink/5 last:border-0">
                                <td className="py-3 px-4">{h.nome}</td>
                                <td className="py-3 px-4 text-ink/70">{h.documento}</td>
                                <td className="py-3 px-4 text-ink/70">{h.telefone}</td>
                                <td className="py-3 px-4 text-right">
                                    <button
                                        onClick={() => excluirHospede(h.id, h.nome)}
                                        className="text-sm text-ink/40 hover:text-status-pendente"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {hospedes.length === 0 && (
                            <tr>
                                <td className="py-4 px-4 text-ink/50" colSpan={4}>
                                    Nenhum hóspede cadastrado ainda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
