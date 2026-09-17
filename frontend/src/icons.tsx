type IconProps = { className?: string };

export function IconCama({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 18v2M21 18v2" strokeLinecap="round" />
            <path d="M3 12V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="9" r="1" />
        </svg>
    );
}

export function IconHospede({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <circle cx="12" cy="8" r="3.2" />
            <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" strokeLinecap="round" />
        </svg>
    );
}

export function IconReserva({ className }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
            <path d="M3.5 9.5h17" strokeLinecap="round" />
            <path d="M8 3v3.2M16 3v3.2" strokeLinecap="round" />
        </svg>
    );
}
