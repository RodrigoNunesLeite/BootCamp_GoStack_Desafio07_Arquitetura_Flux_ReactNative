import React, { Component } from 'react';
/**
 * Conecta o estado criado no redux, com o nosso componente
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

class Main extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const response = await api.get('/products');

    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  };

  handleAddProduct = (id) => {
    /**
     * O Dispatch é usado para disparar uma action para o redux,
     * temos acesso a essa propriedade assim que conectamos
     * nosso componente ao connect do react-redux
     */
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  renderItens = ({ item }) => {
    const { amount } = this.props;

    return (
      <ProductList key={item.id}>
        <ImgProduct source={{ uri: item.image }} />
        <NameProduct>{item.title}</NameProduct>
        <Price>{item.price}</Price>
        <AddCart onPress={() => this.handleAddProduct(item.id)}>
          <AddCartView>
            <Icon name="local-grocery-store" size={20} color="#FFF" />

            <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
          </AddCartView>

          <TextCart> ADICIONAR AO CARRINHO </TextCart>
        </AddCart>
      </ProductList>
    );
  };

  render() {
    const { products } = this.state;
    return (
      <Container>
        <Product>
          <List
            horizontal
            data={products}
            extraData={this.props}
            keyExtractor={(item) => String(item.id)}
            renderItem={this.renderItens}
          />
        </Product>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

/**
 * Transforma actions do redux, em propriedades
 * do nosso componente, por exemplo a funcao
 * addToCart dentro do CartAction pode ser
 * chamada diretamente do props
 */

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

/**
 * O connect chama uma funcao e nesse caso, estamos
 * passando o valor 'Home' para essa funcao
 */

export default connect(mapStateToProps, mapDispatchToProps)(Main);
