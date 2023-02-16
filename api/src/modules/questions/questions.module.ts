import { Module } from '@nestjs/common';
import { InferenceRunnerModule } from '@root/modules/inference-runner/inference-runner.module';
import { ChunkHolderModule } from '@root/modules/chunk-holder/chunk-holder.module';

import { QuestionsController } from '@root/modules/questions/questions.controller';
import { QuestionsService } from '@root/modules/questions/questions.service';

@Module({
  imports: [InferenceRunnerModule, ChunkHolderModule],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
