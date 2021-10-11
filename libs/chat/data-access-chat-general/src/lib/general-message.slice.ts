import { MessageDto } from '@nx-mess/chat/data-access-api';
import { createSlice, noopReducer, PayloadAction } from 'ngrx-slice';
import { createSliceEntityAdapter } from 'ngrx-slice/entity';

export interface GeneralMessageDto extends MessageDto {
  isSuccess: boolean;
}

const generalMessageAdapter = createSliceEntityAdapter<GeneralMessageDto>({
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
    addEager: (
      state,
      { eagerMessage }: PayloadAction<{ eagerMessage: Partial<MessageDto> }>
    ) => {
      generalMessageAdapter.addOne(state, {
        ...eagerMessage,
        isSuccess: false,
      } as GeneralMessageDto);
    },
    addSuccess: generalMessageAdapter.updateOne,
    removeEager: generalMessageAdapter.removeOne,
    addServer: generalMessageAdapter.addOne,
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
