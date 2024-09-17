import { UserAPI } from "@/api/user";
import { CarUpgradePartTypes} from "@/service/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const userApi = new UserAPI();

export const authThunk = createAsyncThunk(
  "user/auth",
  async (tgId: string) => {
    const response = await userApi.auth(tgId);
    if (!response.token) return console.error("token not found");
    localStorage.setItem("token", response.token);
    return response;
  },
);

export const raceRunThunk = createAsyncThunk(
  "user/raceRun",
  async (raceId: string) => {
    const response = await userApi.raceRun(raceId);
    return response;
  },
);

export const requestRacesThunk = createAsyncThunk(
  "user/requestRaces",
  async () => {
    const response = await userApi.requestRaces();
    return response;
  },
);

export const buyCarThunk = createAsyncThunk(
  "user/buyCar",
  async (carId: string) => {
    const response = await userApi.buyCar(carId);
    return response;
  },
);

export const selectCarThunk = createAsyncThunk(
  "user/selectCar",
  async (carId: string) => {
    const response = await userApi.selectCar(carId);
    return response;
  },
);

export const upgradeCarPartThunk = createAsyncThunk(
  "user/upgradeCarPart",
  async (reqData: { carId: string, part: CarUpgradePartTypes }) => {
    const response = await userApi.upgradeCarPart(reqData.carId, reqData.part);
    return response;
  },
);