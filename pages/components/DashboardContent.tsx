import React from 'react';
import { Card, Row, Col } from 'antd';
import { useQuery } from 'react-query';
import { fetchUsers } from '../api/api';

interface User {
  name: string;
  age: number;
}

const DashboardContent = () => {
  const { data: users = [], isLoading, isError } = useQuery('users', fetchUsers, {
    staleTime: 5 * 60 * 1000, // 5 dakika
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Toplam Kullanıcı Sayısı">
            <p>{users.length}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Son Kayıtlı Kullanıcılar">
            <p>{users[users.length - 1]?.name}</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="En Aktif Kullanıcılar">
            <p>{users.slice(0, 3).map((user) => user.name).join(', ')}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
