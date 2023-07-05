import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import store2 from "store2";

type IAdminState = {
  adminname:string,
  token:string
}

const initialState:IAdminState = {
  adminname:store2.get('adminname')||'',
  token:store2.get('token')||''
}

const adminSlice = createSlice({
  name:'admin',
  initialState,
  reducers:{
    changeAdminname(state,action:PayloadAction<string>){
      state.adminname = action.payload
      store2.set('adminname',action.payload)
    },
    changeToken(state,action:PayloadAction<string>){
      state.token = action.payload
      store2.set('token',action.payload)
    }
  }
})

export const {changeAdminname,changeToken} = adminSlice.actions
export default adminSlice.reducer