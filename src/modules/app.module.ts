import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import {DiseaseModule} from "./disease.module";

@Module({
  imports: [DiseaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
