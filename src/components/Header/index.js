import React, { Component } from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Title1 } from './styles';
// import Logo from './logo';
import logo from '../../assets/images/logo.png';

// import { Container } from './styles';

// eslint-disable-next-line react/prefer-stateless-function
export default class Header extends Component {
  render() {
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
        <Icon name="local-grocery-store" color="#FFF" size={20} />
      </Container>
    );
  }
}
