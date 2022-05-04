import { DATA_SUCCESSFUL, DATA_FAIL } from "./question.types";
import { getQuestionByID } from "../../services/questions.service";

export const getQuestion = (id) => (dispatch) => {
  return getQuestionByID(id).then(
    (res) => {
      dispatch({ type: DATA_SUCCESSFUL, payload: res.result });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: DATA_FAIL,
      });

      return Promise.reject(error);
    }
  );
};
