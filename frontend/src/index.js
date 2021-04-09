import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { hideLoading, parseRequestUrl, showLoading } from './utils';
import SigninScreen from './screens/SigninScreen';
import Header from './components/Header';

const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
}

const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl = 
    (request.resource ? `/${request.resource}` : `/`) + 
    (request.id ? `/:id` : ``) + 
    (request.verb ? `/${request.verb}` : ``);
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  if (Header.after_render) await Header.after_render();

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();

  hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);