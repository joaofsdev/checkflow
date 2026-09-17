HANDOFF — CHECKFLOW N1 v1.0

1. OBJETIVO DO DOCUMENTO

Este documento tem como objetivo facilitar a transferência do projeto CHECKFLOW para outra equipe, permitindo que novos desenvolvedores compreendam o funcionamento do sistema, sua arquitetura, regras de negócio, estrutura do código, forma de execução, limitações atuais e próximos passos.

A intenção é que a equipe receptora consiga instalar, executar, testar e evoluir o projeto com o mínimo possível de dependência da equipe responsável pela N1.


2. VISÃO GERAL DO PROJETO

O CHECKFLOW é um sistema de gestão de hospedagem voltado para pequenos hotéis e pousadas.

O problema principal tratado pelo sistema é a falta de comunicação entre a recepção e a governança após o check-out de um hóspede.

Sem um controle adequado, um quarto poderia ser considerado disponível antes da realização da limpeza.

Para resolver esse problema, o sistema controla o estado dos quartos durante todo o processo de hospedagem.

Fluxo principal do quarto:

Livre → Ocupado → Limpeza Pendente → Livre

- Livre: quarto disponível para hospedagem;
- Ocupado: hóspede realizou check-in;
- Limpeza Pendente: hóspede realizou check-out, mas o quarto ainda não foi limpo;
- Livre novamente: governança concluiu a limpeza.

Uma das principais regras do sistema é impedir um novo check-in enquanto o quarto estiver com status Limpeza Pendente.


3. ESCOPO IMPLEMENTADO NA N1

Na versão N1 foram implementadas as seguintes funcionalidades:

- Cadastro de quartos;
- Listagem de quartos;
- Exclusão de quartos;
- Cadastro de hóspedes;
- Listagem de hóspedes;
- Exclusão de hóspedes;
- Criação de reservas;
- Listagem de reservas;
- Realização de check-in;
- Realização de check-out;
- Controle do estado dos quartos;
- Registro da conclusão da limpeza;
- Bloqueio de check-in em quarto ocupado;
- Bloqueio de check-in em quarto com limpeza pendente;
- Validação de check-in repetido;
- Validação de reservas conflitantes;
- Proteção contra exclusão de quartos com reservas vinculadas;
- Proteção contra exclusão de hóspedes com reservas vinculadas;
- Painel inicial com informações gerais da pousada;
- Testes da API utilizando Postman.


4. FUNCIONALIDADES PREVISTAS PARA EVOLUÇÕES FUTURAS

Algumas funcionalidades estão previstas para as próximas entregas, mas ainda não fazem parte da implementação atual:

- Registro de consumo do minibar;
- Extrato da estadia;
- Soma de diárias e consumos;
- Precificação dinâmica;
- Valores diferentes para alta e baixa temporada.


5. TECNOLOGIAS UTILIZADAS

Frontend:
- React;
- TypeScript;
- Vite;
- Tailwind CSS;
- Fetch API.

Backend:
- Node.js;
- TypeScript;
- Express;
- CORS;
- better-sqlite3;
- TSX.

Banco de dados:
- SQLite.

Testes:
- Postman.

Versionamento:
- Git;
- GitHub.


6. ARQUITETURA DA APLICAÇÃO

A aplicação está dividida em frontend, backend e banco de dados.

Usuário
  ↓
Frontend React
  ↓
API REST
  ↓
Backend Node.js + Express
  ↓
Banco SQLite

O frontend realiza requisições HTTP para o backend.

O backend é responsável pela aplicação das regras de negócio e pelo acesso ao banco de dados.


7. ESTRUTURA PRINCIPAL DO PROJETO

checkflow/
├── README.md
├── frontend/
├── backend/
├── postman/
├── docs/
│   ├── REQUISITOS.md
│   ├── GLOSSARIO.md
│   ├── MODELO-DOMINIO.md
│   ├── MATRIZ-PAPEIS.md
│   ├── DER/
│   ├── debitos-tecnicos/
│   └── handoff/
│       └── HANDOFF.md
└── .gitignore


