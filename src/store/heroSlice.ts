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
  // chosenHero: IHero | null;
  heroes: IHero[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: IHeroesState = {
  // chosenHero: null,
  heroes: [],
  isLoading: false,
  isError: false,
};

export const getHeroes = createAsyncThunk(
  'heroes/getAll',
  async (page: number, thunkAPI) => {
    try {
      const heroes = await axios.get(`heroes?page=${page || 1}`);
      return heroes.data;
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message, { toastId: 'get-heroes-toast-error' });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const getHero = createAsyncThunk(
//   'heroes/getOne',
//   async (id: string, thunkAPI) => {
//     try {
//       const hero = await axios.get(`heroes/${id}`);
//       console.log(hero.data);
//       return hero.data;
//     } catch (err) {
//       const error = err as AxiosError;
//       toast.error(error.message, { toastId: 'get-one-hero-toast-error' });
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

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
      toast.success('A hero was updated!');
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message, { toastId: 'update-hero-toast-error' });
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
    // setChosenHero: (state, { payload }) => (state.chosenHero = payload),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
        state.isLoading = false;
      })
      // .addCase(getHero.fulfilled, (state, action) => {
      //   state.chosenHero = action.payload;
      //   state.isLoading = false;
      // })
      .addCase(createHero.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateHero.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getHeroes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      // .addCase(getHero.pending, (state) => {
      //   state.isLoading = true;
      //   state.isError = false;
      // })
      .addCase(createHero.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateHero.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getHeroes.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      })
      // .addCase(getHero.rejected, (state, action) => {
      //   state.isError = true;
      //   state.isLoading = false;
      //   console.error(action.error.message);
      // })
      .addCase(createHero.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      })
      .addCase(updateHero.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      });
  },
});

// export const { setChosenHero } = heroesSlice.actions;

export default heroesSlice.reducer;
