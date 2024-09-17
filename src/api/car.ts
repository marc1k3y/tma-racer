import { $authHost } from "@/service/http";

export class CarAPI {

  async getAll() {
    try {
      const { data } = await $authHost.get("car/getAll");
      return data;
    } catch (e) {
      return console.error(e);
    }
  }

}