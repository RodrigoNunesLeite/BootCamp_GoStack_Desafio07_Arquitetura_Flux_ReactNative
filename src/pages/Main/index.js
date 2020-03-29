import React, { Component } from 'react';
import { View } from 'react-native';
import api from '../../services/api';
import { Container, List, ImgProduct, NameProduct, Product } from './styles';

// import { Container } from './styles';

export default class Main extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');
    console.tron(response);
    const data = response.data.map((product) => ({
      ...product,
    }));
    console.tron(response.data);
    this.setState({ products: data });
  }

  render() {
    const { products } = this.state;

    return (
      <Container>
        <Product>
          <List
            data={products}
            keyExtractor={(id) => products.id}
            renderItem={({ product }) => (
              <Product>
                <ImgProduct source={{ uri: product.image }} />
              </Product>
            )}
          />
        </Product>
      </Container>
    );
  }
}
