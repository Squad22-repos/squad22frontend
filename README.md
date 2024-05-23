# Squad 22 - Frontend

## Descrição

Este repositório contém o código da aplicação frontend desenvolvida pelo Squad 22. A aplicação fornece uma interface visual simples para interagir com os recursos do servidor que desenvolvemos.

## Configuração

Antes de executar o código do repositório, certifique-se de que o Node.js e o npm estão instalados e configurados. Caso precise realizar a instalação, veja este [vídeo](https://youtu.be/OcUHXEVQfIU?t=105).

1. **Instalar Expo CLI**:
   Com o Node.js e o npm instalados, execute o seguinte comando para instalar o Expo CLI globalmente:
   ~~~sh
   npm install -g expo-cli
   ~~~
2. **Instalar Dependências**:
   Em seguida instale as dependências do projeto:
   ~~~sh
   npm install
   ~~~

## Execução

Para executar a aplicação, você pode utilizar a branch main para conectar-se ao servidor na nuvem ou a branch local para conectar-se a um servidor local na porta 8000.

Para iniciar a aplicação execute:
~~~sh
npm run web
~~~
ou
~~~sh
expo start --web
~~~

### Notas Adicionais

  - Certifique-se de estar na branch correta (main para o servidor na nuvem ou local para o servidor local) antes de iniciar a aplicação.
  -  Se você estiver utilizando o servidor local, verifique se ele está rodando na porta 8000 para garantir a conectividade adequada.
