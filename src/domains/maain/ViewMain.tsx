import { Container, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";

import { FormQuestion, QuestionList } from "./UIMain";
import { useLocalStorage } from "../../useLocalStorage";

export type TQuestion = {
  id: number;
  question: string;
  rule: "MAY_SELECT" | "MUST_SELECT";
  optionAnswers: Array<string>;
};

export const ViewMain = () => {
  const [questions, setQuestions] = useLocalStorage<TQuestion[]>(
    "questions",
    []
  );
  const [inputQuestion, setInputQuestion] = useState("");
  const [inputOptionAnswer, setInputOptionAnswer] = useState("");
  const [tempOptionAnswers, setTempOptionAnswers] = useState<
    TQuestion["optionAnswers"]
  >([]);
  const [inputRule, setInputRule] = useState<TQuestion["rule"]>("MAY_SELECT");
  const [inputQuestionId, setInputQuestionId] = useState<string>("");

  const handleAddOptionAnswer = () => {
    if (!inputOptionAnswer) return;
    setTempOptionAnswers([...tempOptionAnswers, inputOptionAnswer]);
    setInputOptionAnswer("");
  };

  const handleResetInputs = () => {
    setTempOptionAnswers([]);
    setInputRule("MAY_SELECT");
    setInputOptionAnswer("");
    setInputQuestion("");
    setInputQuestionId("");
  };

  const handleSubmitQuestion = () => {
    if (!inputQuestion || !tempOptionAnswers) return;
    const inputs = {
      question: inputQuestion,
      rule: inputRule,
      optionAnswers: tempOptionAnswers,
    };

    if (inputQuestionId) {
      const newQuestions = questions.map((question) =>
        question.id === Number(inputQuestionId)
          ? {
              id: question.id,
              ...inputs,
            }
          : question
      );
      setQuestions(newQuestions);
    } else {
      setQuestions([
        ...questions,
        {
          id: Math.floor(Math.random() * 10000) + 1,
          ...inputs,
        },
      ]);
    }
    handleResetInputs();
  };

  const handleChangeRule = (event: SelectChangeEvent) => {
    setInputRule(event.target.value as TQuestion["rule"]);
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  };

  const handleDeleteTempOption = (optionName: string) => {
    // better to find by id here
    setTempOptionAnswers(
      tempOptionAnswers.filter((option) => option !== optionName)
    );
  };

  const handleEditQuestion = (question: TQuestion) => {
    setInputQuestionId(question.id.toString());
    setInputQuestion(question.question);
    setTempOptionAnswers(question.optionAnswers);
    setInputRule(question.rule);
  };

  const handleDeleteQuestion = (questionId: number) => {
    setQuestions(questions.filter((question) => question.id !== questionId));
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      <FormQuestion
        handleAddOptionAnswer={handleAddOptionAnswer}
        handleChangeRule={handleChangeRule}
        handleSubmitQuestion={handleSubmitQuestion}
        handleDeleteTempOption={handleDeleteTempOption}
        handleResetInputs={handleResetInputs}
        setInputOptionAnswer={setInputOptionAnswer}
        inputQuestion={inputQuestion}
        inputOptionAnswer={inputOptionAnswer}
        inputQuestionId={inputQuestionId}
        inputRule={inputRule}
        setInputQuestion={setInputQuestion}
        tempOptionAnswers={tempOptionAnswers}
      />
      <QuestionList
        questions={questions}
        handleDeleteQuestion={handleDeleteQuestion}
        handleEditQuestion={handleEditQuestion}
        handleOnDragEnd={handleOnDragEnd}
      />
    </Container>
  );
};
