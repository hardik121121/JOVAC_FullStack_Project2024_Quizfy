import * as types from "./actiontype.js";

const init = {
  loading: false,
  userId: null,
  adminId: null,
  adminName: null,
  error: "",
  userName: null,
  quizTitle: "",
  QuizData: [],
  result: [],
  questions: [],
  Alluser: [],
  ans: [],
  userAttempts: [
    {
      date: "2024-11-01",
      score: 85,
      timeSpent: 15,
      status: "Pass",
      difficulty: "Medium",
    },
    {
      date: "2024-11-10",
      score: 70,
      timeSpent: 20,
      status: "Fail",
      difficulty: "Hard",
    },
  ],
};

export const QuizReducer = (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_QUIZ_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        questions: [...state.questions, payload],
      };
    case types.FETCH_QUIZ_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case types.FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        QuizData: payload,
      };
    case types.FETCH_QUIZ_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case types.GET_CURRENT_QUIZ_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case types.GET_CURRENT_QUIZ_SUCCESS:
      return {
        ...state,
        currentQuiz: payload,
        error: "",
        loading: false,
      };
    case types.GET_CURRENT_QUIZ_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case types.GETUSERID:
      return {
        ...state,
        userId: payload,
      };
    case types.GETUSERNAME:
      return {
        ...state,
        userName: payload,
      };
    case types.LOGOUTUSER:
      return {
        ...state,
        userId: null,
        userName: null,
        adminName: null,
        adminId: null,
      };
    case types.GETADMINID:
      return {
        ...state,
        adminId: payload,
        userId: null,
        userName: null,
      };
    case types.GETADMINNAME:
      return {
        ...state,
        adminName: payload,
        userId: null,
        userName: null,
      };
    case types.GET_ALL_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case types.GET_ALL_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        Alluser: payload,
      };
    case types.GET_ALL_USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.POST_USER_RESULT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: payload,
      };
    case types.SET_USER_RESULT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        result: payload,
      };
    case "ADD_USER_ATTEMPT": // Add new user attempt to the state
      return {
        ...state,
        userAttempts: [...state.userAttempts, payload],
      };
    default:
      return state;
  }
};
