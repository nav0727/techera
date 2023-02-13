import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'

import TechItem from './components/TechItem'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/courses/:id" component={TechItem} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  </div>
)

export default App
