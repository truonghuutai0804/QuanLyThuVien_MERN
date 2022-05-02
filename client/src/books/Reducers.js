const initialState = {
    user: null,
    items:[],
}

function reducer (state, action){
    switch (action.type) {
        case "CURRENT_USER":
            return { ...state, user: action.payload};
        case "GET_ALL":
            return { ...state, items: action.payload};
        case "CREATE_ONE":
            return { ...state,
                items: [...state.items, action.payload]};
        case "UPDATE_ONE":
            return { ...state,
                items: state.items.map((item)=>
                    item._id === action.payload._id
                    ?{...item, ...action.payload}
                    : item
                    ),};
        case "DELETE_ONE":
            return { 
                ...state,
                items: state.items.filter((item)=> item._id !== action.payload),
            };
        default:
            return state;
    }
}

export {initialState}
export default reducer