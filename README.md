# Sistema de Gestão de Hospedagem — Pequenos Hotéis/Pousadas

> **Grupo:** CHECKFLOW

Sistema para automatizar o processo de **check-in** e **check-out** de uma pousada de praia familiar, garantindo a comunicação entre a recepção e a governança (limpeza) através do controle de estado dos quartos.

## Contexto

Uma pousada de praia familiar quer automatizar seu processo de check-in e check-out. Hoje, quartos liberados pelo cliente ficam sem limpeza por falta de comunicação com a governança. O sistema resolve isso controlando o ciclo de vida do quarto (Livre → Ocupado → Limpeza Pendente → Livre) e impondo regras de negócio que impedem inconsistências operacionais.

## Escopo por entrega

| Nível | Escopo |
|-------|--------|
| **N1** | Cadastro de quartos e hóspedes; reserva de estadias; controle do estado do quarto (Livre, Ocupado, Limpeza Pendente); RN crítica de bloqueio de check-in. |
| **N2/N3** | Lançamento do consumo do minibar diretamente no extrato do quarto; precificação dinâmica (alta/baixa temporada). |

## Documentação

- [`docs/REQUISITOS.md`](docs/REQUISITOS.md) — Requisitos funcionais, não funcionais e regras de negócio.
- [`docs/GLOSSARIO.md`](docs/GLOSSARIO.md) — Definição dos termos do domínio.
- [`docs/MODELO-DOMINIO.md`](docs/MODELO-DOMINIO.md) — Entidades, atributos e a máquina de estados do quarto.

## Equipe

| Integrante | Papel |
|-----------|-------|
| Iago Neermann Koch | Engenheiro de Requisitos |
| Caio Rodrigues da Silva Rosa | Desenvolvedor |
| Patrick Gonçalves Gusmão | Desenvolvedor |
| William Vodzinsky | Desenvolvedor |
| João Francisco da Silva | Desenvolvedor |
| Pedro Henrique Israel | Desenvolvedor |

## Informações acadêmicas

- **Disciplina:** Manutenção e Melhoria de Software
- **Professor:** Rogério Elias da Cunha
