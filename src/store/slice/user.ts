import { BalanceLogIE, RaceGeneratedResultIE, SliceIE, UserCarWithIdIE, UserRaceLogIE, UserWithIdIE } from "@/service/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authThunk, buyCarThunk, raceRunThunk, requestRacesThunk, selectCarThunk, upgradeCarPartThunk } from "../thunk/user";

interface InitialStateIE extends UserWithIdIE, SliceIE { }

interface AuthPayloadIE {
  token: string
  userData: UserWithIdIE
}

interface RaceRunPayloadIE {
  balanceLog: BalanceLogIE
  balanceChange: number
  newRaceLog: UserRaceLogIE
}

interface RequestRacesPayloadIE {
  generatedRaces: RaceGeneratedResultIE[]
}

interface BuyCarPayloadIE {
  garageNextIn: number
  balanceLog: BalanceLogIE
  recalculatedRaces: RaceGeneratedResultIE[]
  selectedCar: UserCarWithIdIE
}

interface SelectCarPayloadIE {
  carId: string
  recalculatedRaces: RaceGeneratedResultIE[]
  garageNextIn: number
}

interface UpgradeCarPartPayloadIE {
  recalculatedRaces: RaceGeneratedResultIE[]
  upgradedCar: UserCarWithIdIE
  balanceLog: BalanceLogIE
}


const initialState: InitialStateIE = {
  isLoading: false,
  isError: false,
  _id: "",
  tgId: 0,
  status: "normal",
  balance: { amount: 0, logs: [] },
  fuel: { amount: 0, max: 0, nextIn: 0 },
  garage: { selected: "", nextIn: 0, purchased: [] },
  races: { nextIn: 0, available: [] },
  raceLogs: [],
  friends: [],
  createdAt: 0,
  lastVisit: 0
}

const userSlice = createSlice({
  name: "user_slice",
  initialState,
  extraReducers: (b) => {
    // auth
    b.addCase(authThunk.pending, (state) => {
      state.isLoading = true;
    });
    b.addCase(authThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false
    });
    b.addCase(authThunk.fulfilled, (state, action: PayloadAction<AuthPayloadIE>) => {
      const { _id, tgId, status, balance, fuel, garage, races, raceLogs, friends, createdAt, lastVisit } = action.payload.userData;
      state._id = _id;
      state.tgId = tgId;
      state.status = status;
      state.balance = balance;
      state.fuel = fuel;
      state.garage = garage;
      state.races = races;
      state.raceLogs = raceLogs;
      state.friends = friends;
      state.createdAt = createdAt;
      state.lastVisit = lastVisit;
      state.isLoading = false;
    });
    // raceRun
    b.addCase(raceRunThunk.pending, (state) => {
      state.isLoading = true;
    });
    b.addCase(raceRunThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    b.addCase(raceRunThunk.fulfilled, (state, action: PayloadAction<RaceRunPayloadIE>) => {
      const { balanceLog, balanceChange, newRaceLog } = action.payload;
      state.balance.amount += balanceChange;
      state.balance.logs.push(balanceLog);
      state.raceLogs.push(newRaceLog);
      state.isLoading = false;
    });
    // requestRaces
    b.addCase(requestRacesThunk.pending, (state) => {
      state.isLoading = true;
    });
    b.addCase(requestRacesThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    b.addCase(requestRacesThunk.fulfilled, (state, action: PayloadAction<RequestRacesPayloadIE>) => {
      const { generatedRaces } = action.payload;
      state.races.available = generatedRaces;
      state.isLoading = false;
    });
    // buyCar
    b.addCase(buyCarThunk.pending, (state) => {
      state.isLoading = true;
    });
    b.addCase(buyCarThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    b.addCase(buyCarThunk.fulfilled, (state, action: PayloadAction<BuyCarPayloadIE>) => {
      const { garageNextIn, balanceLog, recalculatedRaces, selectedCar } = action.payload;
      state.garage.nextIn = garageNextIn;
      state.garage.selected = selectedCar._id;
      state.balance.amount + balanceLog.amount;
      state.balance.logs.push(balanceLog);
      state.races.available = recalculatedRaces;
      state.isLoading = false;
    });
    // selectCar
    b.addCase(selectCarThunk.pending, (state) => {
      state.isLoading = false;
    });
    b.addCase(selectCarThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    b.addCase(selectCarThunk.fulfilled, (state, action: PayloadAction<SelectCarPayloadIE>) => {
      const { carId, recalculatedRaces, garageNextIn } = action.payload;
      state.garage.selected = carId;
      state.garage.nextIn = garageNextIn;
      state.races.available = recalculatedRaces;
      state.isLoading = false;
    });
    // upgradeCarPart
    b.addCase(upgradeCarPartThunk.pending, (state) => {
      state.isLoading = true;
    });
    b.addCase(upgradeCarPartThunk.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    b.addCase(upgradeCarPartThunk.fulfilled, (state, action: PayloadAction<UpgradeCarPartPayloadIE>) => {
      const { recalculatedRaces, upgradedCar, balanceLog } = action.payload;
      state.races.available = recalculatedRaces;
      state.garage.purchased.forEach((item, i) => {
        if (item._id === upgradedCar._id) return state.garage.purchased[i] = upgradedCar;
      });
      state.balance.amount + balanceLog.amount;
      state.balance.logs.push(balanceLog);
      state.isLoading = false;
    });
  },
  reducers: {}
});

export default userSlice.reducer;
// export const { } = userSlice.actions;