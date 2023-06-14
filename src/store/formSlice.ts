import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData } from 'pages/HeroPage/components/Form/Form';

interface IFormState {
  formData: IFormData[];
}

const initialState: IFormState = {
  formData: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IFormData>) => {
      state.formData.unshift(action.payload);
    },
  },
});

export const { addOrder } = formSlice.actions;

export default formSlice.reducer;
