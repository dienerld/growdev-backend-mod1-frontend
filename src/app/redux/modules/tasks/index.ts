import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { TTask } from '@/@types/app';
import { RootState } from '../..';

const adapter = createEntityAdapter<TTask>({
  selectId: (task) => task.id,
  sortComparer: (a, b) => {
    const aDate = new Date(a.date);
    aDate.setHours(0, 0, 0, 0);
    const bDate = new Date(b.date);
    bDate.setHours(0, 0, 0, 0);

    const timeDiff = aDate.getTime() - bDate.getTime();
    if (timeDiff !== 0) return timeDiff;

    const [aHour, aMinute] = a.hour.split(':');
    const [bHour, bMinute] = b.hour.split(':');
    const hourDiff = Number(aHour) - Number(bHour);
    if (hourDiff !== 0) {
      return hourDiff;
    }
    return Number(aMinute) - Number(bMinute);
  },
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
