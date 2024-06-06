import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

export const rollDice = async () => (await api.get("generate-numbers")).data;
export const checkResult = (body) => api.post("check-result", body);
export const updatePoints = (body) => api.post("calculate-amount", body);

const apiService = { rollDice, checkResult, updatePoints };

export default apiService;
