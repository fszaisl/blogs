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
    }
};

switchMap[UPDATE_BLOG_LIST] = (state, action) => {


    return state
}

const blog = (state = initBlog, action) => {
    const { type } = action;

    if (switchMap[type]) {

        return
    }
    return state
}