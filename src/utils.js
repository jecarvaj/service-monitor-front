import { getActivePinia } from "pinia";

const resetAllStores = () => {
  const pinia = getActivePinia()
  if (!pinia) {
    throw new Error("There is no active Pinia instance")
  }

  pinia._s.forEach((store) => store.$reset())
}

export { resetAllStores };
