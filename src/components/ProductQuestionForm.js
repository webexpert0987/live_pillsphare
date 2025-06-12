import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import React from "react";

function ProductQuestionForm({
  setQuestionAnswers,
  questionAnswers,
  fieldErrors,
}) {
  return (
    <Card
      sx={{
        mt: 4,
      }}
    >
      <CardHeader title="Answer the following questions" />
      <CardContent>
        <TextField
          label="Who is the medicine for?"
          fullWidth
          margin="dense"
          required
          value={questionAnswers.who}
          onChange={(e) =>
            setQuestionAnswers({ ...questionAnswers, who: e.target.value })
          }
          error={!!fieldErrors.who}
          helperText={fieldErrors.who}
        />
        <TextField
          label="What are the symptoms?"
          fullWidth
          margin="dense"
          required
          value={questionAnswers.symptoms}
          onChange={(e) =>
            setQuestionAnswers({
              ...questionAnswers,
              symptoms: e.target.value,
            })
          }
          error={!!fieldErrors.symptoms}
          helperText={fieldErrors.symptoms}
        />
        <TextField
          label="How long have you had the symptoms?"
          fullWidth
          margin="dense"
          required
          value={questionAnswers.duration}
          onChange={(e) =>
            setQuestionAnswers({
              ...questionAnswers,
              duration: e.target.value,
            })
          }
          error={!!fieldErrors.duration}
          helperText={fieldErrors.duration}
        />
        <TextField
          label="What action has been taken?"
          fullWidth
          margin="dense"
          required
          value={questionAnswers.action}
          onChange={(e) =>
            setQuestionAnswers({
              ...questionAnswers,
              action: e.target.value,
            })
          }
          error={!!fieldErrors.action}
          helperText={fieldErrors.action}
        />
        <TextField
          label="Are you taking any other medication?"
          fullWidth
          margin="dense"
          required
          value={questionAnswers.medication}
          onChange={(e) =>
            setQuestionAnswers({
              ...questionAnswers,
              medication: e.target.value,
            })
          }
          error={!!fieldErrors.medication}
          helperText={fieldErrors.medication}
        />
      </CardContent>
    </Card>
  );
}

export default ProductQuestionForm;
