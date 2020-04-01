import React, { Component } from 'react';
import { Image } from 'react-native';
// import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Title1, CartContainer, ItemCount } from './styles';
// import Logo from './logo';
import logo from '../../assets/images/logo.png';

// import { Container } from './styles';

// eslint-disable-next-line react/prefer-stateless-function
 export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);
  return (
    <Container>
      <Image
        source={logo}
        resizeMode="cover"
        style={{
          width: 150,
          height: 36,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <CartContainer onPress={() => navigation.navigate('Cart')}>
        <Icon name="local-grocery-store" color="#FFF" size={20} />
        <ItemCount>{cartSize || 0} </ItemCount>
      </CartContainer>
    </Container>
  );
}

/**
 * Aqui estamos retornando para o componente, o valor do cart


export default connect(
  (state) => ({
    cartSize: state.cart.length,
  }),
  null
)(Header);
*/
