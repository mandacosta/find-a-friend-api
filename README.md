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

- [] A senha da organização precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] A organização deve ser identificado por um JWT (JSON Web Token);


## Rotas da aplicação

post('/pet) -> autenticada
get('/pet/:id_cidade'/:id_pet?/...filtros...)
get('whatsapp_link/:id_pet')

post('/auth')
post('/org')

## Dados dos pets
{
    id: uuid,
    id_org: uuid,
    nome: string
    tipo: [cão, gato],
    idade: [filhote, adulto, idoso],
    energia: [1,2,3,4,5],
    porte: [mini, pequeno, médio, grande]
    independencia: [1,2,3],
    restricoes: [string]
}

## Dados das orgs
{
    id: uuid,
    nome: string,
    email: string,
    cep: 8 dígitos validados com uma api,
    endereco:
    numero:
    complemento:
    whatsapp: validar que é um numero verdadeiro,
    senha:

}

