import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import { AuthReducer } from '../Auth/Reducer'
import thunk from 'redux-thunk'
import { ChatReducer } from '../Chat/Reducer'
import { MessageReducer } from '../Message/Reducer'
import { EmojiMessageReducer } from '../EmojiMessage/Reducer'
import { PostReducer } from '../Post/Reducer'
import { CommentReducer } from '../Comment/Reducer'
import { UserReducer } from '../User/Reducer'
import GlobalLoadingReducer from '../Loading/GlobalLoadingReducer'
const rootReducer=combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    chat: ChatReducer,
    message: MessageReducer,
    emoji: EmojiMessageReducer,
    post: PostReducer,
    comment: CommentReducer,
    loading: GlobalLoadingReducer
})
export const store=legacy_createStore(rootReducer, applyMiddleware(thunk))