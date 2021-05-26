import produce from "immer";
import { createAction, handleActions } from "redux-actions";

// 상태
const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INLTIALIZE_FORM = "auth/INLTIALIZE_FORM";

export const changeField = createAction(
  CHANGE_FIELD, //type
  ({ form, value }) => ({
    form,
    value,
  })
);

export const initializeForm = createAction(INLTIALIZE_FORM, (form) => form); //register

const initialState = {
  register: {
    username: "",
    email: "",
  },
  login: {
    email: "",
  },
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, value } }) =>
      produce(state, (draft) => {
        draft[form] = value; //state.register = joinReqDto
      }),
    [INLTIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
  },
  initialState
);

export default auth;
