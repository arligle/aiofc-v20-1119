import { fastifyBootstrap } from "@aiofc/fastify-server";
import { AppModule } from "./app/app.module";
import { initializeTransactionalContext } from 'typeorm-transactional';


/*
初始化事务上下文，
调用 initializeTransactionalContext 必须在初始化任何应用程序上下文之前发生！
https://www.npmjs.com/package/typeorm-transactional#usage
*/
initializeTransactionalContext();
// 启动 Fastify 服务器
fastifyBootstrap(AppModule);