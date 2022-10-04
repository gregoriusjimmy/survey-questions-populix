import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

type TQuestion = {
  question: string;
  rule: "MAY_SELECT" | "MUST_SELECT";
  optionAnswers: Array<String>;
};

function App() {
  const [inputQuestion, setInputQuestion] = useState<TQuestion>({
    question: "",
    rule: "MAY_SELECT",
    optionAnswers: [],
  });
  const [inputOptionAnswer, setInputOptionAnswer] = useState("");

  const handleAddOptionAnswer = () => {
    if (!inputOptionAnswer) return;
    setInputQuestion({
      ...inputQuestion,
      optionAnswers: [...inputQuestion.optionAnswers, inputOptionAnswer],
    });
  };

  const handleAddQuestion = () => {
    const questions = JSON.parse(localStorage.getItem("questions"));

    localStorage.setItem("questions", JSON.stringify(items));
  };
  return (
    <Container>
      <TextField label='Question' variant='outlined' />
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Rule</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={inputQuestion.rule}
          label='Age'
          // onChange={handleChange}
        >
          <MenuItem value={"MAY_SELECT"}>May Select</MenuItem>
          <MenuItem value={"MUST_SELECT"}>Must Select</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <TextField
          onChange={(e) => setInputOptionAnswer(e.target.value)}
          label='Answer option'
          variant='outlined'
        />
        <Button variant='contained' onClick={() => handleAddOptionAnswer()}>
          Add Option
        </Button>
      </Box>
      <Button variant='contained'>Submit Question</Button>
    </Container>
  );
}

export default App;
