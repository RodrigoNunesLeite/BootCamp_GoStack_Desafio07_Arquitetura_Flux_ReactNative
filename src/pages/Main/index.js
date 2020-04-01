import React, { useState, useEffect } from 'react';
/**
 * Conecta o estado criado no redux, com o nosso componente
 */

// import { connect } from 'react-redux';
/**
 * O use selector, substitui o connect, ele permite
 * selecionar os valores do estado
 *
 * useDispath é usado para disparar nossas actions
 */
import { useDispatch, useSelector } from 'react-redux';

// import { bindActionCreators } from 'redux';
/**
 * O cartActions contem todas as funcoes do componente actions
 */
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import {
  Container,
  List,
  ImgProduct,
  NameProduct,
  Product,
  ProductList,
  Price,
  AddCart,
  AddCartView,
  TextCart,
  ProductAmountText,
} from './styles';

// import { Container } from './styles';

function Main() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;

      return amount;
    }, {}));

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts () {
      const response = await api.get('/products');

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      // this.setState({ products: data });
      setProducts(data);
    }
    getProducts();
  }, []);

  function handleAddProduct  (id) {
    /**
     * O Dispatch é usado para disparar uma action para o redux,
     * temos acesso a essa propriedade assim que conectamos
     * nosso componente ao connect do react-redux
     */
    //const { addToCartRequest } = this.props;

    dispatch(CartActions.addToCartRequest(id));
  };

  function renderItens ({item}) {
    // const { amount } = this.props;
    return (
      <ProductList key={item.id}>
        <ImgProduct source={{ uri: item.image }} />
        <NameProduct>{item.title}</NameProduct>
        <Price>{formatPrice(item.price)}</Price>
        <AddCart onPress={() => handleAddProduct(item.id)}>
          <AddCartView>
            <Icon name="local-grocery-store" size={20} color="#FFF" />

            <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
          </AddCartView>

          <TextCart> ADICIONAR AO CARRINHO </TextCart>
        </AddCart>
      </ProductList>
    );
  };

    // const { products } = this.state;
    return (
      <Container>
        <Product>
          <List
            horizontal
            data={products}
            extraData={amount}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItens}
          />
        </Product>
      </Container>
    );
}

/*
const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});
*/
/**
 * Transforma actions do redux, em propriedades
 * do nosso componente, por exemplo a funcao
 * addToCart dentro do CartAction pode ser
 * chamada diretamente do props
 */
/*
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);
*/
/**
 * O connect chama uma funcao e nesse caso, estamos
 * passando o valor 'Home' para essa funcao
 */
/*
export default connect(mapStateToProps, mapDispatchToProps)(Main);
*/
export default Main;
