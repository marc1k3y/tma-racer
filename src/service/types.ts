export type RaceLevelTypes = "easy" | "medium" | "hard";
export type BalanceLogTypes = "race_win" | "race_loss" | "part_upgrade" | "car_buy";
export type CarUpgradePartTypes = "engine" | "transmission" | "wheels" | "turbo";
export type CarUpgradeIndicatorTypes = "weight" | "acceleration" | "maxSpeed";
export type UserStatusTypes = "normal" | "vip";

export interface SliceIE {
  isLoading: boolean
  isError: boolean
}

export interface TokenPayload {
  tgId: string
  _id: string
}

export interface AuthRequest extends Request {
  token: TokenPayload
}

export interface LevelDefiningFactorsIE {
  weight: LevelDefiningFactorIE[]
  acceleration: LevelDefiningFactorIE[]
  maxSpeed: LevelDefiningFactorIE[]
}

export interface LevelDefiningFactorIE {
  level: RaceLevelTypes
  factor: number
}

export interface BalanceLogIE {
  type: BalanceLogTypes
  amount: number
  timestamp: number
}

export interface UserBalanceIE {
  amount: number
  logs: BalanceLogIE[]
}

export interface RaceLogCarIE {
  title: string
  images: CarImagesIE
  indicators: CarIndicatorsIE
}

export interface UserRaceLogIE {
  timestamp: number
  userCar: RaceLogCarIE
  rival: RaceRivalIE
  level: RaceLevelTypes
  isWin: boolean
  balanceChange: number
}

export interface UserFuelIE {
  amount: number
  max: number
  nextIn: number
}

export interface UserGarageIE {
  selected: string
  nextIn: number
  purchased: UserCarWithIdIE[]
}

export interface UserRacesIE {
  nextIn: number
  available: RaceGeneratedResultIE[]
}

export interface UserIE {
  status: UserStatusTypes
  balance: UserBalanceIE
  friends: number[]
  raceLogs: UserRaceLogIE[]
  fuel: UserFuelIE
  garage: UserGarageIE
  races: UserRacesIE
  createdAt: number
  lastVisit: number
}

export interface UserWithIdIE extends UserIE {
  _id: string
  tgId: number
}

export interface CarIndicatorsIE {
  weight: number
  acceleration: number
  maxSpeed: number
}

export interface UpgradeBoostValuesIE {
  weight: number
  acceleration: number
  maxSpeed: number
}

export interface UpgradeIE {
  level: number
  priceStart: number
  priceFactor: number
  cooldownFactor: number
  nextIn: number
}

export interface CarUpgradesIE {
  engine: UpgradeIE
  transmission: UpgradeIE
  wheels: UpgradeIE
  turbo: UpgradeIE
}

export interface CarImagesIE {
  side: string
  top: string
}

export interface UserCarIE {
  factor: number
  price: number
  images: CarImagesIE
  title: string
  indicators: CarIndicatorsIE
  upgrades: CarUpgradesIE
}

export interface UserCarWithIdIE extends UserCarIE {
  _id: string
}

export interface RivalCarIE {
  images: CarImagesIE
  title: string
  indicators: CarIndicatorsIE
}

export interface RaceRivalIE {
  avatarUri: string
  username: string
  car: RivalCarIE
}

export interface RaceGeneratedResultIE {
  id: string
  level: RaceLevelTypes
  rival: RaceRivalIE
  possibleWin: number
  possibleLoss: number
}

export interface CooldownIE {
  upgrades: {
    engine: number,
    transmission: number,
    whells: number,
    turbo: number,
  },
  fuel: number,
  requestRaces: number,
  carSelect: number
}