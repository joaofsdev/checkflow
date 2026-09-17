export function Sucesso({ mensagem }: { mensagem: string }) {
    if (!mensagem) return null;

    return (
        <div className="border border-status-livre/30 bg-status-livre/10 text-status-livre px-4 py-3 rounded-sm text-sm" role="status">
            ✓ {mensagem}
        </div>
    );
}
