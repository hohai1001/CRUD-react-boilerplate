import { takeLatest, call, put } from 'redux-saga/effects';
import {
  requestGet,
  // requestPost
} from 'utils/request';
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

    const products = yield call(requestGet, GET_LIST_PRODUCT_URL);
    const sizeProducts = _size(products);

    // requestPost(GET_LIST_PRODUCT_URL, {
    //   image:
    //     'https://www.amazon.com/Avidlove-Nightgown-Lingerie-Babydoll-Sleepwear/dp/B072NH3X2X/ref=sr_1_36?dchild=1&keywords=Party+Wear+Gown&qid=1622560349&sr=8-36',
    //   title: 'ABC',
    //   description:
    //     'Avidlove Women Lingerie V Neck Nightwear Satin Sleepwear Lace Chemise Mini Teddy',
    //   availableSizes: ['M', 'L'],
    //   price: 199,
    // });

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
