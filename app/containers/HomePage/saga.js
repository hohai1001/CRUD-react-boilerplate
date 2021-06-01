import { takeLatest, call, put } from 'redux-saga/effects';
import requestGet from 'utils/request';
import _slice from 'lodash/slice';
import _get from 'lodash/get';
import _size from 'lodash/size';
import _isEmpty from 'lodash/isEmpty';
import { GET_LIST_PRODUCT_URL } from 'constants/routesApi';
// import { dataListBook } from 'constants/fakeData';
import { GET_LIST_PRODUCTS } from './constants';
import { getListProductSuccess, getListProductFail } from './actions';

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

    // // const data = yield call(getDataFake);

    fetch('https://60608ef404b05d0017ba2b0c.mockapi.io/api/products', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => console.log(json));

    const products = yield call(requestGet, GET_LIST_PRODUCT_URL);
    const sizeProducts = _size(products);

    const result = _slice(products, offset, limit + offset);

    if (!_isEmpty(result)) {
      yield put(getListProductSuccess(result, sizeProducts));
    } else {
      yield put(getListProductFail());
    }

    // const sizeData = data.length;
    // let result = [];
    // if (!_isEmpty(keySearch)) {
    //   result = _filter(data, { title: keySearch });
    // } else {
    //   result = _slice(data, offset, limit + offset);
    // }
    // // const result = _slice(data, offset, limit + offset);
    // yield put(getListBookSuccess(result, sizeData, keySearch));
  } catch (err) {
    yield put(getListProductFail(err));
  }
}

// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_LIST_PRODUCTS, GetListBook);
}
