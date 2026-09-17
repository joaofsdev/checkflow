# Matriz de Papéis e Histórico de Contribuições — N1

## 1. Identificação da Equipe e Papéis

| Integrante | Papel |
|---|---|
| Patrick Gusman | Product Owner (PO) |
| Iago Koch | Engenheiro de Requisitos |
| Caio Rosa | Quality Assurance (QA) |
| William Vodzinsky | Desenvolvedor Frontend |
| João Silva | Desenvolvedor Backend |
| Pedro Israel | DevOps |

## 2. Histórico de Contribuições

### Patrick Gusman — Product Owner (PO)

**Principais atividades realizadas:**
- Organização da equipe durante o desenvolvimento da N1;
- Definição e acompanhamento das prioridades do projeto;
- Alinhamento das atividades entre os integrantes;
- Acompanhamento da evolução das funcionalidades previstas para a entrega;
- Organização das demandas necessárias para a versão N1.

**Evidências possíveis:**
- Quadro de gestão de tarefas utilizado pela equipe;
- Registros de organização e priorização das atividades;
- Apresentação do Pitch da N1.

---

### Iago Koch — Engenheiro de Requisitos

**Principais atividades realizadas:**
- Levantamento e definição dos requisitos do sistema;
- Organização dos requisitos funcionais e não funcionais;
- Definição das regras de negócio relacionadas ao processo de hospedagem;
- Documentação dos requisitos e do domínio do sistema;
- Apoio na definição do comportamento esperado das funcionalidades.

**Evidências no repositório:**
- `REQUISITOS.md`;
- `GLOSSARIO.md`;
- `MODELO-DOMINIO.md`;
- Documentação das regras de negócio da aplicação.

---

### Caio Rosa — Quality Assurance (QA)

**Principais atividades realizadas:**
- Planejamento e execução dos testes da API;
- Criação e organização das requisições de teste no Postman;
- Validação dos principais fluxos da aplicação;
- Testes das regras de negócio;
- Testes de cenários de erro e operações inválidas;
- Verificação do comportamento dos endpoints do backend.

**Evidências no repositório:**
- Diretório `postman/`;
- Coleção de testes da API;
- Testes de cadastro, exclusão, reservas, check-in e check-out;
- Testes relacionados aos bloqueios e validações das regras de negócio.

---

### William Vodzinsky — Desenvolvedor Frontend

**Principais atividades realizadas:**
- Desenvolvimento da interface web do sistema;
- Implementação das telas da aplicação;
- Desenvolvimento das telas de quartos, hóspedes e reservas;
- Implementação da página inicial e visualização das informações do sistema;
- Integração da interface com os serviços disponibilizados pelo backend;
- Estruturação visual e navegação da aplicação.

**Evidências no repositório:**
- Diretório `frontend/`;
- `frontend/src/Home.tsx`;
- `frontend/src/Hospedes.tsx`;
- `frontend/src/Quartos.tsx`;
- `frontend/src/Reservas.tsx`;
- `frontend/src/App.tsx`;
- Demais arquivos relacionados à interface.

---

### João Silva — Desenvolvedor Backend

**Principais atividades realizadas:**
- Desenvolvimento da API do sistema;
- Implementação das rotas do backend;
- Implementação das operações relacionadas a quartos;
- Implementação das operações relacionadas a hóspedes;
- Implementação das operações relacionadas a reservas;
- Implementação das regras de check-in e check-out;
- Integração da API com o banco de dados;
- Estruturação e utilização do banco de dados SQLite.

**Evidências no repositório:**
- Diretório `backend/`;
- `backend/src/server.ts`;
- `backend/src/db.ts`;
- `backend/src/routes/hospedes.ts`;
- `backend/src/routes/quartos.ts`;
- `backend/src/routes/reservas.ts`;
- `backend/pousada.db`.

---

### Pedro Israel — DevOps

**Principais atividades realizadas:**
- Organização do repositório GitHub da equipe;
- Estruturação e manutenção dos arquivos do projeto no repositório;
- Gerenciamento do versionamento do código com Git;
- Organização da documentação no repositório;
- Preparação do repositório para a entrega da N1;
- Apoio na integração das alterações realizadas pelos integrantes;
- Organização da versão entregue do sistema.

**Evidências possíveis:**
- Repositório GitHub do CHECKFLOW;
- Histórico de commits;
- Organização da estrutura do repositório;
- `README.md`;
- `.gitignore`;
- Tag/Release `v1.0` após a finalização da entrega;
- Documentação organizada para a N1.

---

## 3. Matriz Resumida de Responsabilidades

| Área / Atividade | Responsável principal |
|---|---|
| Organização e priorização do projeto | Patrick Gusman |
| Requisitos e documentação de requisitos | Iago Koch |
| Testes e validação da API | Caio Rosa |
| Interface e telas do sistema | William Vodzinsky |
| API e banco de dados | João Silva |
| GitHub, versionamento e organização da documentação | Pedro Israel |

> Os papéis representam as responsabilidades principais de cada integrante durante a N1. A divisão de papéis não impede a colaboração entre os membros em outras atividades do projeto.
