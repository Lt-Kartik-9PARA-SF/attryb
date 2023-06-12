import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Signup from './SignUp';
import LoginPage from './Login';
import CarListingPage from './CarListingPage';
import AddCarPage from './CarDetailsPage';
import NavigationBar from './Navigation';
import CarDetailsPage from './CarDetailsPage';

const App = () => {
  return ( 
  <BrowserRouter>
  <NavigationBar/>
    <Routes>
      <Route path="/" element={<Signup />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="carlisting" element={<CarListingPage />} />
        <Route path="cardetails" element={<CarDetailsPage />} />
        <Route path="addcar" element={<AddCarPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
    
  );
};

export default App;
