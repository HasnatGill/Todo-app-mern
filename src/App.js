import './App.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './pages/Routes'
import { useAuthContext } from './context/AuthContext';
import ScreenLoader from './components/ScreenLoading';

function App() {
  
  const { isAppLoading } = useAuthContext()

  if (isAppLoading)
    return <ScreenLoader />

  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
