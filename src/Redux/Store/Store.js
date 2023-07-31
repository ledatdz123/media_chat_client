import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import { AuthReducer } from '../Auth/Reducer'
import thunk from 'redux-thunk'
import { PostReducer } from '../Test/Reducer'
import { ChatReducer } from '../Chat/Reducer'
import { MessageReducer } from '../Message/Reducer'
import { EmojiMessageReducer } from '../EmojiMessage/Reducer'
const rootReducer=combineReducers({
    auth: AuthReducer,
    post: PostReducer,
    chat: ChatReducer,
    message: MessageReducer,
    emoji: EmojiMessageReducer
})
export const store=legacy_createStore(rootReducer, applyMiddleware(thunk))