/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import _size from 'lodash/size';
import _get from 'lodash/get';
import {
  GET_LIST_PRODUCTS,
  GET_LIST_PRODUCTS_SUCCESS,
  GET_LIST_PRODUCTS_FAIL,
} from './constants';

export const initialState = {
  data: [],
  linkParams: {
    limit: 8,
    offset: 0,
    keySearch: '',
    sizeData: 0,
  },
  statusFlags: {
    isLoading: false,
    isShowLoadMore: false,
    isGetListFail: false,
    isCallApi: false,
    isGetProductSuccess: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_PRODUCTS:
        draft.statusFlags.isLoading = true;
        draft.statusFlags.isCallApi = true;
        if (action.offset === 0) {
          draft.linkParams.offset = initialState.linkParams.offset;
        }
        break;

      case GET_LIST_PRODUCTS_SUCCESS: {
        const data = _get(action.data, 'data', []);
        const sizeData = _get(action.data, 'sizes', 0);
        draft.statusFlags.isLoading = false;
        draft.linkParams.sizeData = sizeData;
        draft.statusFlags.isShowLoadMore =
          _size(data) >= state.linkParams.limit;
        draft.linkParams.offset =
          _size(data) > 0 ? state.linkParams.offset + _size(data) : 0;

        if (_size(data) > 0) {
          draft.statusFlags.isGetProductSuccess = true;
          draft.data = [...state.data, ...data];
        }
        break;
      }

      case GET_LIST_PRODUCTS_FAIL:
        draft.statusFlags.isGetListFail = true;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isGetProductSuccess = false;
        draft.linkParams.offset = initialState.linkParams.offset;
        break;
    }
  });

export default homePageReducer;
