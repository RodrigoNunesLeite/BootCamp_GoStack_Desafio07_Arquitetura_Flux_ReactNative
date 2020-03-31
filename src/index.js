import React from 'react';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';
import { StatusBar } from 'react-native';
import store from './store';
/**
 * É sempre bom colocar a importação das rotas, abaixo da
 * importação do reactotron, porque assim, ele vai conseguir
 * capturar os erros e exibir no console
 */
import Routes from './routes';
import NavigationService from './services/navigation';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <Routes
          ref={(navigatorRef) => NavigationService.setNavigator(navigatorRef)}
        />
      </Provider>
    </>
  );
}
