import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AskQuestionForm from "./components/AskQuestionForm";
import AnswersList from "./components/AnswersList";
import { useQuestions } from "./hooks/useQuestions";

function App() {
  const { data, isLoading, mutate } = useQuestions();

  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: "100vh" }}>
        <AskQuestionForm
          onSubmit={({ search }) => mutate(search)}
          loading={isLoading}
        />
        <AnswersList answers={data} loading={isLoading} />
      </Box>
    </Container>
  );
}

export default App;
