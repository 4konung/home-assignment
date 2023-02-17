import * as React from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { AnswerContent } from "../api/types";

export type AnswersListProps = {
  answers?: AnswerContent[];
  loading?: boolean;
};

const AnswersList = (props: AnswersListProps) => {
  const { answers, loading } = props;

  return (
    <Box sx={{ width: "100%", display: loading ? "flex" : undefined }}>
      {loading ? (
        <CircularProgress sx={{ mx: "auto" }} />
      ) : (
        answers?.map(({ chunkId, confidence, content }) => (
          <Card key={chunkId} sx={{ my: 2 }}>
            <CardContent>
              <Box
                sx={{ display: "block" }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </CardContent>
            <Divider />
            <CardContent>
              <Typography
                variant="caption"
                component="p"
              >{`Confidence: ${confidence}%`}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default AnswersList;
