import React from "react";
import useClassroom from "../../hooks/useClassroom";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { message } from "antd";
//import QuestionHeader from './QuestionHeader';
import { Grid } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Paper, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import CloseIcon from "@material-ui/icons/Close";
import Radio from "@material-ui/core/Radio";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccordionActions from "@material-ui/core/AccordionActions";
import Divider from "@material-ui/core/Divider";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import ImageUploadModal from "./ImageUploadModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";
import Checkbox from "@material-ui/core/Checkbox";
import { createHomework } from "../../services/homework.service";

function CreateExam2(params) {
  const [questions, setQuestions] = React.useState([]);
  const [openUploadImagePop, setOpenUploadImagePop] = React.useState(false);
  const [imageContextData, setImageContextData] = React.useState({
    question: null,
    option: null,
  });

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    time: 60,
    startTime: moment().format("YYYY-MM-DDTHH:mm"),
  });
  const history = useHistory();

  const [loadingFormData, setLoadingFormData] = React.useState(true);
  const classroom = useClassroom(params.match.params.id);

  // React.useEffect(() => {
  //   if (props.formData.questions !== undefined) {
  //     //console.log(props.formData.questions.length);
  //     if (props.formData.questions.length === 0) {
  //       setQuestions([
  //         {
  //           questionText: "Question",
  //           options: [{ optionText: "Option 1" }],
  //           open: false,
  //         },
  //       ]);
  //     } else {
  //       setQuestions(props.formData.questions);
  //     }
  //     setLoadingFormData(false);
  //   }
  //   setFormData(props.formData);
  // }, [props.formData]);

  function saveQuestions() {
    var data = {
      title: formData.title,
      description: formData.description,
      time: formData.time,
      startTime: formData.startTime,
      questions: questions,
      classroom: params.match.params.id,
    };
    console.log(data);

    createHomework(data).then(
      (result) => {
        console.log(result);
        history.push(`/classroom/${params.match.params.id}/homework`);
        message.success("Tạo bài tập thành công !");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      }
    );
  }

  function checkImageHereOrNotForQuestion(gg) {
    // console.log(gg);
    if (gg === undefined || gg === "") {
      return false;
    } else {
      return true;
    }
  }

  function checkImageHereOrNotForOption(gg) {
    // console.log(gg);
    if (gg === undefined || gg === "") {
      return false;
    } else {
      return true;
    }
  }

  function addMoreQuestionField() {
    expandCloseAll();

    setQuestions((questions) => [
      ...questions,
      {
        questionText: "Câu hỏi",
        options: [{ optionText: "Câu trả lời 1", isCorrect: false }],
        open: true,
      },
    ]);
  }

  function copyQuestion(i) {
    let qs = [...questions];
    expandCloseAll();
    const myNewOptions = [];
    qs[i].options.forEach((opn) => {
      if (opn.optionImage !== undefined || opn.optionImage !== "") {
        var opn1new = {
          optionText: opn.optionText,
          optionImage: opn.optionImage,
        };
      } else {
        var opn1new = {
          optionText: opn.optionText,
        };
      }
      myNewOptions.push(opn1new);
    });
    const qImage = qs[i].questionImage || "";
    var newQuestion = {
      questionText: qs[i].questionText,
      questionImage: qImage,
      options: myNewOptions,
      open: true,
    };
    setQuestions((questions) => [...questions, newQuestion]);
  }

  const handleImagePopupOpen = () => {
    setOpenUploadImagePop(true);
  };

  function uploadImage(i, j) {
    setImageContextData({
      question: i,
      option: j,
    });
    handleImagePopupOpen();
  }

  function updateImageLink(link, context) {
    var optionsOfQuestion = [...questions];
    var i = context.question;

    if (context.option == null) {
      optionsOfQuestion[i].questionImage = link;
    } else {
      var j = context.option;
      optionsOfQuestion[i].options[j].optionImage = link;
    }
    setQuestions(optionsOfQuestion);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function handleOptionValue(text, i, j) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }

  function handleQuestionValue(text, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
    setQuestions(optionsOfQuestion);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];

    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );

    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function showAsQuestion(i) {
    let qs = [...questions];
    qs[i].open = false;
    setQuestions(qs);
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({
        optionText: "Câu trả lời " + (optionsOfQuestion[i].options.length + 1),
        isCorrect: false,
      });
    } else {
      console.log("Max  5 options ");
    }
    //console.log(optionsOfQuestion);
    setQuestions(optionsOfQuestion);
  }

  function removeOption(i, j) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length > 1) {
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion);
      console.log(i + "__" + j);
    }
  }

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }

  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  }

  const chooseTrueQuesion = (i, j) => {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].isCorrect =
      !optionsOfQuestion[i].options[j].isCorrect;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  };

  function questionsUI() {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ width: "100%", marginBottom: "-7px" }}></div>
                <Accordion
                  onChange={() => {
                    handleExpand(i);
                  }}
                  expanded={questions[i].open}
                >
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    elevation={1}
                    style={{ width: "100%" }}
                  >
                    {!questions[i].open ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          marginLeft: "3px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        {/* <TextField id="standard-basic" label=" " value="Question" InputProps={{ disableUnderline: true }} />  */}

                        <Typography
                          variant="subtitle1"
                          style={{ marginLeft: "0px" }}
                        >
                          {i + 1}. {ques.questionText}
                        </Typography>

                        {ques.questionImage !== "" ? (
                          <div>
                            <img
                              src={ques.questionImage}
                              width="400px"
                              height="auto"
                            />
                            <br></br>
                          </div>
                        ) : (
                          ""
                        )}

                        {ques.options.map((op, j) => (
                          <div key={j}>
                            <div style={{ display: "flex" }}>
                              <FormControlLabel
                                disabled
                                control={
                                  <Radio
                                    checked={op.isCorrect}
                                    style={{ marginRight: "3px" }}
                                  />
                                }
                                label={
                                  <Typography style={{ color: "#555555" }}>
                                    {ques.options[j].optionText}
                                  </Typography>
                                }
                              />
                            </div>

                            <div>
                              {op.optionImage !== "" ? (
                                <img
                                  src={op.optionImage}
                                  width="160px"
                                  height="auto"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </AccordionSummary>

                  <AccordionDetails>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "15px",
                        marginTop: "-15px",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography style={{ marginTop: "10px" }}>
                          {`${i + 1}.  `}
                        </Typography>
                        <TextField
                          fullWidth={true}
                          placeholder="Nhập câu hỏi"
                          style={{ marginBottom: "10px" }}
                          minRows={2}
                          maxRows={20}
                          multiline={true}
                          value={ques.questionText}
                          variant="filled"
                          onChange={(e) => {
                            handleQuestionValue(e.target.value, i);
                          }}
                        />
                        <IconButton
                          aria-label="upload image"
                          onClick={() => {
                            uploadImage(i, null);
                          }}
                        >
                          <CropOriginalIcon />
                        </IconButton>
                      </div>

                      <div>
                        {checkImageHereOrNotForQuestion(ques.questionImage) ? (
                          <div>
                            <div
                              style={{
                                width: "150px",
                                display: "flex",
                                alignItems: "flex-start",
                                paddingLeft: "20px",
                              }}
                            >
                              <img
                                src={ques.questionImage}
                                width="150px"
                                height="auto"
                              />
                              <IconButton
                                style={{
                                  marginLeft: "-15px",
                                  marginTop: "-15px",
                                  zIndex: 999,
                                  backgroundColor: "lightgrey",
                                  color: "grey",
                                }}
                                size="small"
                                onClick={() => {
                                  updateImageLink("", {
                                    question: i,
                                    option: null,
                                  });
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div style={{ width: "100%" }}>
                        {ques.options.map((op, j) => (
                          <div key={j}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: "-10px",
                                justifyContent: "space-between",
                                paddingTop: "5px",
                                paddingBottom: "5px",
                              }}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={op.isCorrect}
                                    onChange={() => {
                                      chooseTrueQuesion(i, j);
                                    }}
                                  />
                                }
                              />

                              {/* <Radio onClick={chooseTrueQuesion(ques, op ,j)} /> */}
                              <TextField
                                fullWidth={true}
                                placeholder="Nhập câu trả lời"
                                style={{ marginTop: "5px" }}
                                value={ques.options[j].optionText}
                                onChange={(e) => {
                                  handleOptionValue(e.target.value, i, j);
                                }}
                              />

                              <IconButton
                                aria-label="Tải ảnh lên"
                                onClick={() => {
                                  uploadImage(i, j);
                                }}
                              >
                                <CropOriginalIcon />
                              </IconButton>

                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  removeOption(i, j);
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            </div>

                            <div>
                              {checkImageHereOrNotForOption(op.optionImage) ? (
                                <div>
                                  <div
                                    style={{
                                      width: "150px",
                                      display: "flex",
                                      alignItems: "flex-start",
                                      paddingLeft: "20px",
                                    }}
                                  >
                                    <img
                                      src={op.optionImage}
                                      width="90px"
                                      height="auto"
                                    />

                                    <IconButton
                                      style={{
                                        marginLeft: "-15px",
                                        marginTop: "-15px",
                                        zIndex: 999,
                                        backgroundColor: "lightgrey",
                                        color: "grey",
                                      }}
                                      size="small"
                                      onClick={() => {
                                        updateImageLink("", {
                                          question: i,
                                          option: j,
                                        });
                                      }}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </div>
                                  <br></br>
                                  <br></br>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {ques.options.length < 5 ? (
                        <div>
                          <FormControlLabel
                            disabled
                            control={<Radio />}
                            label={
                              <Button
                                size="small"
                                onClick={() => {
                                  addOption(i);
                                }}
                                style={{
                                  textTransform: "none",
                                  marginLeft: "-5px",
                                }}
                              >
                                Thêm câu trả lời
                              </Button>
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      <br></br>
                      <br></br>

                      <Typography variant="body2" style={{ color: "grey" }}>
                        Bạn có thể thêm tối đa 5 tùy chọn. Chọn vào tích ở đầu
                        câu để đánh dấu đáp án đúng.
                      </Typography>
                    </div>
                  </AccordionDetails>

                  <Divider />

                  <AccordionActions>
                    <IconButton
                      aria-label="View"
                      onClick={() => {
                        showAsQuestion(i);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton
                      aria-label="Copy"
                      onClick={() => {
                        copyQuestion(i);
                      }}
                    >
                      <FilterNoneIcon />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />

                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        deleteQuestion(i);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>

                    <IconButton aria-label="Image">
                      <MoreVertIcon />
                    </IconButton>
                  </AccordionActions>
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

  return (
    <div
      style={{ marginTop: "15px", marginBottom: "7px", paddingBottom: "30px" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid xs={10} item style={{ width: "100%" }}>
          <Grid style={{ borderTop: "10px solid teal", borderRadius: 10 }}>
            <div>
              <div>
                <Paper elevation={2} style={{ width: "100%" }}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          paddingLeft: "20px",
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          label="Tên bài kiểm tra"
                          required
                          style={{
                            fontFamily: "sans-serif Roboto",
                            marginBottom: "15px",
                          }}
                          value={formData.title}
                          onChange={(e) => {
                            setFormData({ ...formData, title: e.target.value });
                          }}
                        />

                        <TextField
                          id="standard-basic"
                          label="Mô tả"
                          size="small"
                          value={formData.description}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            });
                          }}
                          style={{
                            fontFamily: "sans-serif Roboto",
                            marginBottom: "15px",
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0 20px",
                        }}
                      >
                        <TextField
                          id="datetime-local"
                          label="Thời gian bắt đầu làm bài"
                          type="datetime-local"
                          value={formData.startTime}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              startTime: e.target.value,
                            });
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          style={{
                            fontFamily: "sans-serif Roboto",
                            marginBottom: "15px",
                          }}
                        />
                        <TextField
                          id="standard-number"
                          label="Thời gian (phút)"
                          type="number"
                          value={formData.time}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => {
                            setFormData({ ...formData, time: e.target.value });
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </div>
          </Grid>

          <Grid style={{ paddingTop: "10px" }}>
            <div>
              <ImageUploadModal
                handleImagePopOpen={openUploadImagePop}
                handleImagePopClose={() => {
                  setOpenUploadImagePop(false);
                }}
                updateImageLink={updateImageLink}
                contextData={imageContextData}
                classroom={classroom}
              />

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {questionsUI()}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={addMoreQuestionField}
                  endIcon={<AddCircleIcon />}
                  style={{ margin: "5px" }}
                >
                  Thêm câu hỏi{" "}
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={saveQuestions}
                  style={{ margin: "15px" }}
                  endIcon={<SaveIcon />}
                >
                  Lưu bài kiểm tra{" "}
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default CreateExam2;
