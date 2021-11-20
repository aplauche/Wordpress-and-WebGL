import './index.css'
import {AppProvider} from '../data/AppContext'

function MyApp({ Component, pageProps }) {
  return (
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    )
}

export default MyApp
