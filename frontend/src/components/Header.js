import { getUserInfo } from "../localStorage";

const Header = {
  render: () => {
    const { name } = getUserInfo();
    return `
    <div class="logo">
      <a href="/#/">ecommerce</a>
    </div>
    <div class="row">
      ${
        name 
         ? `<a href="/#/profile">${name}</a>`
          : `<a href="/#/signin" class="signin">
              <i class="fa fa-sign-in"></i>
            </a>`
      }
      <a href="/#/cart" class="cart">
        <i class="fa fa-shopping-cart"></i>
      </a>
    </div>`
  },
  after_render: () => {},
};

export default Header;