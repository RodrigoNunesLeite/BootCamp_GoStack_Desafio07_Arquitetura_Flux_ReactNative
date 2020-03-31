/**
 * metodo para conseguirmos chamar a api
 * o call é responsavel por chamar metodos assyncronos
 * e que retornam promises
 *
 * put = metodo usado para disparar a action
 *
 * select é responsavel por buscar informações dentro do estado
 */

import { call, put, all, takeLatest, select } from 'redux-saga/effects';

import { Alert } from 'react-native';
import NavigationService from '../../../services/navigation';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

/**
 * esse "*" depois da function significa generator, funciona como
 * um async
 *
 * Essa funcao addToCart, vai buscar os detalhes do produto
 * e inserir no carrinho
 *
 * Quando a action do addToCart from acionada, ao inves
 * de chamar o reducer, vai primeiro passar pelo sagas
 *
 * O sagas vai pegar os dados da api e depois disso vai chamar
 * o reducer
 *
 * O yield funciona como o await do async, nesse caso é o
 * await do generator
 */

function* addToCart({ id }) {
  /**
   * Verificando se o produto já esta no carrinho
   *
   * No call, o primeiro parametro é o metodo e o
   * segundo é o valor que viria dentro do get
   */
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Alert.alert('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
    NavigationService.navigate('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    Alert.alert('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

/**
 * Aqui vamos cadastrar listeners para ouvir as actions,
 * para que assim que forem acionados, executar a action
 * que chame o sagas.js
 *
 * takeLatest = Se o usuario clicar no botão duas vezes e a
 * segunda vez foi antes do saga consultar a api e retornar
 * o valor esperado, ele vai descartar a primeira chamada e
 * cadsatrar o produto uma unica vez no carrinho
 */

export default all([
  /**
   * 1º parametro: qual action do redux queremos ouvir
   * 2º parametro: qual a funcao queremos diparar
   */
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
