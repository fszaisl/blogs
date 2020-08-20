import axios from 'axios';
import {
    UPDATE_BLOG_LIST,
    UPDATE_BLOG_LIST_LOADING,
    // UPDATE_BLOG_LIST_PAGINATION,
} from '../../constants/blog/actionTypes';
import { isFunction } from 'lodash-es';

const getBlogListUrl = `/blog/list`;
const delBlogUrl = `/blog/delete`;

const updateBlogList = payload => ({ payload, type: UPDATE_BLOG_LIST });
const updateBlogListLoading = payload => ({ payload, type: UPDATE_BLOG_LIST_LOADING });
// const updateBlogListPagination = payload => ({ payload, type: UPDATE_BLOG_LIST_PAGINATION });
const getBlogList = (data) => {
    return dispatch => {
        dispatch(updateBlogListLoading({ loading: true }));
        axios.get(getBlogListUrl, { params: data })
            .then(res => {
                console.log(`getBlogList`, res)
                const { hasError, data } = res;
                if (hasError) {
                    return
                }
                dispatch(updateBlogListLoading({ loading: false }));
                // console.log(updateBlogList(data))
                dispatch(updateBlogList(data))
            })
    }
}

const delBlog = (data, scb, ecb) => {
    return dispatch => {
        axios.post(delBlogUrl, data)
            .then(res => {
                console.log(res)
                const { hasError, message } = res;
                if (hasError) {
                    if (isFunction(ecb)) {
                        ecb(message)
                    }
                    return
                }
                if (isFunction(scb)) {
                    scb(message)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }
}

export {
    getBlogList,
    delBlog
}