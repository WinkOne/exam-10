import axiosApi from "../axios-api";

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR';

export const GET_ONE_NEWS = 'GET_ONE_NEWS';

export const POST_COMMENTS = 'POST_COMMENTS';

export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';

export const POST_NEWS = 'POST_NEWS';

export const getNewsRequest = () => {
    return{type: FETCH_NEWS_REQUEST}
};
export const getNewsSuccess = (response) => {
    return{type: FETCH_NEWS_SUCCESS, response}
};
export const getNewsError = () => {
    return{type: FETCH_NEWS_ERROR}
};

export const getOneNews = (news) => {
    return{type: GET_ONE_NEWS, news}
};
export const postComments = (data) => {
    return {type: POST_COMMENTS, data}
};

export const postNews = () => {
    return {type: POST_NEWS}
};


export const getCommentsRequest = () => {
    return{type: GET_COMMENTS_REQUEST}
};
export const getCommentsSuccess = (response) => {
    return{type: GET_COMMENTS_SUCCESS, response}
};
export const getCommentsError = () => {
    return{type: GET_COMMENTS_ERROR}
};

export const postsComment = (data) => {
    return async dispatch => {
        await axiosApi.post('/comments', data);
        dispatch(postComments(data));
        dispatch(getComments())
    }
};

export const getComments = () => {
    return dispatch => {
        dispatch(getCommentsRequest());
        axiosApi.get('/comments').then(response => {
            dispatch(getCommentsSuccess(response.data));
        }, error => {
            dispatch(getCommentsError(error));
        });
    }
};

export const getNews = () => {
    return dispatch => {
        dispatch(getNewsRequest());
        axiosApi.get('/news').then(response => {
            dispatch(getNewsSuccess(response.data));
        }, error => {
            dispatch(getNewsError(error));
        });
    }
};

export const oneNews = (id) => {
    return async dispatch => {
       const response = await axiosApi.get(`/news/${id}`);
        dispatch(getOneNews(response.data))
    }
};

export const createPost = (data) => {
    return async (dispatch) => {
        try {
            await axiosApi.post('/news', data);
            dispatch(postNews())
        } catch (e) {
            console.error("123 " + e)
        }
    }
};
export const deleteNews = (deleteNews) => {
    return  dispatch => {
        axiosApi.delete(`/news/${deleteNews}`).then(res =>{
            dispatch(getNews())
        }, error => {
            dispatch(getNewsError(error));
        })
    }
};
export const deleteComments = (deleteNews) => {
    console.log(deleteNews);
    return  dispatch => {
        axiosApi.delete(`/comments/${deleteNews}`).then(res =>{
            dispatch(getComments())
        }, error => {
            dispatch(console.error(error));
        })
    }
};