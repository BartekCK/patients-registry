import {DiscoveryModule, NestFactory} from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {HealthModule} from "./modules/health.module";
import {UserModule} from "./modules/user.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const options = new DocumentBuilder()
      .setTitle('API registry of patients')
      .setVersion('0.0.1')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, options, {include: [AppModule, DiscoveryModule, HealthModule, UserModule]});
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
