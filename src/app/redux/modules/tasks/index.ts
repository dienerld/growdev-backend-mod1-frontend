import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { TTask } from '@/@types/app';
import { RootState } from '../..';

const adapter = createEntityAdapter<TTask>({
  selectId: (task) => task.id,
  // sortComparer: (a, b) => a.id.localeCompare(b.id), //compare date
});

const slice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {
    addTask: adapter.addOne,
    addManyTasks: adapter.addMany,
    updateTask: adapter.updateOne,
    removeTask: adapter.removeOne,
    clearTasks: () => adapter.getInitialState(),
  },
});

export const taskActions = slice.actions;
export const taskReducers = slice.reducer;
export const selectorTasks = adapter.getSelectors<RootState>(({ tasks }) => tasks);
