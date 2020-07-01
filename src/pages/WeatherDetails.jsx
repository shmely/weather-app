import React, { Component } from 'react'
import AutoComplete from '../cmps/AutoComplete';
import WeatherView from '../cmps/WeatherView';
import { getForcast } from '../store/actions/weatherActions';
import { eventBus } from '../services/eventBusService';
import { connect } from 'react-redux';

class WeatherDetails extends Component {

    async componentDidMount() {
        if (this.props.location) this.props.getForcast(this.props.location);
        else {
            try {
                await this.props.getForcast({ Key: '215854', LocalizedName: 'Tel Aviv' })
            } catch (error) {

                eventBus.emit('show-msg', {
                    type: 'error',
                    txt: error.message
                })
            }
        }


    }


    render() {
        const isShowWeather = (!this.props.forcast) ? false : true;       
        return (
            <main className="weather-details weather-cont flex column align-center">
                <AutoComplete onSelectLocation={this.onLocationSelected}></AutoComplete>
                {isShowWeather && <WeatherView></WeatherView>}
            </main>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        forcast: state.weatherApp.forcast,
        location: state.weatherApp.location
    }
}

const mapDispatchToProps = {
    getForcast
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherDetails);
