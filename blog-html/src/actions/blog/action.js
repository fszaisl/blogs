import axios from 'axios';
import {
    UPDATE_BLOG_LIST,
    UPDATE_BLOG_LIST_LOADING,
    UPDATE_BLOG_LIST_PAGINATION,
} from '../../constant/blog/actionTypes';

const getBlogListUrl = `/api/blog/list`;

const updateBlogList = data => ({ data, type: UPDATE_BLOG_LIST });
const updateBlogListLoading = data => ({ data, type: UPDATE_BLOG_LIST_LOADING });
const updateBlogListPagination = data => ({ data, type: UPDATE_BLOG_LIST_PAGINATION });
const getBlogList = (data) => {
    return dispatch => {
        dispatch(updateBlogListLoading({ loading: true }));
        axios.get(getBlogListUrl, data)
            .then(res => res.data || {})
            .then(res => {
                const { hasError, message, data } = res
                if (hasError) {
                    return
                }
                dispatch(updateBlogListLoading({ loading: false }));
                dispatch(updateBlogList(data))
            })
            .catch(error => {
                console.error(error)
            })
    }
}

export default {
    getBlogList
}