8. PRÉ-REQUISITOS

Para executar o projeto é necessário possuir:

- Node.js;
- npm;
- Git.

Para verificar a instalação:

node --version
npm --version
git --version


9. COMO CLONAR O PROJETO

git clone https://github.com/joaofsdev/checkflow.git

Depois:

cd checkflow

Para utilizar especificamente a versão entregue da N1:

git checkout v1.0


10. COMO EXECUTAR O BACKEND

Entre na pasta:

cd backend

Instale as dependências:

npm install

Execute o servidor:

npm run dev

O backend será executado em:

http://localhost:3001

O terminal deve permanecer aberto durante a utilização do sistema.


11. COMO EXECUTAR O FRONTEND

Abra outro terminal.

Entre na pasta:

cd frontend

Instale as dependências:

npm install

Execute:

npm run dev

O Vite exibirá o endereço da aplicação.

Normalmente:

http://localhost:5173

O backend deve estar executando para que o frontend consiga acessar os dados.


12. BANCO DE DADOS

O projeto utiliza SQLite.

O arquivo do banco está localizado em:

backend/pousada.db

O acesso ao banco é configurado em:

backend/src/db.ts

As principais entidades do sistema são:

- Quartos;
- Hóspedes;
- Reservas.


13. ENTIDADE QUARTOS

Principais informações:

- ID;
- Número;
- Tipo;
- Status.

Estados possíveis:

- Livre;
- Ocupado;
- Limpeza Pendente.


14. ENTIDADE HÓSPEDES

Principais informações:

- ID;
- Nome;
- Documento;
- Telefone.

O sistema impede o cadastro de dois hóspedes com o mesmo documento através de validação da API.


15. ENTIDADE RESERVAS

Principais informações:

- ID;
- Quarto;
- Hóspede;
- Data de check-in;
- Status.

Status utilizados:

- Reservado;
- Em andamento;
- Finalizado.


16. RELACIONAMENTOS

HÓSPEDE 1 ───── N RESERVAS N ───── 1 QUARTO

Um hóspede pode possuir várias reservas.

Um quarto pode possuir várias reservas ao longo do tempo.

Cada reserva pertence a um hóspede e a um quarto.


17. PRINCIPAIS REGRAS DE NEGÓCIO

Check-in:

Para realizar o check-in:

- A reserva precisa existir;
- A reserva deve estar com status Reservado;
- O quarto não pode estar ocupado;
- O quarto não pode estar com limpeza pendente.

Após o check-in:

Reserva: Reservado → Em andamento
Quarto: Livre → Ocupado


18. CHECK-OUT

Após o check-out:

Reserva → Finalizado
Quarto → Limpeza Pendente

O quarto não fica imediatamente disponível.


19. CONCLUSÃO DA LIMPEZA

Após a governança concluir a limpeza:

Limpeza Pendente → Livre

Somente depois dessa etapa o quarto deve voltar a receber hóspedes.


20. RESERVAS CONFLITANTES

O sistema possui validação para evitar reserva repetida para:

- Mesmo quarto;
- Mesma data de check-in;
- Reserva ainda não finalizada.


21. EXCLUSÃO DE QUARTOS

Um quarto não pode ser excluído caso possua reservas vinculadas.


22. EXCLUSÃO DE HÓSPEDES

Um hóspede não pode ser excluído caso possua reservas vinculadas.


23. API

Endereço base:

http://localhost:3001

QUARTOS

GET /quartos
Lista os quartos.

POST /quartos
Cadastra um quarto.

Exemplo:
{
  "numero": "101",
  "tipo": "Casal"
}

PATCH /quartos/:id/limpeza
Registra a conclusão da limpeza.

DELETE /quartos/:id
Exclui um quarto quando permitido.


24. HÓSPEDES

GET /hospedes
Lista hóspedes.

POST /hospedes
Cadastra hóspede.

