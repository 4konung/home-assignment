import { AnswerChunkDto } from '@root/modules/inference-runner/dto/answer-chunk.dto';

export class AskQuestionOutput extends AnswerChunkDto {
  content: string;
}
