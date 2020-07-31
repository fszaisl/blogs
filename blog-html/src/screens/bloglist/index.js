import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Skeleton, Avatar, Space, Typography } from 'antd';
import { getBlogList } from '../../actions/blog/action';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const { Text } = Typography;

class Home extends Component {

    constructor(props) {
        super()
    }



    getBlogList = (params = {}) => {
        const { dispatch } = this.props;
        dispatch(getBlogList({}))
    }

    componentDidMount() {
        this.getBlogList()
        console.log(this.props)
    }

    delBlog = (record = {}, evt) => {
        const { dispatch } = this.props;
        const { id = '' } = record;
        // dispatch()
        console.log(id, evt)
    }



    render() {
        const { blogList, loading } = this.props;
        return (<div style={{ backgroundColor: '#fff', padding: '20px 40px' }} >
            <List
                itemLayout='vertical'
                loading={loading}
                dataSource={blogList}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Text type="secondary" key='edit' ><EditFilled /> 编辑</Text>,
                            <Text type="secondary" key='dek' onClick={this.delBlog.bind(this, item)}><DeleteFilled /> 删除</Text>,
                        ]}
                    >
                        <Link to={'ditials'} >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={item.title}
                                    description={item.content}
                                />
                            </Skeleton>
                        </Link>
                    </List.Item>
                )}
            ></List>
        </div>)
    }
}
const mapStateToProps = (state) => {
    return {
        blogList: state.blog.list,
        loading: state.blog.loading,
    }
}

export default connect(mapStateToProps)(Home);