Exemplo:
{
  "nome": "Maria da Silva",
  "documento": "12345678900",
  "telefone": "47999999999"
}

DELETE /hospedes/:id
Exclui hóspede quando permitido.


25. RESERVAS

GET /reservas
Lista reservas.

POST /reservas
Cria reserva.

Exemplo:
{
  "quarto_id": 1,
  "hospede_id": 1,
  "data_checkin": "2026-09-20"
}

POST /reservas/:id/checkin
Realiza check-in.

POST /reservas/:id/checkout
Realiza check-out.

DELETE /reservas/:id
Exclui reserva.


26. FRONTEND

O frontend possui quatro áreas principais.

Início:
- Quartos livres;
- Quartos ocupados;
- Quartos com limpeza pendente;
- Quantidade de hóspedes;
- Quantidade de reservas;
- Reservas em andamento.

Quartos:
- Cadastrar quartos;
- Listar quartos;
- Visualizar status;
- Registrar conclusão da limpeza;
- Excluir quartos quando permitido.

Hóspedes:
- Cadastrar hóspedes;
- Listar hóspedes;
- Excluir hóspedes.

Reservas:
- Criar reserva;
- Selecionar quarto;
- Selecionar hóspede;
- Informar data;
- Realizar check-in;
- Realizar check-out;
- Excluir reserva.


27. TESTES

Os testes da API estão organizados na pasta:

postman/

Existem testes para:

- Cadastro de hóspedes;
- Documento repetido;
- Cadastro de quartos;
- Número de quarto repetido;
- Cadastro sem campos obrigatórios;
- Criação de reserva;
- Reserva conflitante;
- Check-in;
- Check-in repetido;
- Check-out;
- Check-in em quarto ocupado;
- Check-in com limpeza pendente;
- Conclusão da limpeza;
- Exclusão de quartos;
- Exclusão de hóspedes;
- Exclusão de reservas.


28. FLUXO RECOMENDADO DE TESTE

1. Iniciar backend;
2. Iniciar frontend;
3. Cadastrar um quarto;
4. Cadastrar um hóspede;
5. Criar uma reserva;
6. Fazer check-in;
7. Confirmar que o quarto ficou Ocupado;
8. Fazer check-out;
9. Confirmar que ficou Limpeza Pendente;
10. Tentar novo check-in;
11. Confirmar que o sistema bloqueia;
12. Marcar limpeza como concluída;
13. Confirmar que o quarto ficou Livre;
14. Realizar novo check-in.


29. DÉBITOS TÉCNICOS CONHECIDOS

- Edição de quartos e hóspedes ainda não implementada;
- Reserva ainda não possui data de saída prevista;
- Verificação de conflito de reserva ainda é simplificada;
- Não existe status específico de cancelamento;
- Validação de check-out pode ser reforçada;
- Conclusão da limpeza deve validar melhor o estado anterior;
- Check-in e check-out poderiam utilizar transações no banco;
- URL do backend está fixa no frontend;
- O sistema ainda não possui autenticação;
- Não há suíte automatizada de testes integrada ao código;
- Configurações de ambiente podem ser melhoradas;
- A documentação deve permanecer alinhada com a implementação.


30. MELHORIAS FUTURAS

Antes da implementação da N2/N3, recomenda-se:

1. Revisar as regras de check-out;
2. Melhorar validação da limpeza;
3. Implementar período completo das reservas;
4. Melhorar o tratamento de conflitos;
5. Adicionar transações;
6. Adicionar testes automatizados;
7. Padronizar configurações de ambiente;
8. Revisar documentação após cada alteração.


31. FUNCIONALIDADES PREVISTAS PARA N2/N3

Minibar:
- Item;
- Quantidade;
- Valor;
- Reserva ou estadia relacionada.

Extrato:
- Diárias;
- Consumo do minibar;
- Valor total.

Precificação dinâmica:
- Alta temporada;
- Baixa temporada.


32. CUIDADOS COM O BANCO

O arquivo:

