import { AnswerChunkDto } from '@root/modules/inference-runner/dto/answer-chunk.dto';

export const filterChunksByConfidence = (
  chunks: AnswerChunkDto[],
  thresholdValue: number,
): AnswerChunkDto[] =>
  chunks.filter((chunk) => chunk.confidence >= thresholdValue);
