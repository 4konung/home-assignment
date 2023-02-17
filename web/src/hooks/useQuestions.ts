import { useMutation } from "react-query";

import questionsApi from "../api/questions";
import { AnswerContent } from "../api/types";

export const useQuestions = () => {
  return useMutation<AnswerContent[], unknown, string>(
    "questions",
    questionsApi.getAnswer
  );
};
