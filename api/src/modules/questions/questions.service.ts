import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InferenceRunnerService } from '@root/modules/inference-runner/inference-runner.service';
import { ConfigService } from '@nestjs/config';
import { AppConfiguration } from '@root/common/config/app.config';
import { filterChunksByConfidence } from '@root/modules/questions/questions.utils';
import { ChunkHolderService } from '@root/modules/chunk-holder/chunk-holder.service';
import { AnswerChunkDto } from '@root/modules/inference-runner/dto/answer-chunk.dto';
import { AskQuestionOutput } from '@root/modules/questions/dto/ask-question.output';

@Injectable()
export class QuestionsService {
  private readonly confidenceThreshold: number;
  private readonly logger = new Logger(QuestionsService.name);

  constructor(
    @Inject(InferenceRunnerService)
    private readonly inferenceRunnerService: InferenceRunnerService,
    @Inject(ChunkHolderService)
    private readonly chunkHolderService: ChunkHolderService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    const appConfig = this.configService.get<AppConfiguration>('app');

    this.confidenceThreshold = appConfig.confidenceThreshold;
  }

  public async getAnswer(question: string) {
    try {
      const chunks = await this.inferenceRunnerService.getAnswerChunks(
        question,
      );

      const filteredChunks = filterChunksByConfidence(
        chunks,
        this.confidenceThreshold,
      );

      return await this.getChunkContent(filteredChunks);
    } catch (e) {
      this.logger.error('Failed to get answer.', e?.stack);

      throw new BadRequestException('Failed to get answer.');
    }
  }

  public async getChunkContent(
    chunks: AnswerChunkDto[],
  ): Promise<AskQuestionOutput[]> {
    const promises = chunks.map(async (chunk) => {
      const content = await this.chunkHolderService.getChunkContentById(
        chunk.chunkId,
      );
      return { ...chunk, content };
    });

    return await Promise.all(promises);
  }
}
