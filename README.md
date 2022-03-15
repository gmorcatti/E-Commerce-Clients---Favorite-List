# E-Commerce Clients - Favorite List
## Esta API tem como funcionalidade a criação, edição, remoção e visualização de clientes. Além de também ser possível gerar uma lista de produtos favoritos para cada cliente. Todas informações são salvas no MongoDB.

***

## Autor
* Gabriel Morcatti - gabriel.morcatti@yahoo.com.br

## Tecnologias Utilizadas
* NodeJs
* Express Framework
* MongoDB

## Rotas
* POST /client - Criação de Clientes
* POST /client/admin - Criação de Clientes Administradores, para simular autorização de acesso.
* PUT /client/:id - Edição de Clientes
* GET /client/:email - Visualização de Clientes pelo E-mail
* DELETE /client/:id - Remoção de Clientes
* PUT /client/favoriteProduct/:productId - Adição de produtos a lista de produtos favoritos do cliente
* DELETE /client/favoriteProduct/:productId - Remoção de produtos a lista de produtos favoritos do cliente

* POST /auth - Autenticação

## Pré-requisitos
* NodeJs instalado
* Parametrização de todo arquivo "example.env" e transforma-lo em um ".env"

### .ENV
As variáveis de ambiente deste projeto são:
* MONGO_URL - Url de conexão com o MongoDB
* PRODUCTS_BASE_URL - Url base para acessar a API de Produtos: "http://challenge-api.luizalabs.com/api/product"
* JWT_TOKEN - Token Secret Unico para ser utilizado no JWT (insira qualquer valor desejado, mas não exponha-o).
* ADMIN_EMAIL - E-mail que será utilizado como o e-mail de administrador. Ex:"admin@teste.com"

## Requisitos
- [x] Clientes
    - [x] Criar
    - [x] Atualizar
    - [x] Visualizar
    - [x] Remover
- [x] O cadastro de clientes deve conter apenar seu nome e endereço de e-mail.
- [x] Um cliente não pode se registrar duas vezes com o mesmo endereço de e-mail.
- [x] Cada cliente deverá ter uma única lista de produtos favoritos.
- [x] Em uma lista de produtos podem existir uma quantidade ilimitada de produtos
    - [x] Um produto não pode ser adicionado em uma lista caso ele não exista.
    - [x] Um produto não pode estar duplicado na lista de produtos favoritos de um cliente.
- [x] O acesso a api deve possuir autenticação.
- [x] O acesso a algumas rotas deve possuir autorização.

## Como testar
### Configuração pré-requisitos
1. Parametrize todo o .env.

### Instalar dependencias
* Executar comando: 
```npm install```

### Iniciar Aplicação
* Para ambiente de desenvolvimento (Nodemon) executar o comando: 
```npm run dev```
* Para rodar com Node puro:
```npm start```

### Dicas de fluxo de testes
#### Algumas observações
- Todas as rotas exigem um JWT como Bearer Token para se autenticar. As únicas rotas que não exigem são:
    - A rota de auth (POST /auth): usada para gerar o token.
    - A rota de clientAdmin (POST /client/admin): 🚨 Esta rota foi criada exclusivamente para facilitar os testes, jamais deve ser utilizada em produção, pois seria uma falha de segurança. Como é necessário se ter autorização para as demais rotas, esta foi a forma encontrada de facilitar a criação de um único usuário ADMIN para seguir com os testes.

1. Criar usuário admin (POST /client/admin), não é necessário passar nenhuma informação no corpo ou path da requisição. Ela irá criar um usuário com name "Admin" e email igual ao informado no arquivo .env.
2. Autenticar usuário (POST /auth). Será retornado o token e as informações do usuário que se autenticou. Como o escopo não exigia senha, somente um e-mail existente é suficiente para se autenticar. O corpo da requisição deve ser no seguinte formato:
```
{
    "email": "${email}"
}
```
3. Nas demais requisições inserir o token no header como:
```
{
    "Authorization": "Bearer ${token}"
}
```
4. Criar um cliente (POST /client). Corpo JSON:
```
{
    "name": "Teste",
    "email": "teste@teste.com"
}
```
5. Buscar um cliente (GET /client/:email). Onde :email é o email do Cliente.
6. Editar um cliente (PUT /client/:idClient). Onde :idClient deve ser o Id retornado pelo Mongo na rota de buscar cliente. Este ID que representa qual o cliente terá seus dados alterados. Corpo JSON:
```
{
    "name": "Teste do teste",
    "email": "teste@teste.com"
}
```
7. Remover um cliente (DELETE /client/:idClient). Onde :idClient deve ser o Id retornado pelo Mongo na rota de buscar cliente. Este ID que representa qual o cliente será removido.
8. Inserir um produto favorito (PUT /client/favoriteProduct/:productId). Onde :productId é o Identificador do produto que será inserido. 
    * Nesta rota o Token de autenticação inserido no Header que indica as informações do usuário.
    * Caso queira inserir produtos favoritos a algum cliente X, deve-se autenticar e buscar o token para tal.
9. Remover um produto favorito (DELETE /client/favoriteProduct/:productId). Onde :productId é o Identificador do produto que será inserido. 
    * Nesta rota o Token de autenticação inserido no Header que indica as informações do usuário.
    * Caso queira remover produtos favoritos a algum cliente X, deve-se autenticar e buscar o token para tal.



