import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Category from './Pages/Category';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/clothing' element={<Category category="clothing"/>} />
          <Route path='/accessories' element={<Category category="accessorie"/>} />
          <Route path='/electronics' element={<Category category="electronic"/>} />
          <Route path='/product' element={<Product />} >
            <Route path=':productId' element={<Product />}/>
          </Route>
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
