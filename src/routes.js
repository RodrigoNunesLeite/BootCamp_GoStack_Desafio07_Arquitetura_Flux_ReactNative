/**
 * Aqui é criado um container onde fica toda a navegação
 * da nossa aplicação.
 *
 * O react-navigation possui varios tipos de navegações.abs
 *
 * Cada tipo de navegação tem sua propria lib
 */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Header from './components/Header';
import Main from './pages/Main';
import Cart from './pages/Cart';

const Routes = createAppContainer(
  /**
   * Qualquer tipo de navegação tem que vir dentro do
   * createAppContainer, senão não funciona
   */
  createStackNavigator(
    {
      Main,
      Cart,
    },
    {
      /**
       * quando mudo de rota, essa propriedade esconde o
       * nome da pagina anterior
       */

      defaultNavigationOptions: (navigation) => ({
        header: () => <Header {...navigation} />,
        headerBackTitleVisible: false,
        // cor dos textos, botoes etc
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }),
    }
  )
);

export default Routes;
