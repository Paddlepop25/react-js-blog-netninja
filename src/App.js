import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Create from './components/Create/Create';
import BlogDetails from './components/BlogDetails/BlogDetails';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/create'>
              <Create />
            </Route>
            <Route path='/blog/:id'>
              <BlogDetails />
            </Route>
            <Route path='*'>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
