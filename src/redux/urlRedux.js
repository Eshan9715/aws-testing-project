import {createSlice} from '@reduxjs/toolkit'

export const urlSlice = createSlice({
    name : 'url',
    initialState: { isURL: 'http://localhost:8000'},
    reducers: {
        local(state){
            state.isURL = 'http://localhost:8000'
        },
        server(state){
            state.isURL = 'http://localhost:8000'                //'https://cute-blue-kangaroo-tam.cyclic.app'
        },
    },

});

export const {local, server} = urlSlice.actions;
export default urlSlice.reducer;