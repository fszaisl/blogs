import {} from 'lodash-es';
import {
    UPDATE_BLOG_LIST,
    UPDATE_BLOG_LIST_LOADING,
    UPDATE_BLOG_LIST_PAGINATION,
} from '../../constant/blog/actionTypes';


let switchMap = {};
let initBlog = {
    list: [],
    results: 0,
    pagination: {
        pageIndex: 0,
        pageSize: 10
    },
    details: {}
};

switchMap[UPDATE_BLOG_LIST] = (state, action) => {
    return Object.assign({}, state, { list: action.payload })
}

switchMap[UPDATE_BLOG_LIST_LOADING] = (state, action) => {


    return state
}

switchMap[UPDATE_BLOG_LIST_PAGINATION] = (state, action) => {


    return state
}

const blog = (state = initBlog, action) => {
    const { type } = action;
    console.log(action)
    if (switchMap[type]) {
        return switchMap[type](state, action);
    }
    return state
}

export { blog }