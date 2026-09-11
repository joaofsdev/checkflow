# Modelo de Domínio

## Entidades (N1)

### Quarto
- `id` / número
- `tipo`
- `capacidade`
- `diariaBase`
- `estado` → `Livre | Ocupado | LimpezaPendente`

### Hóspede
- `id`
- `nome`
- `documento`
- `contato`

### Reserva / Estadia
- `id`
- `quarto` (ref)
- `hospede` (ref)
- `dataEntradaPrevista`
- `dataSaidaPrevista`
- `status` → `Reservada | EmAndamento | Finalizada | Cancelada`
- `dataCheckIn` (nullable)
- `dataCheckOut` (nullable)

### ConsumoMinibar *(N2/N3)*
- `id`
- `estadia` (ref)
- `item`
- `quantidade`
- `valorUnitario`

## Máquina de estados do Quarto

```
        check-in (RF07)              check-out (RF08)
Livre ───────────────► Ocupado ───────────────► Limpeza Pendente
  ▲                                                     │
  │              limpeza concluída (RF09)               │
  └─────────────────────────────────────────────────────┘

RN01: check-in BLOQUEADO se estado = Limpeza Pendente
RN02: check-out só a partir de Ocupado
RN03: só sai de Limpeza Pendente para Livre via governança
```

## Transições válidas

| De | Ação | Para | Regra |
|----|------|------|-------|
| Livre | check-in | Ocupado | RN01, RN04 |
| Ocupado | check-out | Limpeza Pendente | RN02 |
| Limpeza Pendente | limpeza concluída | Livre | RN03 |

Qualquer transição não listada é **inválida** (RNF01).
