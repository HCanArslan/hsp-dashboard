export const fetchUsers = async (): Promise<any[]> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const addUser = async (user: any): Promise<any> => {
  const userToSend = {
    name: user.name,
    username: user.username,
    email: user.email
    // diğer JSON serileştirilebilir alanları buraya ekleyin
  };

  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify(userToSend),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to add user');
  }

  const data = await response.json();
  return data;
};


export const editUser = async (userId: number, updatedUser: any): Promise<any> => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to edit user');
  }
};

export const deleteUser = async (userId: number): Promise<boolean> => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete user: ${errorData.message}`);
    }
    else  {
      console.log('basarili')
    };

    return response.ok;
  } catch (error) {
    throw new Error(`Failed to delete user: ${(error as Error).message}`);
  }
};

