import React, {useReducer, useEffect} from 'react';

let initLoading = {
    loading: true,
    data: [],
    error: ''
}

let reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_LOADING': {
            return {
                loading: false,
                data: action.data,
                error: ''
            }
        }
        case 'FETCH_ERROR': {
            return{
                loading: false,
                data: [],
                error: 'Error: fail to fetch'
            }
        }

        default: {
            return state;
        }
    }
}
const Customers = () => {
 const [customers, dispatch] = useReducer(reducer, initLoading);
 useEffect(() => {
     fetch('http://localhost:3000/api/customers')
     .then(response => response.json())
     .then(data => {
         console.log(data); // co roiroi
         dispatch({type: 'FETCH_LOADING', data});
     })
     .catch(error => {
         dispatch({type: 'FETCH_ERROR'});
     })
 }, [])
 return(
     <div>
         Cho du lieu ra day
     </div>
 )
}

export default Customers;