import { AnswerChunkDto } from '@root/modules/inference-runner/dto/answer-chunk.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class AskQuestionOutput extends PickType(AnswerChunkDto, ['confidence', 'chunkId']) {
  @ApiProperty()
  confidence: number;

  @ApiProperty()
  chunkId: string;

  @ApiProperty()
  content: string;
}
