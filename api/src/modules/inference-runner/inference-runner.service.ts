import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InferenceRunnerConfiguration } from '@root/modules/inference-runner/inference-runner.config';
import { INFERENCE_AUTH_HEADER_NAME } from '@root/modules/inference-runner/constants';
import { AskOutput } from '@root/modules/inference-runner/dto/ask.output';
import { AnswerChunkDto } from '@root/modules/inference-runner/dto/answer-chunk.dto';

@Injectable()
export class InferenceRunnerService {
  private readonly apiUrl: string;
  private readonly apiKeys: string[];
  private keyIdx: number;
  private readonly defaultHeaders: Record<string, string>;
  private readonly logger = new Logger(InferenceRunnerService.name);

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
    @Inject(HttpService)
    private readonly httpService: HttpService,
  ) {
    const inferenceRunnerConfig =
      this.configService.get<InferenceRunnerConfiguration>('inferenceRunner');

    this.apiUrl = inferenceRunnerConfig.apiUrl;
    this.apiKeys = inferenceRunnerConfig.apiKeys;
    this.keyIdx = 0;
    this.defaultHeaders = {};
  }

  public async getAnswerChunks(question: string): Promise<AnswerChunkDto[]> {
    try {
      await this.authorize();
      const data = await this.ask(question);

      return data.chunks || [];
    } catch (e) {
      this.logger.error('Failed to get answer chunks.', e?.stack);

      throw new BadRequestException('Failed to get answer chunks.');
    }
  }

  private async ask(question: string): Promise<AskOutput> {
    const payload = {
      question,
    };

    const requestConfig = {
      headers: this.defaultHeaders,
    };

    const url = `${this.apiUrl}/ask`;

    const { data } = await firstValueFrom(
      this.httpService.post<AskOutput>(url, payload, requestConfig),
    );

    return data;
  }

  private authorize() {
    this.defaultHeaders[INFERENCE_AUTH_HEADER_NAME] =
      this.apiKeys[this.keyIdx % this.apiKeys.length];
    this.keyIdx += 1;
  }
}
