# Synccheck

Sistema de gestão de pousada com quartos, hóspedes, reservas, check-in, check-out e controle de limpeza.

## Como executar

### Backend

```bash
cd backend
npm install
npm run dev
```

O backend será iniciado em `http://localhost:3001`.

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra o endereço exibido pelo Vite no navegador.

Para usar outro endereço de API, copie `frontend/.env.example` para `frontend/.env` e altere `VITE_API_URL`.

## Melhorias incluídas

- indicadores no painel inicial;
- busca e ordenação de quartos e hóspedes;
- mensagens de sucesso e estados de carregamento;
- bloqueio dos botões durante requisições;
- datas exibidas no formato brasileiro;
- seleção de quarto com número, tipo e status;
- tabelas responsivas em telas menores;
- validação de status no check-out.
