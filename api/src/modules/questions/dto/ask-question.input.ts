import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AskQuestionInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  question: string;
}
