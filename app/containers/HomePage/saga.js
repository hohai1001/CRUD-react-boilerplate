import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import _slice from 'lodash/slice';
import _get from 'lodash/get';
// import _filter from 'lodash/filter';
// import _forEach from 'lodash/forEach';
// import _includes from 'lodash/includes';
import { GET_LIST_BOOK_URL } from 'constants/routesApi';
// import { dataListBook } from 'constants/fakeData';
import { GET_LIST_BOOK } from './constants';
import { getListBookSuccess, getListBookFail } from './actions';

// const getDataFake = () =>
//   new Promise(resolve => {
//     setTimeout(() => {
//       resolve(dataListBook);
//     }, 1000);
//   });

function* GetListBook(action) {
  try {
    const limit = _get(action, 'limit', 15);
    const offset = _get(action, 'offset', 0);
    // const keySearch = _get(action, 'text', '');

    // const data = yield call(getDataFake);
    const data = yield call(request, GET_LIST_BOOK_URL);

    const sizeData = data.length;

    // const newData = [];
    // _forEach(data, (item, index) => {
    //   // console.log('boolean', _includes(data[index].title, keySearch));

    //   const resultSearch = _filter(item, { title: keySearch });
    //   console.log('resultSearch', resultSearch);
    //   return newData;
    // });

    const result = _slice(data, offset, limit + offset);

    yield put(getListBookSuccess(result, sizeData));
  } catch (err) {
    yield put(getListBookFail());
  }
}

// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_LIST_BOOK, GetListBook);
}
