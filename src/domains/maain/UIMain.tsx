import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TQuestion } from "./ViewMain";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

export const FormQuestion = ({
  inputQuestion,
  inputQuestionId,
  inputRule,
  tempOptionAnswers,
  inputOptionAnswer,
  setInputQuestion,
  handleAddOptionAnswer,
  handleSubmitQuestion,
  handleChangeRule,
  handleDeleteTempOption,
  setInputOptionAnswer,
  handleResetInputs,
}: {
  inputQuestion: string;
  inputOptionAnswer: string;
  inputRule: TQuestion["rule"];
  inputQuestionId: string;
  tempOptionAnswers: TQuestion["optionAnswers"];
  setInputQuestion: React.Dispatch<React.SetStateAction<string>>;
  setInputOptionAnswer: React.Dispatch<React.SetStateAction<string>>;
  handleResetInputs: () => void;
  handleDeleteTempOption: (option: string) => void;
  handleChangeRule: (e: SelectChangeEvent) => void;
  handleSubmitQuestion: () => void;
  handleAddOptionAnswer: () => void;
}) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant='h4' sx={{ marginBottom: 4 }}>
          Question
        </Typography>
        <Box sx={{ marginBottom: 4, display: "flex" }}>
          <TextField
            sx={{ width: "80%", marginRight: 4 }}
            label='Question'
            variant='outlined'
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
          />
          <TextField
            label='ID'
            disabled
            variant='filled'
            value={inputQuestionId}
          />
        </Box>
        <FormControl sx={{ width: "30%" }}>
          <InputLabel id='rule-label'>Rule</InputLabel>
          <Select
            labelId='rule-label'
            id='rule-select'
            value={inputRule}
            label='Age'
            onChange={(e) => handleChangeRule(e)}
          >
            <MenuItem value={"MAY_SELECT"}>May Select</MenuItem>
            <MenuItem value={"MUST_SELECT"}>Must Select</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ marginY: 4, display: "flex" }}>
          <TextField
            sx={{ width: "80%", marginRight: 4 }}
            value={inputOptionAnswer}
            onChange={(e) => setInputOptionAnswer(e.target.value)}
            label='Answer option'
            variant='outlined'
          />
          <Button variant='contained' onClick={() => handleAddOptionAnswer()}>
            Add Option
          </Button>
        </Box>
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant='h5' sx={{ marginBottom: 2 }}>
            Answer options:
          </Typography>
          <Box
            sx={{ border: "1px solid gray", borderRadius: 2, minHeight: 100 }}
          >
            <List>
              {tempOptionAnswers.map((option, idx) => (
                <ListItem
                  key={idx}
                  secondaryAction={
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => handleDeleteTempOption(option)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={option} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
      <Button
        sx={{ marginBottom: 2 }}
        fullWidth
        variant='contained'
        color='error'
        onClick={() => handleResetInputs()}
      >
        Reset
      </Button>
      <Button
        fullWidth
        variant='contained'
        color={inputQuestionId ? "success" : "info"}
        onClick={() => handleSubmitQuestion()}
      >
        {inputQuestionId ? "Edit" : "Add"} Question
      </Button>
    </>
  );
};

export const QuestionList = ({
  questions,
  handleDeleteQuestion,
  handleEditQuestion,
  handleOnDragEnd,
}: {
  questions: TQuestion[];
  handleEditQuestion: (question: TQuestion) => void;
  handleDeleteQuestion: (id: number) => void;
  handleOnDragEnd: (result: DropResult) => void;
}) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant='h4'>Question List</Typography>
      <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
        <Droppable droppableId='droppable-question' direction='vertical'>
          {(provided) => (
            <ul
              style={{ listStyle: "none", paddingLeft: 0 }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {questions.map((question, index) => {
                return (
                  <Draggable
                    key={question.id}
                    draggableId={question.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        component='li'
                        sx={{
                          padding: 4,
                          display: "flex",
                          flexDirection: "column",
                          border: "1px solid gray",
                        }}
                        style={{ ...provided.draggableProps.style }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant='h6'>
                            {question.question}
                          </Typography>
                          <Typography variant='subtitle1'>
                            {question.rule === "MUST_SELECT"
                              ? "Required"
                              : "Not Required"}
                          </Typography>
                        </Box>
                        <ul>
                          {question.optionAnswers.map((option, idx) => (
                            <Typography
                              variant='body1'
                              component='li'
                              key={idx}
                            >
                              {option}
                            </Typography>
                          ))}
                        </ul>
                        <Box sx={{ display: "flex", alignSelf: "flex-end" }}>
                          <IconButton
                            aria-label='delete'
                            onClick={() => handleEditQuestion(question)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => handleDeleteQuestion(question.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};
