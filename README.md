# Bot Telegram - Back-end

Essa aplicação é um serviço para a comunicação entre usuários (clientes) e agentes (atendentes) em tempo real. Onde deverá trocar mensagens de texto com a aplicação através de um pubsub
### 1° Caso - Iniciando sessão
+ Ao receber uma mensagem do contato, o bot irá enviar uma requisição para o servidor. Quando o servidor receber essa mensagem, ele deve criar uma nova sessão (conversa), se ela não existir, e gravar a mensagem na sessão em atendimento e retornar uma mensagem para o contato contendo <strong>Reply: mensagem recebida</strong>

### 2° Caso - Consultando a sessão
+ É necessário criar uma rota para consultar as sessões que estão em atendimento no momento.
+ Também é possível realizar uma busca pelo nome do contato.

### 3° Caso - Finalizando a sessão
+ É importante fornecer uma rota para finalizar a sessão que está em atendimento, ao ser finalizado a sessão deve ser excluída do banco retornado uma mensagem informando o contato da finalização.

### 4° Caso - Importando sessões
+ Realizar importação das sessões que representaria os atendimentos que existem no momento. É necessário criar uma rota para realizar o upload desse arquivo, para que seja possível consultar essas sessões.
+ Ao finalizar o upload do arquivo, é necessário enviar uma mensagem para um canal do telegram, sendo um campo fornecido na rota de upload junto com o arquivo.
## Tecnologias | Libs | Frameworks | Databases
+ NodeJS
+ Typescript
+ Docker
+ MongoDb
+ Redis
+ Telegram-bot
### Iniciar Aplicação
```
  docker-compose up
  ou
  docker-compose up -d (em segundo plano)
```

### Encerrar aplicação
```
  docker-compose down
```
