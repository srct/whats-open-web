import { SET_FACILITIES,GET_FACILITIES } from '../actions/action-types'

const defaultState = {
    isLoading:false,
    data:[]
};

export const facilities = (state = defaultState, action) => {
    switch(action.type){
        case GET_FACILITIES:
            return Object.assign({},state,{
                isLoading:true,
            });
        case SET_FACILITIES:
            return {
                data:action.facilities,
                isLoading:false
            };
        default:
            return state
    }
};
