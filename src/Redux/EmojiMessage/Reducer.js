import { CREATE_NEW_MESSAGE_EMOJI, GET_ALL_MESSAGE_EMOJI } from "./ActionType";

const initialState = {
    messageEmojis: [],
    newMessageEmoji: null,
};
export const EmojiMessageReducer = (store = initialState, { type, payload }) => {
    switch (type) {
      case CREATE_NEW_MESSAGE_EMOJI:
        return {
          ...store,
          newMessageEmoji: payload,
        };
      case GET_ALL_MESSAGE_EMOJI:
        return {
          ...store,
          messageEmojis: payload,
        };
      default:
        return store;
    }
  };