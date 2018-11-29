import { createAction, handleActions } from 'redux-actions';

const BOARD_SAVE = 'SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_READ = 'READ';
const BOARD_LIST = 'LIST';
export const board_save = createAction(BOARD_SAVE);
export const board_remove = createAction(BOARD_REMOVE, no => no);
export const board_read = createAction(BOARD_READ);
export const board_list = createAction(BOARD_LIST);

const initialState = {
  maxNo: 3,
  boards: [
    {
      no: 1,
      writer: 'Lee SunSin',
      title: 'If you intend to live then you die',
      date: new Date()
    },
    {
      no: 2,
      writer: 'So SiNo',
      title: 'Founder for two countries',
      date: new Date()
    }
  ],
  selectedBoard: {}
};

export default handleActions({
  [BOARD_SAVE]: (state, { payload: data }) => {
    let boards = state.boards;
    let maxNo = state.maxNo;
    if (!data.no) {    // new : Insert
      return {
        maxNo: maxNo + 1,
        boards: boards.concat({ ...data, no: maxNo, date: new Date() }),
        selectedBoard: {}
      };
    }
    return { ...state, boards: boards.map(board => data.no === board.no ? { ...data } : board), selectedBoard: {} };
  },
  [BOARD_REMOVE]: (state, { payload: no }) => {
    let boards = state.boards;
    return { ...state, boards: boards.filter(board => board.no !== no), selectedBoard: {} };
  },
  [BOARD_READ]: (state, { payload: no }) => {
    let boards = state.boards;
    return { ...state, selectedBoard: boards.find(board => board.no === no) };
  }
}, initialState);