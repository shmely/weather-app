import React, { Component } from 'react';
import { getForcast } from '../store/actions/weatherActions';
import { connect } from 'react-redux';
import { weatherService } from '../services/weatherService';
import { history } from '../history';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { eventBus } from '../services/eventBusService';


class ForcastDay extends Component {
    state = {
        forcast: null
    }

    async componentDidMount() {
        await this.buildForcast();
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) await this.buildForcast();

    }

    buildForcast = async () => {
        let curForcast;
        let location;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        if (this.props.favorit) {
            try {
                curForcast = await weatherService.getForcast(this.props.favorit.Key);
            } catch (error) {
                eventBus.emit('show-msg', {
                    type: 'error',
                    txt: error.message
                })
            }
           
            curForcast = curForcast.DailyForecasts[this.props.index];
            location = this.props.favorit.LocalizedName;
        }
        else if (this.props.forcast) {
            curForcast = this.props.forcast.DailyForecasts[this.props.index];
            location = this.props.location.LocalizedName
        }
        else return;

        this.setState({
            forcast: {
                temp: `${Math.round(curForcast.Temperature.Minimum.Value)}℃ - ${Math.round(curForcast.Temperature.Maximum.Value)}℃`,
                icon: `https://developer.accuweather.com/sites/default/files/${String(curForcast.Day.Icon).padStart(2, 0)}-s.png`,
                desc: curForcast.Day.LongPhrase,
                day: days[new Date(curForcast.Date).getDay()],
                location,
                windSpeed: (!curForcast.Day.Wind.Speed.Value) ? ' ' : curForcast.Day.Wind.Speed.Value + ' km/h'
            }
        })
    }

    onShowFullForcast = async () => {
        if (!this.props.favorit) return;
        try {
            await this.props.getForcast(this.props.favorit);
            history.push('/');

        } catch (error) {
            alert(error);
        }


    }

    render() {

        const { forcast } = this.state
        const isFullDetails = this.props.isMain;
        const { isInFavorits } = this.props
        if (!forcast) return '';
        return (
            <section className="forcast-Day">
                {isFullDetails &&
                    <div className="full-details flex column align-start">
                        <div className="line-one flex space-between">
                            <h1>{forcast.location}</h1>
                            <img src={forcast.icon} alt=""></img>
                            {isInFavorits && <FavoriteIcon className="fav-icon"></FavoriteIcon>}
                        </div>
                        <h2>{forcast.desc}</h2>
                        <h1>{forcast.temp}</h1>
                        <h2>{`Wind Speed: ${forcast.windSpeed}`}</h2>
                    </div>
                }
                {
                    !isFullDetails &&
                    <div className="details flex column align-center" onClick={this.onShowFullForcast}>
                        {this.props.showCityName && <h2>{forcast.location}</h2>}
                        {!this.props.showCityName && <h2>{forcast.day}</h2>}
                        <img src={forcast.icon} alt=""></img>
                        <h2>{forcast.temp}</h2>
                    </div>
                }
            </section >
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

export default connect(mapStateToProps, mapDispatchToProps)(ForcastDay);


