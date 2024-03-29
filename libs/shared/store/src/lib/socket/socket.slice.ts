import { UserDto } from '@nx-mess/chat/data-access-api';
import { createSlice } from 'ngrx-slice';
import { createSliceEntityAdapter } from 'ngrx-slice/entity';

const socketAdapter = createSliceEntityAdapter<UserDto>({
  selectId: (model) => model.userId,
});

const { name, reducer, actions, selectors } = createSlice({
  name: 'connected-socket',
  initialState: socketAdapter.getInitialState(),
  reducers: {
    add: socketAdapter.addOne,
    addMany: socketAdapter.addMany,
    remove: socketAdapter.removeOne,
  },
});

export const ConnectedSocketFeature = { name, reducer };
export const ConnectedSocketActions = actions;

const adapterSelectors = socketAdapter.getSelectors(
  selectors.selectConnectedSocketState
);

export const ConnectedSocketSelectors = {
  ...selectors,
  ...adapterSelectors,
};
