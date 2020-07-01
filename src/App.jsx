import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { history } from './history';
import { NavBar } from './cmps/NavBar';
import { UserMessage } from './cmps/UserMessage';
import WeatherDetails from './pages/WeatherDetails';
import Favorites from './pages/Favorites';



export function App() {
  return (
    <div className="weather-cont">
      <NavBar></NavBar>
      <Router history={history}>

        <Switch>
          <Route path="/weather-app" component={WeatherDetails} exact />
          <Route path="/weather-app/favorites" component={Favorites} exact />
        </Switch>
      </Router>
      <UserMessage></UserMessage>
    </div>
  );
}