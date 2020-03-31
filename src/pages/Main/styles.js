import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #17161b;
`;

export const List = styled.FlatList`
  margin-top: 20px;
`;

export const Product = styled.View`
  align-items: center;
  margin: 0 20px 30px;
  background-color: #fff;
  border-radius: 10px;
`;
export const ProductList = styled.View`
  align-items; center;
  margin: 0 20px 30px;
`;

export const ImgProduct = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 32px;
  background: #eee;
  align-self: center;
`;
export const NameProduct = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  color: #333;
  line-height: 20px;
  margin-top: 4px;
  text-align: left;
  width: 200px;
`;

export const Price = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #17161b;
  line-height: 20px;
  margin-top: 10px;
  text-align: left;
  width: 200px;
`;

export const AddCart = styled(RectButton)`
  background: #7159c1;
  color: #fff;
  border-radius: 4px;
  margin-top: auto;
  align-items: center;
  flex-direction: row;
`;

export const AddCartView = styled.View`
  padding: 10px;
  flex-direction: row;
`;

export const TextCart = styled.Text`
  color: #fff;
  font-size: 14px;
  width: 200px;
`;

export const ProductAmountText = styled.Text`
  color: #fff;
  margin: 0px 4px 0px 10px;
`;
