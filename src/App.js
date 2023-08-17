import './App.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter } from 'react-router-dom';
import Routes from './pages/Routes'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
