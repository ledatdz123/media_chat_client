import { REQUEST_CREATE_POST, REQUEST_DELETE_POST, REQUEST_RESET } from "./ActionType"

export const TestReducer=(store={testItem: []}, action)=>{
    switch(action.type){
        case 'REQUEST_POST':
            return {
                ...store,
                testItem: action.payload
            }
        case 'REQUEST_CREATE_POST':
            const item=action.payload
            return{
                ...store,
                testItem: [...store.testItem, item]
            }
        case REQUEST_DELETE_POST:
            return{
                ...store,
                testItem: store.testItem.filter(x=>x!==x.action.payload)
            }
        case REQUEST_RESET:
            return{
                testItem:[]
            }
        default:
            return store;
    }
}