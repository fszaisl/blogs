import React from 'react';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { Sider } = Layout,
    { SubMenu, Item } = Menu;


function LeftMenu(memus=[],selectKeys=[],) {

    return (<Sider
        width={200}
        collapsible={true}
        theme='dark'
    >
        <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
        >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Item key="1"><NavLink to={{ pathname: '/home/option1', state: { title: 'option1' } }} >option1</NavLink></Item>
                <Item key="2"><NavLink to={{ pathname: '/home/option2', state: { title: 'option2' } }} >option2</NavLink></Item>
                <Item key="3"><NavLink to={{ pathname: '/home/option3', state: { title: 'option3' } }} >option3</NavLink></Item>
                <Item key="4"><NavLink to={{ pathname: '/home/option4', state: { title: 'option4' } }} >option4</NavLink></Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Item key="5"><NavLink to={{ pathname: '/home/option5', state: { title: 'option5' } }} >option5</NavLink></Item>
                <Item key="6"><NavLink to={{ pathname: '/home/option6', state: { title: 'option6' } }} >option6</NavLink></Item>
                <Item key="7"><NavLink to={{ pathname: '/home/option7', state: { title: 'option7' } }} >option7</NavLink></Item>
                <Item key="8"><NavLink to={{ pathname: '/home/option8', state: { title: 'option8' } }} >option8</NavLink></Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Item key="9"><NavLink to={{ pathname: '/home/option9', state: { title: 'option9' } }} >option9</NavLink></Item>
                <Item key="10"><NavLink to={{ pathname: '/home/option10', state: { title: 'option10' } }} >option10</NavLink></Item>
                <Item key="11"><NavLink to={{ pathname: '/home/option11', state: { title: 'option11' } }} >option11</NavLink></Item>
                <Item key="12"><NavLink to={{ pathname: '/home/option12', state: { title: 'option12' } }} >option12</NavLink></Item>
            </SubMenu>
        </Menu>
    </Sider>);
}

export default LeftMenu;