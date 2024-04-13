# StockSense&copy; - Stock Software

## To run the project:
<pre>npm install</pre>

## To run the API:
<pre>npm run dev:server</pre>

## To create a new migration:
<pre>npm run typeorm migration:create src/database/migrations/CreateUsuarioTable</pre>

## To run a migration:
<pre>npm run typeorm -- -d ./src/database/data-source.ts migration:run</pre>

## Naming Convention:
In Portuguese:
* Entities;
* File names related to entities;
* Models;
* Request variables;

Everything else in English.

Made with _a lot_ of ☕ by: Labian Software LTDA &copy; 2024
