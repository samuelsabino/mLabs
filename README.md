# mLabs-challenge

<!-- ABOUT THE PROJECT -->

## Sobre o Desafio

Este projeto tem como objetivo testar os conhecimentos, código e a organização do candidato.

Criar uma API de controle de estacionamento (conforme contratos abaixo):

- Deve registrar entrada, saída e pagamento
- Não deve liberar saída sem pagamento
- Deve fornecer um histórico por placa

Essa API deve respeitar os status http corretamente, deve aceitar requisições e responder json.

# Pré-requisitos

- NodeJS 12+
- Docker

### Principais ferramentas utilizadas

- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)
- [Jest](https://jestjs.io/)

## Começando

Para utilizar aplicação com uma cópia local dos arquivos, siga os passos abaixo.

### Instalação

1. Clone o repositório com o comando `git clone https://github.com/samuelsabino/mLabs.git`.

2. Depois de clonado, na raiz do projeto, execute o comando abaixo para a instalação das dependências.

```text
npm install
```

ou

```text
yarn install
```

<br>

> <p> <br> NOTA:  O projeto também pode ser executado localmente, sem auxílio de um ambiente Docker configurado, como diz o passo 6. <br> <br>

<br>

3. Existe um arquivo na raiz do projeto chamado `.env.example`, lá contém todas as variáveis de ambiente que o projeto irá utilizar, renomeie ou crie um arquivo novo como o nome de `.env`.

4. Tenha o ambiente docker instalado e configurado, caso não possua, pode seguir o guia no link a seguir: `https://docs.docker.com/desktop/#download-and-install`

5. Com o docker instalado, execute o comando abaixo para inicialização do servidor:

```text
npm run docker:run
```

ou

```text
yarn docker:run
```

Após executado o comando, a aplicação será inicializada com todas as dependências instaladas e configuradas (inclusive uma instância do banco de dados).

6. Caso deseje utilizar localmente, sem um ambiente Docker, você pode iniciar o projeto rodando o comando abaixo:

```text
npm run dev
```

ou

```text
yarn dev
```

<br>

# Utilizando a aplicação

## Criação de uma reserva

- **`POST /products`**: Para cadastrar uma placa e fazer uma reserva a rota precisa receber, dentro do corpo da requisição, um objeto em formato JSON contendo o campo `plate`:

URL:

```
[POST] http://localhost:8080/parking
```

Objeto que será enviado no corpo da requisição:

```
{
 "plate": "Placa que será reservada (respeitando a máscara definida AAA-0000)",
}
```

Será retornado o produto cadastrado juntamente com o seu identificador único:

```
{
  "id": "id da reserva",
  "plate": "placa reservada.",
  "time": "tempo que está reservado."
}
```

## Busca o histórico de uma reserva

- **`GET /parking/:plate`**: Para buscar o histórico de uma reserva em específico a rota precisa receber em sua URL a placa que foi reservada:

URL:

```
[GET] http://localhost:8080/parkings/PLACA_RESERVADA
```

Será retornado o histórico correspondente a placa informada:

```
{
  "id": "id da reserva",
  "plate": "placa reservada.",
  "time": "tempo que está reservado.",
  "left": "informa se a placa já foi removida/reserva retirada.",
  "paid: "informa se houve o pagamento pela reserva."
}
```

## Pagamento da reserva/placa

- **`PATCH /parking/:id/pay`**: Para efetuar o pagamento de uma reserva/placa em específico a rota precisa receber em sua URL o identificador único da reserva/placa:

URL:

```
[PATCH] http://localhost:8080/parking/ID_DA_RESERVA/pay
```

Será retornado as informações da reserva juntamente com o status de pagamento atualizado:

```
{
  "id": "id da reserva",
  "plate": "placa reservada.",
  "time": "tempo que está reservado.",
  "paid: "informa o status do pagamento da reserva."
}
```

## Remover uma reserva/placa

- **`PATCH /parking/:id/out`**: Para efetuar a retirada/remoção da reserva realizada (obs.: uma reserva só pode ser removida se a mesma já estiver com o pagamento realizado), a rota precisa receber em sua URL o identificador único da reserva/placa:

URL:

```
[PATCH] http://localhost:8080/parking/ID_DA_RESERVA/out
```

Será retornado as informações da reserva juntamente com o status de retirada/remoção atualizado:

```
{
  "id": "id da reserva",
  "plate": "placa reservada.",
  "time": "tempo que está reservado.",
  "paid: "informa o status de retirada/remoção da reserva."
}
```

## Testes automatizados

### Como rodar os testes

1. Utilizando Docker.

- para rodar os testes automatizados, o serviço precisa estar iniciado com o comando abaixo:

```
npm run docker:run
```

ou

```
yarn docker:run
```

- em seguida, para executar os testes dentro do container, execute o comando:

```
npm run docker:attach
```

ou

```
yarn docker:attach
```

- Com o sistema inciado em um container, utilizando um segundo terminal para acessar e executar os comandos de dentro do container, utilize os comandos abaixo:
- Com o sistema rodando localmente, utilize também, os comandos abaixo:

<br>

### Para executar somente os testes de unidade:

```
npm run test:unit
```

ou

```
yarn test:unit
```

### Para executar somente os testes de integração:

```
npm run test:integration
```

ou

```
yarn test:integration
```

### E para executar todos os testes:

```
npm run test:ci
```

ou

```
yarn test:ci
```

<br>

## Reporte dos testes (taxa de cobertura)

- Após executado todos os testes, execute o comando abaixo (fora da aplicação) para visualizar o Relatório da cobertura de todos os testes aplicados:

```
npm run coverage:report
```

ou

```
yarn coverage:report
```

<br>

## Convenções

### Estilo

- eslint com o padrão de regras [standard](https://standardjs.com).
- padronização e correção do codigo utilizando [prettier](https://prettier.io/).

### Nomenclatura das Pastas

- utilização do estilo de escrita camelCase para todas as pastas.

### Arquivos

- PascalCase utilizado para os arquivos de contrato de model.
- camelCase utilizado para todos os demais arquivos.
- arquivos de testes utilizando o padrão _.spec.ts (para testes de unidade) e _.test.ts (para testes de integração).

## Visão Geral da Arquitetura

```text
├── src/
│   ├── application/
│   │   └── domain/
|   │   │   └── models/
|   │   │   └── repositories/
│   │   └── errors/
|   │   │   └── repositories/
│   │   └── helpers/
|   │   │   └── functions/
│   │   └── modules/
|   │   │   └── *módulos do projeto*/
|   |   │   │   └── *casos de uso*/
│   │   └── repositories/
|   │   │   └── *aplicações de persistência de dados disponíveis*/
|   |   │   │   └── *aplicação para cada módulos do projeto*/
│   ├── infra/
│   │   └── config/
│   │   └── helpers/
|   │   │   └── builders/
|   │   │   └── connection/
│   │   └── routes/
│   │   └── server.ts
├── test/
│   └── integration/
│   │   └── *módulos do projeto*/
│   └── unit/
│   │   └── *módulos do projeto*/
├── .env.example
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── dockerfile
├── jest-integration.config.ts
├── jest-unit.config.ts
├── jest.config.ts
├── LICENSE
├── nodemon.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```
