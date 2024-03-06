import { createAsyncThunk } from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "@redux/configure-store.ts";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: any;
}>();
