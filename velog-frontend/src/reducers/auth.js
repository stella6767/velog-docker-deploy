import produce from "immer";
import { createAction, handleActions } from "redux-actions";

// 액션 타입 정의
const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INLTIALIZE_FORM = "auth/INLTIALIZE_FORM";

//액션 생성 함수
export const changeField = createAction(
  CHANGE_FIELD, //type
  ({ form, value }) => ({
    form,
    value,
  })
);

export const initializeForm = createAction(INLTIALIZE_FORM, (form) => form); //register

//초기 상태
const initialState = {
  register: {
    username: "",
    email: "",
  },
  login: {
    email: "",
  },
};

//리듀서
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, value } }) =>
      produce(state, (draft) => {
        draft[form] = value; //state.register = values
      }),
    [INLTIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
  },
  initialState
);

export default auth;
