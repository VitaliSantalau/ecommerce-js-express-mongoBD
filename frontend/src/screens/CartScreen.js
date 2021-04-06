import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl } from "../utils";

const addToCard = (item , forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(x => x.product === item.product)
  if(existItem) {
    cartItems = cartItems.map(x => 
      x.product === existItem.product ? item : x
    );
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
};

const CartScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    if(request.id) {
      const product = await getProduct(request.id);
      addToCard({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1, 
      })
    }

    const cartItems = getCartItems();

    return `
    <div class="cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          ${
            cartItems.length === 0
              ? '<div>Cart is empty.<a href="/#/">Go to shopping...<a></div>'
              : cartItems.map(item => `
              <li>
                <div class="cart-image">
                  <img src="${item.image}" alt="${item.name}"/>
                </div>
                <div class="cart-name">
                  <div>
                    <a href="/#/product/${item.product}">
                      ${item.name}
                    </a>
                  </div>
                  <div>
                    Qty:<select class="qty-select" id="${item.product}">
                          <option value="1">1</option>
                        </select>
                    <button type="button" class="delete-button" id="${item.product}">Delete</button>
                  </div>
                </div>
                <div class="cart-price">
                  $${item.price}
                </div>
              </li>
              `).join('\n')
          }
        <ul>
      </div>
      <div class="cart-action">
          <h3>
            Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
           :
            $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button id="checkout-button" class="primary fw">
            Proceed to Checkout
          </button>
      </div>
    </div>
    `
  }
}

export default CartScreen