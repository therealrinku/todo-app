# Todo App

1. OpenAPI codegen in frontend ❌
2. ESlint and prettier ❌
3. Frontend with React(Vite),Tailwindcss, React Query, Typescript ✅ 
4. Backend with NestJS , Swagger(http://localhost:3000/api), Typescript ✅ 



Instructions to run locally

```git clone https://github.com/therealrinku/-todo-app.git```

For Frontend 
  1. ``` cd frontend  ```
  2. ``` yarn  ```
  3. add .env.local file (VITE_API_URL = http://localhost:3000 or <nest_server_url>) 
  4. ``` yarn dev ```

For Backend 
  1. ``` cd backend ```
  2. ``` yarn  ``` 
  3. add .env(DATABASE_URL="<db_url>?connect_timeout=300&connection_limit=40&pool_timeout=0" and JWT_KEY="key")
  4. ``` yarn prisma init ```
  5. ``` yarn primsa db push ```
  6. ``` yarn start run ```


