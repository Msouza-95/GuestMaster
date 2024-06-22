## Guest Master - Sistema de Gerenciamento de Hóspedes e Reservas

Este projeto é um sistema de gerenciamento de hóspedes e reservas para hotéis, projetado para armazenar e gerenciar informações detalhadas sobre hóspedes e suas respectivas reservas de forma eficiente e organizada.


## Visão Geral


API permite:

- [x] CRUD de usuários, hotéis, quartos e Hóspedes
- [x] Buscar quartos de um hotel
- [x] Realizar Reservas
- [x] Realizar Check-In
- [x] Realizar Check-Out
- [x] Cancelar um reserva
- [x] buscar reservas de Hóspede
- [x] Autenticação de user via JWT

## Tecnologias

#### Frameworks:
- [NodejS](https://nodejs.org/pt) : Permite os programadores criar servidores, aplicações da Web, ferramentas de linha de comando e programas de automação de tarefas.

#### ORM:
- [TypeORM](https://typeorm.io/) : ORM (Object-Relational Mapping) para TypeScript e JavaScript que permite mapear objetos para entidades de banco de dados relacionais, facilitando a manipulação e persistência de dados.

#### Infraestrutura:
- [Docker](https://www.docker.com/) : Plataforma de virtualização de contêineres que simplifica o desenvolvimento, implantação e execução de aplicações em ambientes isolados, promovendo a consistência e a portabilidade.


#### Banco de dados:
- [SQL Server](https://www.microsoft.com/pt-br/sql-server/sql-server-2022) : Sistema gerenciador de Banco de dados relacional desenvolvido pela Sybase em parceria com a Microsoft

#### Documentação:
- [Swagger](https://swagger.io/) : Ferramenta para documentação de APIs, permitindo a criação de documentação interativa e teste automatizado.

### Instalação

```bash
$ yarn install
```

### Configurar o file .env
  Não é o correto, mas já deixei o .env.exemple já completo
```bash
   # renomear
   .env.exemple
   # para
   .env
```

### Criar container Docker DB SqlServe

```bash
$ docker-compose up -d
```
### Criar Database

Não conseguir criar a base de dados via docker, vai precisar aceessar SQL Server Management Studio com as credencias do arquivo .env e executar :

```bash
$ USE master;
GO
CREATE DATABASE guestmaster;

```
### Executar as migrations

```bash
# executar
  $ yarn migration:run

# Reverter
  $ migration:revert

```
### Executar a API

  Primeiro verificar se o serviço node no docker subiu
```bash
  # acessar a rota de documentação swagger da api

  $ http://localhost:3333/api-documentation

```

### Caso não funcione

```bash
#Subir docker node

$ docker start guest_master_app

# ou executar a api dirreto da máquina

$ Yarn start

# Acessar api

 $ http://localhost:3333/api-documentation

```

### Caso não desejar testar pelo swagger, tem arquivo Insomina

```bash
# pasta dados

$ docker start guest_master_app

```



## License

Nest is [MIT licensed](LICENSE).
