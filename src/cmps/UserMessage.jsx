import React, { Component } from 'react';
import Alert from '@material-ui/lab/Alert';
import { eventBus } from '../services/eventBusService';

export class UserMessage extends Component {
    state = {
        msg: null,
        type: 'error'
    }


    componentDidMount() {
        this.unsubscribeFromEventBus = eventBus.on('show-msg', (data) => {
            const delay = 3000;
            this.setState({ msg: data.txt, type: data.type })
            setTimeout(() => {
                this.setState({ msg: null, type: null })
            }, delay)
        })
    }
    componentWillUnmount() {
        this.unsubscribeFromEventBus();
    }

    render() {

        const { msg, type } = this.state;
        console.log(msg);
        if (!msg) return ''
        console.log('i am here', msg);

        return (

            <div className="user-message">
                <Alert variant="filled" severity={type}>{msg}</Alert>
            </div >

        )
    }
}