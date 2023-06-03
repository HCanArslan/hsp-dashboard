import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardContent from './components/DashboardContent';
import MyUsersPage from './components/Table';
import { QueryClient, QueryClientProvider } from 'react-query';

const { Content } = Layout;

const queryClient = new QueryClient();

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
        <Layout>
          <Header />
          <Content style={{ margin: '24px 16px 0' }}>
            {activeMenu === 'dashboard' && <DashboardContent />}
            {activeMenu === 'users' && <MyUsersPage />}
          </Content>
        </Layout>
      </Layout>
    </QueryClientProvider>
  );
};

export default Dashboard;
