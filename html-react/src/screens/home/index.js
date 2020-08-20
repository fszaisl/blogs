import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Skeleton, Form, Input, Typography, message, Button, Divider } from 'antd';
import { getBlogList, delBlog } from '../../actions/blog/action';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const { Text } = Typography;
const { Item } = Form;

class Home extends Component {

    constructor(props) {
        super()
    }

    getBlogList = (_params = {}) => {
        const { dispatch } = this.props;
        let params = {
            ..._params
        };
        dispatch(getBlogList(params))
    }

    componentDidMount() {
        this.getBlogList()
        console.log(this.props)
    }

    delBlog = (record = {}, evt) => {
        const { dispatch } = this.props;
        const { id = '' } = record;
        let ss = dispatch(delBlog(
            { id },
            (success) => {
                message.success(success)
            },
            (error) => {
                message.error(error)
            }
        ));
    }
    handleSearch = (values) => {
        let { keyword = '' } = values;
        this.getBlogList({ keyword })
    }



    render() {
        const { blogList, loading } = this.props;
        console.log(loading)
        return (<div style={{ backgroundColor: '#fff', padding: '20px 40px' }} >
            <Form
                layout='inline'
                onFinish={this.handleSearch}
            >
                <Item label='标题' name='keyword' >
                    <Input placeholder='请输入博客标题查询' autoComplete='off' />
                </Item>
                <Item>
                    <Button type='primary' htmlType='submit'>查询</Button>
                </Item>
            </Form>
            <Divider />
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
    console.log(state)
    return {
        blogList: state.blog.list,
        loading: state.blog.loading,
    }
}

export default connect(mapStateToProps)(Home);