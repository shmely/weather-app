import { combineReducers } from 'redux';
import { weatherReducer } from './weatherReducer';



export const rootReducer = combineReducers({
    weatherApp: weatherReducer
})