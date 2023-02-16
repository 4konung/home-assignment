import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { InferenceRunnerService } from '@root/modules/inference-runner/inference-runner.service';

@Module({
  imports: [HttpModule],
  providers: [InferenceRunnerService],
  exports: [InferenceRunnerService],
})
export class InferenceRunnerModule {}
