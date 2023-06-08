import {createSlice} from '@reduxjs/toolkit'

const initialValues = {userID:'', userName:'',userEmail:'', role:'', assignedTo: '', userImage: '', isLoggedIn: false}

export const authSlice = createSlice({
    name : 'auth',
    initialState: { value: initialValues},
    reducers: {
        login:(state,action)=>{
            state.value = action.payload
            console.log(action.payload)
            //state.isLoggedIn = true
        },
        logout: (state)=>{
            state.value = initialValues
            state.isLoggedIn = false
        },
    },

});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer