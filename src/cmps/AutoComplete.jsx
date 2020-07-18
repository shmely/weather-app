import React, { Component } from 'react';
import { weatherService } from '../services/weatherService';
import { getForcast } from '../store/actions/weatherActions';
import { connect } from 'react-redux';
import { eventBus } from '../services/eventBusService';

class AutoComplete extends Component {

    state = {
        txt: '',
        options: [],
        showOptions: false
    }

    setOption = (location) => {       
        this.setState({ txt: location.LocalizedName, showOptions: false });
        try {
            this.props.getForcast(location);
        } catch (error) {
            eventBus.emit('show-msg', {
                type: 'error',
                txt: error.message
            })
        }
        
    }

    onChange = async ({ target }) => {
        this.setState({ txt: target.value, showOptions: target.value.length > 0 ? true : false }, () => {
            if (this.state.txt.length >= 2) {
                try {
                    this.getLocations(target.value);
                } catch (error) {
                    eventBus.emit('show-msg', {
                        type: 'error',
                        txt: error.message
                    })
                }
                
            }
        })
    }

    getLocations = async (term) => {
        const locations = await weatherService.getLocations(term);
        this.setState({ options: locations })
    }

    render() {
        const { showOptions, options, txt } = this.state;

        return (
            <div className="autocomplete-cont flex column align-center" >
                <input type="text" value={txt} onChange={this.onChange} placeholder="teams by country e.g spain" />
                <ul className="autocomplete-results align-start clean-list flex column align-">
                    {showOptions && options.map((option, idx) => <li onClick={() => this.setOption(option)} value={option.key} key={idx}>{option.LocalizedName}</li>)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        forcast: state.weatherApp.forcast
    }
}

const mapDispatchToProps = {
    getForcast
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete);
