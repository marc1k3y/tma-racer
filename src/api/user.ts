import { $authHost, $host } from "@/service/http";
import { CarUpgradePartTypes } from "@/service/types";

export class UserAPI {

  async auth(tgId: string) {
    try {
      const { data } = await $host.get("user/auth", { params: { tg_id: tgId } });
      return data;
    } catch (e) {
      return console.error(e);
    }
  }

  async raceRun(raceId: string) {
    try {
      const { data } = await $authHost.get("user/raceRun", { params: { raceId } });
      return data;
    } catch (e) {
      return console.error(e);
    }
  }

  async requestRaces() {
    try {
      const { data } = await $authHost.get("user/requestRaces");
      return data;
    } catch (e) {
      return console.error(e);
    }
  }

  async buyCar(carId: string) {
    try {
      const { data } = await $authHost.get("user/buyCar", { params: { carId } });
      return data;
    } catch (e) {
      return console.error(e);
    }
  }

  async selectCar(carId: string) {
    try {
      const { data } = await $authHost.get("user/selectCar", { params: { carId } });
      return data;
    } catch (e) {
      return console.error(e);
    }
  }

  async upgradeCarPart(carId: string, part: CarUpgradePartTypes) {
    try {
      const { data } = await $authHost.get("user/upgradeCarPart", { params: { carId, part } });
      return data;
    } catch (e) {
      return console.error(e);
    }
  }

}