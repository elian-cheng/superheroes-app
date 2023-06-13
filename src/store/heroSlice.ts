import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from 'API/URL';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

export interface IHero {
  _id?: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: string[];
}

interface IHeroesState {
  chosenHero: string | null;
  heroes: IHero[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: IHeroesState = {
  chosenHero: null,
  heroes: [],
  isLoading: false,
  isError: false,
};

export const getHeroes = createAsyncThunk(
  'heroes/getAll',
  async (page = 1, thunkAPI) => {
    try {
      const heroes = await axios.get(`heroes?page=${page}`);
      return heroes.data;
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message, { toastId: 'get-heroes-toast-error' });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getHero = createAsyncThunk(
  'heroes/getOne',
  async (id: string, thunkAPI) => {
    try {
      const hero = await axios.get(`${BASE_URL}heroes/${id}`);
      return hero.data;
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message, { toastId: 'get-one-hero-toast-error' });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// toast.success("Hero created successfully", {
//   position: "top-center",
//   autoClose: 6000
// });

export const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setChosenHero: (state, { payload }) => (state.chosenHero = payload),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
        state.isLoading = false;
      })
      .addCase(getHero.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getHeroes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getHero.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getHeroes.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      })
      .addCase(getHero.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      });
  },
});

export const { setChosenHero } = heroesSlice.actions;

export default heroesSlice.reducer;
