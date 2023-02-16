import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ChunkHolderConfiguration } from '@root/modules/chunk-holder/chunk-holder.config';
import { CHUNKS_X_HEADER_NAME } from '@root/modules/chunk-holder/constants';
import { firstValueFrom } from 'rxjs';
import { GenerateTokenDto } from '@root/modules/chunk-holder/dto/generate-token.dto';

@Injectable()
export class ChunkHolderService {
  private readonly apiUrl: string;
  private readonly apiKeys: string[];
  private keyIdx: number;
  private readonly defaultHeaders: Record<string, string>;
  private readonly logger = new Logger(ChunkHolderService.name);

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
    @Inject(HttpService)
    private readonly httpService: HttpService,
  ) {
    const chunkHolderConfig =
      this.configService.get<ChunkHolderConfiguration>('chunkHolder');

    this.apiUrl = chunkHolderConfig.apiUrl;
    this.apiKeys = chunkHolderConfig.apiKeys;
    this.keyIdx = 0;
    this.defaultHeaders = {};
  }

  public async getChunkContentById(chunkId: string): Promise<string> {
    try {
      await this.authorize();

      const requestConfig = {
        headers: this.defaultHeaders,
      };

      const url = `${this.apiUrl}/chunks/${chunkId}`;

      const { data } = await firstValueFrom(
        this.httpService.get<string>(url, requestConfig),
      );

      return data;
    } catch (e) {
      this.logger.error('Failed to get chunk by id', e?.stack);

      throw new BadRequestException('Failed to get chunk by id');
    }
  }

  private async authorize() {
    const headers = {
      [CHUNKS_X_HEADER_NAME]: this.apiKeys[this.keyIdx % this.apiKeys.length],
    };
    this.keyIdx += 1;

    const url = `${this.apiUrl}/auth/generate-token`;

    const { data } = await firstValueFrom(
      this.httpService.post<GenerateTokenDto>(url, undefined, { headers }),
    );

    this.defaultHeaders['Authorization'] = data.token;
  }
}
