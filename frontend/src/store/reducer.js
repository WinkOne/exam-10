import {FETCH_NEWS_SUCCESS, GET_COMMENTS_SUCCESS, GET_ONE_NEWS, POST_COMMENTS} from "./action";

const initialState = {
    news: [],
    oneNews: [],
    comments: [],
    comment: []
};

const reducer = (state = initialState, action) => {
    if (action.type === FETCH_NEWS_SUCCESS){
        return {...state, news: action.response}
    }
    if (action.type === GET_ONE_NEWS){
        return {...state, oneNews: action.news}
    }
    if (action.type === POST_COMMENTS){
        return {...state, comment: action.data}
    }
    if (action.type === GET_COMMENTS_SUCCESS){
        return {...state, comments: action.response}
    }
    return state;
};

export default reducer;