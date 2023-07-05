import {createSlice} from '@reduxjs/toolkit'

const appSlice = createSlice({
  name:'app',
  initialState:{
    collapsed:localStorage.getItem('collapsed')==='true'
  },
  reducers:{
    changeCollapsed(state,action){
      state.collapsed = action.payload
      localStorage.setItem('collapsed',action.payload)
    }
  }
})

export const {changeCollapsed} = appSlice.actions
export default appSlice.reducer