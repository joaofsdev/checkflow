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
|---|---|
| Patrick Gusman | Product Owner (PO) |
| Iago Koch | Engenheiro de Requisitos |
| Caio Rosa | Quality Assurance (QA) |
| William Vodzinsky | Desenvolvedor Frontend |
| João Silva | Desenvolvedor Backend |
| Pedro Israel | DevOps |

## Informações acadêmicas

- **Disciplina:** Manutenção e Melhoria de Software
- **Professor:** Rogério Elias da Cunha
## Como executar o projeto

### Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- Node.js
- npm
- Git

### Backend

Abra o terminal na pasta do projeto e execute:

```bash
cd backend
npm install
npm run dev
```

Deixe esse terminal aberto enquanto estiver utilizando o sistema.

### Frontend

Abra outro terminal na pasta do projeto e execute:

```bash
cd frontend
npm install
npm run dev
```

Após iniciar, o terminal mostrará o endereço para acessar o sistema no navegador.

### Banco de dados

O projeto utiliza SQLite e o banco de dados está localizado em:

```text
backend/pousada.db
```

### Observação

A pasta `node_modules` não fica armazenada no GitHub. Por isso, ao clonar o projeto em outro computador, é necessário executar `npm install` tanto no backend quanto no frontend.
