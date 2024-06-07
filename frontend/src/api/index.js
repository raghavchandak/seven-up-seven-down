import axios from "axios";

const api = axios.create({
  baseURL: "https://seven-up-seven-down-backend.onrender.com/",
});

export const rollDice = async () => (await api.get("generate-numbers")).data;
export const checkResult = (body) => api.post("check-result", body);
export const updatePoints = (body) => api.post("calculate-amount", body);

const apiService = { rollDice, checkResult, updatePoints };

export default apiService;
