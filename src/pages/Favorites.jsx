import React, { Component } from 'react'
import { connect } from 'react-redux';
import ForcastDay from '../cmps/ForcastDay'
import { loadFavorits } from '../store/actions/weatherActions';
import { eventBus } from '../services/eventBusService';


class Favorites extends Component {

    componentDidMount() {
        try {
            this.props.loadFavorits();
        } catch (error) {
            eventBus.emit('show-msg', {
                type: 'error',
                txt: error.message
            })
        }

    }

    render() {

        if (!this.props.favorits) return <h1>No Favorits Yet!!!!</h1>

        return (
            <section className="favorits-cont flex column align-center">
                <h1>Favorits</h1>
                <div className="flex wrap">
                    {this.props.favorits.map((fav, idx) => <ForcastDay showCityName={true} index={0} isMain={false} key={idx} favorit={fav}></ForcastDay>)}
                </div>

            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {

        favorits: state.weatherApp.favorits
    }
}

const mapDispatchToProps = {
    loadFavorits
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
