import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Toolbar from './client/components/Toolbar';
import Home from './client/pages/Home';
import Shop from './client/pages/Shop';
import Cart from './client/pages/Cart';
import LikedProductsPage from './client/pages/LikedProductsPage';
import Login from './client/pages/LoginPage';
import Register from './client/pages/RegisterPage';
import AdminPage from './client/pages/AdminPage';

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
          <Route path="/register" component={Register} /> 
          <Route path="/login" component={Login} /> {/* Add this line */}


        </Switch>
      </div>
    </Router>
  );
};

export default App;
