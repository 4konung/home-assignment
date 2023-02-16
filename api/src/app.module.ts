import { Module } from '@nestjs/common';
import { ConfigModule } from '@root/common/config/config.module';
import { QuestionsModule } from '@root/modules/questions/questions.module';

@Module({
  imports: [ConfigModule, QuestionsModule],
})
export class AppModule {}
