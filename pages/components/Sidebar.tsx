import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;

type SidebarProps = {
  activeMenu: string;
  handleMenuClick: (menu: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, handleMenuClick }) => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu mode="inline" selectedKeys={[activeMenu]} style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="dashboard" icon={<UserOutlined />} onClick={() => handleMenuClick('dashboard')}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />} onClick={() => handleMenuClick('users')}>
          Kullanıcılar
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
