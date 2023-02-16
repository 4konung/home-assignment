import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionsService } from '@root/modules/questions/questions.service';
import { AskQuestionInput } from '@root/modules/questions/dto/ask-question.input';
import { AskQuestionOutput } from '@root/modules/questions/dto/ask-question.output';

@Controller('questions')
@ApiTags('Questions')
@UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
export class QuestionsController {
  constructor(
    @Inject(QuestionsService)
    private readonly questionsService: QuestionsService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Get answer data.' })
  @ApiOkResponse({ type: AskQuestionOutput, isArray: true })
  public askQuestion(
    @Body() input: AskQuestionInput,
  ): Promise<AskQuestionOutput[]> {
    return this.questionsService.getAnswer(input.question);
  }
}
