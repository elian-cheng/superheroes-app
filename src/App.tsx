import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Router from 'routing/Router/Router';
import { ToastContainer } from 'react-toastify';
import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container">
          <Router />
        </div>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}
