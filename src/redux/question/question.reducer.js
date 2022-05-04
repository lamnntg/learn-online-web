import { DATA_SUCCESSFUL, DATA_FAIL } from "./question.types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DATA_SUCCESSFUL:
      return {
        ...state,
        data: payload,
        reading: true,
      };
    case DATA_FAIL:
      return {
        ...state,
        data: payload,
        reading: false,
      };
    default:
      return state;
  }
}
