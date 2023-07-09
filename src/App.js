import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import LikedProductsPage from './pages/LikedProductsPage';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <Router>
      <div>
        <Toolbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/cart" component={Cart} />
          <Route path="/liked-products" component={LikedProductsPage} />
          <Route path="/admin" component={AdminPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
