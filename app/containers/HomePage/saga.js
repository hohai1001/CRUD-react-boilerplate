import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import _slice from 'lodash/slice';
import _get from 'lodash/get';
import { GET_LIST_BOOK } from './constants';
import { getListBookSuccess, getListBookFail } from './actions';

function* GetListBook(action) {
  try {
    const urlApi = 'https://jsonplaceholder.typicode.com/posts';
    const limit = _get(action, 'limit', 15);
    const offset = _get(action, 'offset', 0);

    const data = yield call(request, urlApi);
    const result = _slice(data, offset, limit + offset);

    yield put(getListBookSuccess(result));
  } catch (err) {
    yield put(getListBookFail());
  }
}

// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_LIST_BOOK, GetListBook);
}
