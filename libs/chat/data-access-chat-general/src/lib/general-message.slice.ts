import { MessageDto } from '@nx-mess/shared/data-access-api';
import { createSlice, noopReducer } from 'ngrx-slice';
import { createSliceEntityAdapter } from 'ngrx-slice/entity';

const generalMessageAdapter = createSliceEntityAdapter<MessageDto>({
  selectId: (message) => message.id,
});

const { name, reducer, selectors, actions } = createSlice({
  name: 'general-message',
  initialState: generalMessageAdapter.getInitialState(),
  reducers: {
    load: {
      success: generalMessageAdapter.setAll,
      trigger: noopReducer(),
    },
  },
});

const adapterSelectors = generalMessageAdapter.getSelectors(
  selectors.selectGeneralMessageState
);

export const GeneralMessageFeature = { name, reducer };
export const GeneralMessageActions = actions;

export const GeneralMessageSelectors = {
  ...selectors,
  ...adapterSelectors,
};
