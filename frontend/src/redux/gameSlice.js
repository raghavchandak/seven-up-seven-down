import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  points: 300,
  result: "",
  loading: false,
  error: null,
};

export const updatePoints = createAsyncThunk(
  "game/updatePoints",
  async (body) => {
    const res = await api.updatePoints(body);
    return res.data;
  }
);

export const calculateResult = createAsyncThunk(
  "game/calculateResult",
  async (body) => {
    const res = await api.checkResult(body);
    return res.data;
  }
);

// export const calculateResult = createAsyncThunk(
//   "game/calculateResult",
//   (body, bet, betAmount) => {
//     return async (dispatch, getState) => {
//       const res = await api.checkResult(body);

//       const store = getState();

//       const updateBody = {
//         amount: store.points,
//         result: res.data,
//         bet: bet,
//         stake: betAmount,
//       };

//       dispatch(updatePoints(updateBody))
//     };
//   }
// );

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(calculateResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(calculateResult.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      })
      .addCase(updatePoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePoints.fulfilled, (state, action) => {
        state.loading = false;
        state.points = action.payload.amount;
      })
      .addCase(updatePoints.rejected, (state) => {
        state.loading = false;
        state.error = "There was an error";
      }),
});

export default gameSlice.reducer;
