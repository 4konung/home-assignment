import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface IForm {
  search: string;
}

export type AskQuestionFormProps = {
  onSubmit: (values: IForm) => void;
  loading?: boolean;
};

const AskQuestionForm = (props: AskQuestionFormProps) => {
  const { onSubmit, loading } = props;
  const { control, handleSubmit, formState } = useForm<IForm>({
    defaultValues: {
      search: "",
    },
  });

  const { errors } = formState;

  return (
    <Paper
      sx={{ py: 4, px: 2, my: 4 }}
      component="form"
      elevation={0}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="search"
        control={control}
        rules={{ required: "This field is required." }}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.search?.message}
            helperText={errors.search?.message}
            fullWidth
            margin="normal"
            placeholder="Question text"
            inputProps={{ "aria-label": "question text area" }}
          />
        )}
      />

      <Button
        fullWidth
        disabled={loading}
        sx={{ margin: "auto" }}
        type="submit"
        variant="contained"
      >
        Search
      </Button>
    </Paper>
  );
};

export default React.memo(AskQuestionForm);