backend/pousada.db

pode conter dados utilizados durante desenvolvimento e demonstração.

Antes de excluir ou substituir o banco:

- Verificar se os dados são necessários;
- Criar backup se necessário;
- Evitar alterações diretamente no banco sem compreender as regras da aplicação.


33. VERSIONAMENTO

A versão entregue da N1 deve ser congelada como:

v1.0

Depois da criação da versão:

- Não alterar a tag;
- Realizar novas alterações em novos commits;
- Criar novas versões nas próximas entregas.


34. GESTÃO DAS TAREFAS

A equipe utiliza um quadro de gestão com fluxo semelhante a:

Backlog → A Fazer → Em Andamento → Em Testes → Concluído

As atividades devem possuir:

- Responsável;
- Descrição;
- Status;
- Evidência de conclusão.


35. EQUIPE RESPONSÁVEL PELA N1

Patrick Gusman
Papel: Product Owner
Principal contribuição: Organização da equipe e definição de prioridades.

Iago Koch
Papel: Engenheiro de Requisitos
Principal contribuição: Requisitos e documentação.

Caio Rosa
Papel: Quality Assurance (QA)
Principal contribuição: Testes no Postman.

William Vodzinsky
Papel: Desenvolvedor Frontend
Principal contribuição: Desenvolvimento das telas.

João Silva
Papel: Desenvolvedor Backend
Principal contribuição: API e banco de dados.

Pedro Israel
Papel: DevOps
Principal contribuição: GitHub, versionamento, repositório e organização da documentação.


36. CHECKLIST PARA A EQUIPE QUE RECEBER O PROJETO

- Clonar o repositório;
- Confirmar a versão v1.0;
- Instalar dependências do backend;
- Instalar dependências do frontend;
- Iniciar backend;
- Iniciar frontend;
- Verificar conexão com a API;
- Testar cadastro de quarto;
- Testar cadastro de hóspede;
- Testar criação de reserva;
- Testar check-in;
- Testar check-out;
- Testar limpeza;
- Revisar coleção do Postman;
- Ler os requisitos;
- Ler o modelo de domínio;
- Ler o glossário;
- Revisar os débitos técnicos;
- Criar branch antes de iniciar novas alterações.


37. CRITÉRIOS PARA CONSIDERAR O HANDOFF CONCLUÍDO

O handoff será considerado bem-sucedido se a próxima equipe conseguir:

- Clonar o projeto;
- Instalar as dependências;
- Iniciar frontend e backend;
- Compreender a estrutura do sistema;
- Utilizar a interface;
- Criar hóspedes e quartos;
- Criar reservas;
- Executar check-in;
- Executar check-out;
- Entender o processo de limpeza;
- Identificar as principais regras de negócio;
- Executar os testes existentes;
- Identificar os débitos técnicos;
- Continuar o desenvolvimento sem depender diretamente da equipe anterior.


38. RESUMO TÉCNICO

Projeto: CHECKFLOW
Domínio: Gestão de hospedagem

Frontend:
React + TypeScript + Vite

Backend:
Node.js + Express + TypeScript

Banco:
SQLite

Backend:
http://localhost:3001

Frontend:
http://localhost:5173

Banco:
backend/pousada.db

Testes:
postman/

Fluxo principal:
Livre → Ocupado → Limpeza Pendente → Livre

Regra crítica:
Quarto com limpeza pendente não pode receber novo check-in.

Versão:
N1 / v1.0


39. ENCERRAMENTO

A versão N1 do CHECKFLOW estabelece a base funcional do sistema de gestão de hospedagem.

O principal objetivo alcançado foi controlar corretamente o ciclo de utilização dos quartos, principalmente no processo entre check-out, limpeza e nova hospedagem.

A próxima equipe deverá preservar essa regra central ao realizar novas evoluções.

Antes de iniciar funcionalidades da N2/N3, recomenda-se revisar os débitos técnicos registrados neste documento e garantir a estabilidade das funcionalidades já existentes.
