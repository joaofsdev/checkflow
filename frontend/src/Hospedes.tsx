import { useEffect, useState } from "react";
import { api, Hospede } from "./api";
import { Erro } from "./Erro";
import { Sucesso } from "./Sucesso";

export function Hospedes() {
    const [hospedes, setHospedes] = useState<Hospede[]>([]);
    const [nome, setNome] = useState("");
    const [documento, setDocumento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [busca, setBusca] = useState("");
    const [processando, setProcessando] = useState(false);
    const [carregando, setCarregando] = useState(true);

    function carregar() {
        setCarregando(true);
        api.listarHospedes().then(setHospedes).catch((err: Error) => setErro(err.message)).finally(() => setCarregando(false));
    }

    useEffect(() => {
        carregar();
    }, []);

    async function adicionarHospede(e: React.FormEvent) {
        e.preventDefault();
        if (!nome || !documento) return;

        setErro("");
        setSucesso("");
        setProcessando(true);
        try {
            await api.criarHospede(nome, documento, telefone);
            setNome("");
            setDocumento("");
            setTelefone("");
            setSucesso("Hóspede cadastrado com sucesso.");
            carregar();
        } catch (err: any) {
            setErro(err.message);
        } finally {
            setProcessando(false);
        }
    }

    async function excluirHospede(id: number, nome: string) {
        if (!confirm(`Excluir o hóspede ${nome}? Essa ação não pode ser desfeita.`)) return;

        setErro("");
        setSucesso("");
        setProcessando(true);
        try {
            await api.excluirHospede(id);
            setSucesso("Hóspede excluído com sucesso.");
            carregar();
        } catch (err: any) {
            setErro(err.message);
        } finally {
            setProcessando(false);
        }
    }

    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    const hospedesFiltrados = [...hospedes]
        .filter((h) => !termo || [h.nome, h.documento, h.telefone ?? ""].some((valor) => valor.toLocaleLowerCase("pt-BR").includes(termo)))
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

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
                <button disabled={processando} className="bg-teal text-white px-5 py-2 rounded-sm hover:bg-teal-dark transition-colors disabled:opacity-50" type="submit">
                    {processando ? "Salvando..." : "Adicionar hóspede"}
                </button>
            </form>

            <Erro mensagem={erro} />
            <Sucesso mensagem={sucesso} />

            <input aria-label="Buscar hóspedes" className="bg-white border border-ink/15 rounded-sm px-3 py-2 w-full max-w-md focus:outline-none focus:border-teal" placeholder="Buscar por nome, documento ou telefone" value={busca} onChange={(e) => setBusca(e.target.value)} />

            <div className="bg-white border border-ink/10 rounded-sm overflow-x-auto">
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
                        {hospedesFiltrados.map((h) => (
                            <tr key={h.id} className="border-b border-ink/5 last:border-0">
                                <td className="py-3 px-4">{h.nome}</td>
                                <td className="py-3 px-4 text-ink/70">{h.documento}</td>
                                <td className="py-3 px-4 text-ink/70">{h.telefone}</td>
                                <td className="py-3 px-4 text-right">
                                    <button
                                        onClick={() => excluirHospede(h.id, h.nome)}
                                        disabled={processando}
                                        className="text-sm text-ink/40 hover:text-status-pendente"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {!carregando && hospedesFiltrados.length === 0 && (
                            <tr>
                                <td className="py-4 px-4 text-ink/50" colSpan={4}>
                                    {busca ? "Nenhum hóspede encontrado para essa busca." : "Nenhum hóspede cadastrado ainda."}
                                </td>
                            </tr>
                        )}
                        {carregando && <tr><td className="py-4 px-4 text-ink/50" colSpan={4}>Carregando hóspedes...</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
