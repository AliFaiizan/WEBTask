import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/pages/_layout';
import { Provider } from 'react-redux';
import { store } from '@/state/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
