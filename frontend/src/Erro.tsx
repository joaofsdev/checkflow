export function Erro({ mensagem }: { mensagem: string }) {
    if (!mensagem) return null;

    return (
        <p className="text-sm text-status-pendente bg-status-pendente/10 px-4 py-2 rounded-sm">
            {mensagem}
        </p>
    );
}
