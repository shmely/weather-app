import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { history } from '../history';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));
export function NavBar(props) {
    const classes = useStyles();
    const [homeState, changeHomeState] = useState(false);
    const [favState, changefavState] = useState(false);


    function showMenu() {
        document.body.classList.toggle('menu-open');
        console.log(document.body.classList);
    }
    useEffect(() => {
        if (history.location.pathname.includes('favorites')) {
            changeHomeState(false);
            changefavState(true);
        }
        else {
            changeHomeState(true);
            changefavState(false);
        }
        return history.listen((location) => {
            if (location.pathname.includes('favorites')) {
                changeHomeState(false);
                changefavState(true);
            }
            else {
                changeHomeState(true);
                changefavState(false);
            }
        })
    }, [homeState, favState])

    return (
        <header className="flex space-between align-center">
            <h1>Weather App.</h1>
            <nav className=".weather-cont flex space-between align-center">

                <div>
                    <CloseIcon className="close" onClick={showMenu}></CloseIcon>
                    <Button variant="contained" color="primary" disabled={homeState} onClick={() => { history.push('/weather-app') }} className={classes.button} startIcon={<HomeIcon />}>Home</Button>
                    <Button variant="contained" color="secondary" disabled={favState} onClick={() => { history.push('/weather-app/favorites') }} className={classes.button} startIcon={<StarIcon />}>Favorites</Button>
                </div>
            </nav>
            <MenuOutlinedIcon onClick={showMenu} className="btn-menu"></MenuOutlinedIcon>
        </header>

    )

}
