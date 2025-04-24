import { AppProps } from 'next/app';

import Footer from '../components/Footer';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
import { CartProvider } from '../Context/CartContext';
import '../styles/main.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Header />
      <ScrollToTop />
      <Component {...pageProps} />
      <Footer />
    </CartProvider>
  );
}
