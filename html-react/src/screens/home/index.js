import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div style={{ backgroundColor: '#fff', padding: '20px 40px' }} >
            这个一个Home页面
        </div>)
    }
}
// const mapStateToProps = (state) => {
//     return {
//         blogList: state.blog.list,
//         loading: state.blog.loading,
//     }
// }

export default connect()(Home);