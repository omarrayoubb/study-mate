import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// collect all exceptions messages and create custom exception and enum messages instead of hardcoded ones
// thank you


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
