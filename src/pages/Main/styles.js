import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const List = styled.FlatList`
  margin-top: 20px;
`;

export const Product = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;
export const ImgProduct = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
`;
export const NameProduct = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
  margin-top: 4px;
  text-aling: center;
`;
