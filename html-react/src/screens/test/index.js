import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';


class Register extends Component {

    constructor(props) {
        super();
        this.state = {}
    }

    render() {

        console.log(this.props)
        return (<Card style={{ width: '600px', margin: '100px auto', padding: '34px 24px' }} >
            qwerqwerqwerqwer
        </Card>
        )
    }
}

export default connect()(Register);