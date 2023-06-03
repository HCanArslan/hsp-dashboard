  import { useState, useEffect } from 'react';
  import { Table, Button, Modal, Form, Input } from 'antd';
  import { useQuery, useMutation, useQueryClient } from 'react-query';
  import { fetchUsers, addUser, editUser, deleteUser } from '../api/api';

  const UsersPage = () => {
    const queryClient = useQueryClient();
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);

    interface User {
      id: number;
      name: string;
      // diğer özellikler
    }

    const [users, setUsers] = useState<User[]>([]);

    const [form] = Form.useForm();

    const { data: fetchedUsers, isLoading, isError } = useQuery('users', fetchUsers, {
      staleTime: 5 * 60 * 1000, 
    });

    useEffect(() => {
      if (fetchedUsers) {
        setUsers(fetchedUsers);
      }
    }, [fetchedUsers]);

    const editUserMutation = useMutation((variables: { userId: number; updatedUser: any }) =>
      editUser(variables.userId, variables.updatedUser), {
      onSuccess: () => {
        setEditMode(false);
        setModalVisible(false);
      },
      onMutate: async (variables: { userId: number; updatedUser: any }) => {
        // A snapshot of the previous value
        const previousUsers = queryClient.getQueryData<User[]>('users');
      
        // Optimistically update to the new value
        queryClient.setQueryData<User[]>('users', (old: User[] | undefined) =>
        (old ? old.map((user) => (user.id === variables.userId ? { ...user, ...variables.updatedUser } : user)) : [])
      );

        // Return the snapshotted value, this will be passed into either onError or onSuccess if needed
        return { previousUsers };
      },
      onError: (err, newUserData, context: any) => {
        queryClient.setQueryData('users', context.previousUsers);
      },
      
    });

    const deleteUserMutation = useMutation(deleteUser, {
      onMutate: async (userId: number) => {
        const previousUsers = queryClient.getQueryData<User[]>('users');
    
        // Kullanıcıyı optimistik olarak sil
        queryClient.setQueryData<User[]>('users', (old) => {
          return old ? old.filter((user) => user.id !== userId) : [];
        });
    
        return { previousUsers };
      },
      onError: (err, variables, context: any) => {
        queryClient.setQueryData('users', context.previousUsers);
      },
    });

    const addUserMutation = useMutation(addUser, {
      onMutate: async (newUserData: User) => {
        const previousUsers = queryClient.getQueryData<User[]>('users');

        queryClient.setQueryData<User[]>('users', (old) => {
          return [...(old || []), { ...newUserData, id: Date.now() }];
        });

        return { previousUsers };
      },
      onError: (err, newUserData, context: any) => {
        queryClient.setQueryData('users', context.previousUsers);
      },
      onSuccess: () => {
        setModalVisible(false);
        form.resetFields();
        console.log('User added successfully');
      },
    });

    const handleAddUser = () => {
      form.validateFields()
        .then((values) => {
          addUserMutation.mutate(values as User);
        })
        .catch((errorInfo) => {
          console.error("Validate Failed:", errorInfo);
        });
    };

    const handleEditUser = (userId: number) => {
      const userToEdit = users?.find((user) => user.id === userId);
      if (userToEdit) {
        form.setFieldsValue(userToEdit);
        setEditingUserId(userId);
        setEditMode(true);
        setModalVisible(true);
      }
    };

    const handleSaveEdit = () => {
      form.validateFields().then((values) => {
        if (editingUserId) {
          editUserMutation.mutate({ userId: editingUserId, updatedUser: values });
        }
      });
    };

    const handleDeleteUser = (userId: number) => {
      deleteUserMutation.mutate(userId);
    };

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: any, record: User) => (
          <div>
            <Button type="primary" onClick={() => handleEditUser(record.id)}>
              Edit
            </Button>
            <Button type="primary" danger onClick={() => handleDeleteUser(record.id)}>
              Delete
            </Button>
          </div>
        ),
      },
    ];

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error fetching data</div>;
    }

    return (
      <div>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add User
        </Button>
        <Table dataSource={users} columns={columns} />

        <Modal
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
            setEditMode(false);
          }}
          onOk={editMode ? handleSaveEdit : handleAddUser}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter the name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please enter the username' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please enter the email' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };

  export default UsersPage;
