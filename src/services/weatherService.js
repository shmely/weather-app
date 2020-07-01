import { httpService } from './httpService';
import storageService from './storageService'
const API_KEY = 'XCxgDDUWb7a69Zs2B6NyGNe4YZUCV0GZ';
const LOCATIONS_PERFIX = 'LOCATION_';
const FORCAST_PERFIX = 'FORCAST_'
const FAVORITS = 'FAVORITS'




async function getLocations(term) {

    let locations = storageService.loadFromStorage(LOCATIONS_PERFIX + term);
    if (!locations) {
        locations = await httpService.get(`locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${term}`);
        storageService.saveToStorage(LOCATIONS_PERFIX + term, locations);
    }
    return locations;
}
async function getForcast(locationId) {
    let fiveDayForcast = storageService.loadFromStorage(FORCAST_PERFIX + locationId + '_' + _getDate());
    if (!fiveDayForcast) {
        fiveDayForcast = await httpService.get(`forecasts/v1/daily/5day/${locationId}?apikey=${API_KEY}&details=true&metric=true`);
        storageService.saveToStorage(FORCAST_PERFIX + locationId + '_' + _getDate(), fiveDayForcast);
    }
    return fiveDayForcast;

}

function addToFavorits(location) {
    let favorits = storageService.loadFromStorage(FAVORITS);
    if (favorits) {
        favorits.push({ Key: location.Key, LocalizedName: location.LocalizedName });
        storageService.saveToStorage(FAVORITS, favorits);
    } else {
        favorits = [];
        favorits.push({ Key: location.Key, LocalizedName: location.LocalizedName });

    }
    storageService.saveToStorage(FAVORITS, favorits);
    return favorits;
}

function getFavorits() {
    let favorits = storageService.loadFromStorage(FAVORITS);
    if (!favorits) favorits = [];
    return favorits;
}

function removeFromFavorits(removeFav) {
    let favorits = storageService.loadFromStorage(FAVORITS);
    const idx = favorits.findIndex(fav => fav.Key === removeFav.Key);
    favorits.splice(idx, 1);
    storageService.saveToStorage(FAVORITS, favorits);



}

function _getDate() {
    const date = new Date();
    return `${date.getDay() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export const weatherService = {
    getLocations,
    getForcast,
    addToFavorits,
    getFavorits,
    removeFromFavorits

}