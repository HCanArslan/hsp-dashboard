import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Dashboard from './Dashboard';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const fetchUsers = async (): Promise<any[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
};

const MyComponent = () => {
  const { data, isLoading, isError } = useQuery('users', fetchUsers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      {data && data.map((user: any) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

const IndexPage = () => {
  useEffect(() => {
    // İsteğe bağlı olarak burada yapılacak işlemler
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
};

export default IndexPage;
