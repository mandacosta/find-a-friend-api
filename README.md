# Find a Friend API 🐶

API voltada para facilitar a adoção de cahorros

## RFs (Requisitos funcionais)

- [] Deve ser possível cadastrar um pet
- [] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [] Deve ser possível filtrar pets por suas características
- [] Deve ser possível visualizar detalhes de um pet para adoção
- [] Deve ser possível se cadastrar como uma organização
- [] Deve ser possível realizar login como uma organização

## RNs (Regras de negócio)

- [] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [] Uma organização precisa ter um endereço e um número de WhatsApp
- [] Um pet deve estar ligado a uma organização
- [] O usuário que quer adotar, entrará em contato com a organização via WhatsApp
- [] Todos os filtros, além da cidade, são opcionais
- [] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## RNFs (Requisitos não-funcionais)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);