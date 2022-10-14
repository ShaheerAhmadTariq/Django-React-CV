// import logo from './logo.svg';
// import './App.css';
// import Signin from './components/Signin';
// // import background from './components/signin/background'
// import Dashboard from './components/Dashboard'
// import Customer from './components/Customer'
// import './resources/css/index.css';
// // import './font-awesome.min.css'
// import './resources/css/proj Login.css'   

// import AppRouter from './components/AppRouter'
import {useRoutes } from 'react-router-dom';
import approuter from './components/AppRouter'

function App() {
  const router = useRoutes(approuter);
    return (
      <div className="App">
        {router}
        <div>app is working</div>
      </div>
    );
  }

export default App;
