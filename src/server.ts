import { app } from "./app";
import { env } from "./env";

app
  .listen({
    host: "0.0.0.0", //Seja acessível para quem esteja consumindo essa aplicação(front-end)
    port: env.PORT,
  })
  .then(() => {
    console.log(`🎇 HTTP server is running on port ${env.PORT}`);
  });
