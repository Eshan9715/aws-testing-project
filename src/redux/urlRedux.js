import {createSlice} from '@reduxjs/toolkit'

export const urlSlice = createSlice({
    name : 'url',
    initialState: { isURL: 'http://ec2-3-110-85-33.ap-south-1.compute.amazonaws.com'},
    reducers: {
        local(state){
            state.isURL = 'http://ec2-3-110-85-33.ap-south-1.compute.amazonaws.com'
        },
        server(state){
            state.isURL = 'http://ec2-3-110-85-33.ap-south-1.compute.amazonaws.com'                //'https://cute-blue-kangaroo-tam.cyclic.app'
        },
    },

});

export const {local, server} = urlSlice.actions;
export default urlSlice.reducer;