import { ADD_DATA, DELETE_DATA } from "../action";

let initialValue = {
    count : JSON.parse(localStorage.getItem('cart'))!=null?JSON.parse(localStorage.getItem('cart')).length:0
};

export let CartReducer = (state=initialValue,action)=>
{
    switch(action.type)
    {
        case ADD_DATA:
           return {
                ...state,count : state.count+1
            }
            case DELETE_DATA:
                return {
                     ...state,count : state.count-1
                 }    
          default :
            return state; 
    }
}