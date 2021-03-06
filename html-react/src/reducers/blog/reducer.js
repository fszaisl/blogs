import {} from 'lodash-es';
import {
    UPDATE_BLOG_LIST,
    UPDATE_BLOG_LIST_LOADING,
    UPDATE_BLOG_LIST_PAGINATION,
} from '../../constants/blog/actionTypes';


let switchMap = {};
let initBlog = {
    list: [],
    results: 0,
    pagination: {
        pageIndex: 0,
        pageSize: 10
    },
    details: {},
    loading: false,
};

switchMap[UPDATE_BLOG_LIST] = (state, action) => {
    return Object.assign({}, state, { list: action.payload })
}

switchMap[UPDATE_BLOG_LIST_LOADING] = (state, action) => {
    console.log(state, action.payload)
    return Object.assign({}, state, action.payload)
}

switchMap[UPDATE_BLOG_LIST_PAGINATION] = (state, action) => {
    return state
}

const blog = (state = initBlog, action) => {
    const { type } = action;
    if (switchMap[type]) {
        return switchMap[type](state, action);
    }
    return state
}

export { blog }