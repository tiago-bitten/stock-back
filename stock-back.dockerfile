# Define a imagem base
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código para o container
COPY . .

# Compila o código TypeScript
RUN npm run build

# Executa as migrações (opcional, se necessário)
RUN npx dotenv -e .env.production -- ts-node ./node_modules/typeorm/cli.js -d ./src/database/data-source.ts migration:run

# Expõe a porta usada pela aplicação
EXPOSE 3333

# Comando para executar a aplicação
CMD ["npm", "start"]
