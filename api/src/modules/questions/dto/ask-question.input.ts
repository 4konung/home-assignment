import { IsNotEmpty, IsString } from 'class-validator';

export class AskQuestionInput {
  @IsString()
  @IsNotEmpty()
  question: string;
}
