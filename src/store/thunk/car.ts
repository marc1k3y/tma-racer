import { CarAPI } from "@/api/car";
import { createAsyncThunk } from "@reduxjs/toolkit";

const carApi = new CarAPI();

export const getAllThunk = createAsyncThunk(
  "car/getAll",
  async () => {
    const response = await carApi.getAll();
    return response;
  },
);