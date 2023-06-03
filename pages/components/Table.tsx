  import { useState, useEffect } from 'react';
  import { Table, Button, Modal, Form, Input, TableColumnType } from 'antd';
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
      username: string; // Include the username property
      email: string;
      address: {
        street: string;
        suite: string;
        city: string;
        // Other address properties...
      };
      phone: string;
      // Other user properties...
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

      const columns: TableColumnType<User>[] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          filters: users.map((user) => ({ text: user.name, value: user.name })),
          onFilter: (value: string | number | boolean, record: User) => record.name.includes(value as string),
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
          filters: users.map((user) => ({ text: user.username, value: user.username })),
          onFilter: (value: string | number | boolean, record: User) => record.username.includes(value as string),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          filters: users.map((user) => ({ text: user.email, value: user.email })),
          onFilter: (value: string | number | boolean, record: User) => record.email.includes(value as string),
        },
        {
          title: 'City',
          dataIndex: ['address', 'city'],
          key: 'city',
          filters: users.map((user) => ({ text: user.address.city, value: user.address.city })),
          onFilter: (value: string | number | boolean, record: User) =>
            record.address.city.includes(value as string),
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
          filters: users.map((user) => ({ text: user.phone, value: user.phone })),
          onFilter: (value: string | number | boolean, record: User) => record.phone.includes(value as string),
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
