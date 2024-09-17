import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllThunk } from "../thunk/car";
import { SliceIE, UserCarWithIdIE } from "../../service/types";

interface InitialStateIE extends SliceIE {
  cars: UserCarWithIdIE[]
}

interface GetAllPayloadIE {
  findedCars: UserCarWithIdIE[]
}

const initialState: InitialStateIE = {
  isLoading: false,
  isError: false,
  cars: []
}

const carSlice = createSlice({
  name: "car_slice",
  initialState,
  extraReducers: (b) => {
    // getAll
    b.addCase(getAllThunk.pending, (state) => {
      state.isLoading = true;
    });
    b.addCase(getAllThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false
    });
    b.addCase(getAllThunk.fulfilled, (state, action: PayloadAction<GetAllPayloadIE>) => {
      const { findedCars } = action.payload;
      state.cars = findedCars;
      state.isLoading = false;
    });
  },
  reducers: {}
});

export default carSlice.reducer;
// export const { } = carSlice.actions;