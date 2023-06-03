import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Code that needs to be executed on the client-side
      const rootElement = document.getElementById('root');
      if (rootElement) {
        // Perform browser-specific operations here
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
