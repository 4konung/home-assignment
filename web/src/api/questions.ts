import axios from "axios";
import { AnswerContent } from './types';

const API_URL = process.env.REACT_APP_API_URL;

export default {
  getAnswer: async (question: string) => {
    const url = `${API_URL}/api/questions`;
    const { data } = await axios.post<AnswerContent[]>(url, { question });

    return data;
  },
};
