import React, { Component } from 'react';
import ForcastDay from './ForcastDay';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { weatherService } from '../services/weatherService';
import { addToFavorits, removeFromFavorits } from '../store/actions/weatherActions'
import { eventBus } from '../services/eventBusService';


class WeatherView extends Component {

    addToFavorits = () => {
        try {
            this.props.addToFavorits(this.props.location);
            eventBus.emit('show-msg', {
                type: 'success',
                txt: 'Added to favorits successfully'
            })
        } catch (error) {
            eventBus.emit('show-msg', {
                type: 'error',
                txt: error.message
            })
        }

    }
    removeFromFavorits = () => {

        try {
            this.props.removeFromFavorits(this.props.location);
            eventBus.emit('show-msg', {
                type: 'success',
                txt: 'Removed from favorits successfully'
            })

        } catch (error) {
            eventBus.emit('show-msg', {
                type: 'error',
                txt: error.message
            })
        }

    }

    checkIsFavorits = () => {
        const favLocations = weatherService.getFavorits();
        const currLoc = this.props.location;
        const foundLocation = favLocations.find(favLoc => favLoc.Key === currLoc.Key);
        return !foundLocation ? false : true

    }


    render() {
        const isInFavorits = this.checkIsFavorits();
        const favText = isInFavorits ? 'Remove from Favorites' : 'Add To Favorites';
        const addRemoveFromFavFunc = isInFavorits ? this.removeFromFavorits : this.addToFavorits;
        return (
            <section className="weather-view flex column">
                <div className="main-weather flex wrap space-between">
                    <ForcastDay isInFavorits={isInFavorits} index={0} isMain={true}></ForcastDay>


                    <div>
                        <Button variant="contained" color="secondary" onClick={addRemoveFromFavFunc} startIcon={<FavoriteIcon />}>{favText}</Button>
                    </div>
                </div>
                <div className="forcast-days flex wrap space-between wrap">
                    <ForcastDay index={0} isMain={false}></ForcastDay>
                    <ForcastDay index={1} isMain={false}></ForcastDay>
                    <ForcastDay index={2} isMain={false}></ForcastDay>
                    <ForcastDay index={3} isMain={false}></ForcastDay>
                    <ForcastDay index={4} isMain={false}></ForcastDay>
                </div>
            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {

        location: state.weatherApp.location,
        favorits: state.weatherApp.favorits
    }
}

const mapDispatchToProps = {
    addToFavorits,
    removeFromFavorits
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherView);
