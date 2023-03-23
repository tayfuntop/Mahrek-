import { configureStore } from '@reduxjs/toolkit';
import data from '../Action/TreeData';
import id from '../Action/currentId';

export const store = configureStore({
  reducer: {
    treeDatas: data,
    currentId: id,
  },
});