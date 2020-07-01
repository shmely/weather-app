import { weatherService } from '../../services/weatherService.js';

export const GET_LOCATIONS = 'GET_LOCATIONS';
export const GET_FORCAST = 'GET_FORCAST';
export const ADD_FAVORITS = 'ADD_FAVORITS';
export const LOAD_FAVORITS = 'LOAD_FAVORITS';
export const REMOVE_FAVORITS = 'REMOVE_FAVORITS'



export function getLocations(term) {
    return async dispatch => {
        const locations = await weatherService.getLocations(term)
        dispatch({ type: GET_LOCATIONS, locations });
    }
}
export function getForcast(location) {
    return async dispatch => {
        const forcast = await weatherService.getForcast(location.Key)
        dispatch({ type: GET_FORCAST, forcast, location });
    }
}
export function addToFavorits(location) {
    return async dispatch => {
        await weatherService.addToFavorits(location);
        dispatch({ type: ADD_FAVORITS, location });
    }
}

export function removeFromFavorits(location) {
    return async dispatch => {
        await weatherService.removeFromFavorits(location);
        dispatch({ type: REMOVE_FAVORITS, location });
    }
}
export function loadFavorits() {
    return dispatch => {
        const favorits = weatherService.getFavorits();
        dispatch({ type: LOAD_FAVORITS, favorits });
    }
}

// export function loadBoard(id) {
//     return async dispatch => {
//         const board = await boardService.getById(id);
//         dispatch({ type: LOAD_BOARD, board });
//     }
// }

// export function addBoard(addedBoard) {
//     return async dispatch => {
//         const board = await boardService.add(addedBoard);
//         dispatch({ type: ADD_BOARD, board })
//     }
// }

// export function updateBoard(updatedBoard) {
//     return async (dispatch) => {
//         dispatch({ type: UPDATE_BOARD, board: updatedBoard });

//         try {
//             await boardService.update(updatedBoard);
//         } catch (err) {
//             // dispatch({ type: UPDATE_BOARD, board: keepBoard });
//         }

//         socketService.emit('board updated', updatedBoard._id);
//     }
// }

// export function removeBoard(boardId) {
//     return dispatch => {
//         boardService.remove(boardId)
//             .then(() => dispatch({ type: REMOVE_BOARD, boardId }));
//     }
// }

// export function setCard(card) {
//     return dispatch => {
//         dispatch({ type: 'SET_CARD', card });
//     }
// }