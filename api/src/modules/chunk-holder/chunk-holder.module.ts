import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ChunkHolderService } from '@root/modules/chunk-holder/chunk-holder.service';

@Module({
  imports: [HttpModule],
  providers: [ChunkHolderService],
  exports: [ChunkHolderService],
})
export class ChunkHolderModule {}
