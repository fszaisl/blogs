import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Skeleton, Avatar, Space } from 'antd';
import { getBlogList } from '../../actions/blog/action';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);



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
    }



    render() {
        const { blogList, loading } = this.props;
        console.log(blogList)
        return (<div style={{ backgroundColor: '#fff', padding: '20px 40px' }} >
            <List
                itemLayout='vertical'
                loading={loading}
                dataSource={blogList}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={item.title}
                                description={item.content}
                            />
                        </Skeleton>
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