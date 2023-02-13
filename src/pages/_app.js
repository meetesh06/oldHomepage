import '@/styles/globals.css'
import { Provider } from 'react-redux';

import { wrapper } from "../store/store";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material";

import Layout from "../components/Layout"

const clientSideEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientSideEmotionCache, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  const theme = createTheme({
    palette: {
      mode: 'dark'
    } 
  });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;

