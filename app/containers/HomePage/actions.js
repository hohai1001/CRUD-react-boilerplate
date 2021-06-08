/*
 *
 * HomePage actions
 *
 */

import {
  GET_LIST_PRODUCTS,
  GET_LIST_PRODUCTS_SUCCESS,
  GET_LIST_PRODUCTS_FAIL,
} from './constants';

export function getListProduct(limit, offset, text) {
  return {
    type: GET_LIST_PRODUCTS,
    limit,
    offset,
    text,
  };
}

export function getListProductSuccess(data) {
  return {
    type: GET_LIST_PRODUCTS_SUCCESS,
    data,
  };
}

export function getListProductFail(error) {
  return {
    type: GET_LIST_PRODUCTS_FAIL,
    error,
  };
}
