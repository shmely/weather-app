import React from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';
import { history } from './history';
import { NavBar } from './cmps/NavBar';
import { UserMessage } from './cmps/UserMessage';
import WeatherDetails from './pages/WeatherDetails';
import Favorites from './pages/Favorites';



export function App() {
  return (
    <div className="weather-cont">

      <BrowserRouter basename="weather-app" history={history}>
        <NavBar></NavBar>
        <Switch>
          <Route path="/" component={WeatherDetails} exact />
          <Route path="/favorites" component={Favorites} exact />
        </Switch>
      </BrowserRouter>
      <UserMessage></UserMessage>
    </div>
  );
}