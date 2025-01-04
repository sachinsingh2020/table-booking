import { Toaster } from 'react-hot-toast'; // Import Toaster
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster position="top-center" /> {/* Position the toasts */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
