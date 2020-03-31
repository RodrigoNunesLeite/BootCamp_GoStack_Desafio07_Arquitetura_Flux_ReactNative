import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
/**
 * _DEV_ = variavel global do react native
 * que retorna true quando o usuario está
 * executando o app em desenvolvimento
 */
if (__DEV__) {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .useReactNative()
    .connect();

  /**
   * Criando uma nova propriedade dentro da variavel global
   * console, isso vai possibilitar usar console.tron em
   * toda a aplicação
   */
  console.tron = tron;

  /**
   * Limpa todo meu console, sempre que eu recarregar meu app
   */
  tron.clear();
}
