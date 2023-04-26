import Page from './page'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import Navbar from '../components/navbar/Navbar'

function MyApp({ Component, pageProps }: AppProps) {

  return(
     <>
     <Component {...pageProps} />
    {/* <Navbar /> */}
    <Page />
     </>
  )
}

export default MyApp
  