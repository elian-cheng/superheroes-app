import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from 'API/URL';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { IFormData } from 'pages/HeroPage/components/Form/Form';

axios.defaults.baseURL = BASE_URL;

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
  page: number;
  limit: number;
  count: number;
  heroes: IHero[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: IHeroesState = {
  page: 1,
  limit: 5,
  count: 0,
  heroes: [],
  isLoading: false,
  isError: false,
};

export const getHeroes = createAsyncThunk(
  'heroes/getAll',
  async (queryParams: { page: number; limit: number }, thunkAPI) => {
    try {
      const { data } = await axios.get(`heroes`, {
        params: { ...queryParams },
      });
      console.log(data);
      return data;
    } catch (err: unknown) {
      const error = err as AxiosError;
      toast.error(error.message, { toastId: 'get-heroes-toast-error' });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createHero = createAsyncThunk(
  'heroes/create',
  async (heroData: IFormData, thunkAPI) => {
    try {
      await axios.post('heroes', heroData);
      toast.success('A new hero was created!');
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message, { toastId: 'create-hero-toast-error' });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateHero = createAsyncThunk(
  'heroes/update',
  async ({ id, heroData }: { id: string; heroData: IFormData }, thunkAPI) => {
    try {
      await axios.put(`heroes/${id}`, heroData);
      toast.success('The hero was updated!');
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message, { toastId: 'update-hero-toast-error' });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteHero = createAsyncThunk(
  'heroes/delete',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`heroes/${id}`);
      toast.success('The hero was removed!');
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message, { toastId: 'delete-hero-toast-error' });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload.heroes;
        state.count = action.payload.count;
        state.isLoading = false;
      })
      .addCase(createHero.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateHero.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteHero.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getHeroes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createHero.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateHero.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteHero.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getHeroes.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      })
      .addCase(createHero.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      })
      .addCase(updateHero.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      })
      .addCase(deleteHero.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      });
  },
});

export const { setPage } = heroesSlice.actions;

export default heroesSlice.reducer;
