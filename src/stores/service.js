import { defineStore } from "pinia";
import { getServices } from "@/services/api.service";

export const useServiceStore = defineStore("service", {
  state: () => ({
    services: [],
    service: {},
    schedule_days: [],
    agents: [],
    infoSummary: {},
    selectedWeek: null,
    loading: false,
    companies: [],
  }),

  getters: {},

  actions: {
    async fetchServices() {
      await getServices()
        .then((res) => {
          this.services = res.data["services"];
          this.agents = res.data["agents"];
          this.companies = res.data["companies"];
        })
        .catch((err) => {
          console.log("error fetchServices");
        });
    },
  },
});
