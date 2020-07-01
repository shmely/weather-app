import { GET_LOCATIONS, GET_FORCAST, ADD_FAVORITS, LOAD_FAVORITS, REMOVE_FAVORITS } from '../actions/weatherActions';


const initialState = {
    locations: [],
    forcast: null,
    location: null,
    favorits: []

}

export function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LOCATIONS:
            return {
                ...state,
                locations: action.locations
            }
        case GET_FORCAST:
            {
                return {
                    ...state,
                    forcast: action.forcast,
                    location: action.location
                }
            }
        case ADD_FAVORITS:
            {
                return {
                    ...state,
                    favorits: [...state.favorits, action.location]
                }
            }
        case LOAD_FAVORITS:
            {
                return {
                    ...state,
                    favorits: action.favorits
                }
            }
        case REMOVE_FAVORITS:
            {
                return {
                    ...state,
                    favorits: state.favorits.filter(loc => !loc.Key !== action.location.Key)
                }
            }

            // case LOAD_BOARD:            
            //     return {
            //         ...state,
            //         board: action.board
            //     };
            // case ADD_BOARD:
            //     return {
            //         ...state,
            //         board: action.board
            //     };
            // case UPDATE_BOARD:            
            //     socketService.emit('board updated', action.board._id)
            //     return {
            //         ...state,
            //         board: action.board
            //     }
            // case REMOVE_BOARD:
            //     return {
            //         ...state,
            //         boards: state.boards.filter(board => board._id !== action.boardId)
            //     };
            // case 'SET_CARD':
            //     return {
            //         ...state,
            //         card: action.card
            //     }
        default:
            return state;
    };
}