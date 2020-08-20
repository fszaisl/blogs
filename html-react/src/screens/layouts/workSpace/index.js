import React, { Component } from 'react';
import { cloneDeep, filter, findLast } from 'lodash-es';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import { dynamicComponent } from '../../../uitls/util';

const { TabPane } = Tabs;

class WorkSpace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            panes: [{ title: '首页', path: '/home', key: '/home', closable: false }],
            activeKey: '/home'
        }
        this.isOnlyChangeUrl = false;
    }

    handleTabChanged = (activeKey) => {
        const { history } = this.props;
        // this.isOnlyChangeUrl = true;
        // this.setState(
        //     () => ({ activeKey }),
        //     () => {
        //         this.isOnlyChangeUrl = false;
        //     }
        // );
        history.replace(`/home${activeKey}`);
    }

    componentDidMount() {
        this.add();
    }

    componentDidUpdate() {
        const { location: { pathname } } = this.props;
        const { activeKey } = this.state;
        if (this.isOnlyChangeUrl) {
            return
        }
        if (pathname !== `/home${activeKey}`) {
            this.add();
        }
    }

    add = () => {
        const { location = {} } = this.props,
            { panes } = this.state,
            { pathname, state = {} } = location,
            { title } = state;
        let _panes = cloneDeep(panes);
        let path = pathname.replace('/home', '');

        let hasKey = _panes.some((item = {}) => item.key === path);

        if (!hasKey) {
            _panes.push({
                title: title,
                path,
                key: path,
                closable: true
            });
            this.setState(() => ({ panes: _panes }));
        }

        this.setState(() => ({ activeKey: path }));
    }

    remove = (key, type) => {
        if (type === 'remove') {
            const { history } = this.props;
            const { panes } = this.state;
            let _panes = cloneDeep(panes);
            let newPanes = filter(_panes, item => { return item.key !== key });
            let { path } = findLast(newPanes);
            // this.
            console.log(`/home${path}`)
            this.setState(() => ({ panes: newPanes, activeKey: path }));
            history.replace(`/home${path}`);
        }
    }

    renderAsyncComponent = (params = {}) => {
        // console.log(params)
        let { path } = params;
        // let pathName = match.location.pathname;
        // let path = pathName.replace('/home', '');
        const AsyncComponent = dynamicComponent(path);
        return <AsyncComponent />
    }

    render() {
        const { panes, activeKey } = this.state;

        return (<Tabs
            type="editable-card"
            onChange={this.handleTabChanged}
            activeKey={activeKey}
            onEdit={this.remove}
            hideAdd={true}
        >
            {panes.map(pane => (
                <TabPane
                    tab={pane.title}
                    key={pane.key}
                    closable={pane.closable}
                >
                    {this.renderAsyncComponent(pane)}
                </TabPane>
            ))}
        </Tabs>)
    }
}

export default withRouter(WorkSpace);