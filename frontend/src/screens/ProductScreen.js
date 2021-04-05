import { getProduct } from "../api";
import { parseRequestUrl } from "../utils";
import Rating from '../components/Raiting';

const ProductScreen = {
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if(product.error) {
      return `<div>${product.error}</div>`
    }

    return `
    <div class="content">
      <div class="back-to-products">
        <a href="/#/">
          <i class="fa fa-arrow-left"></i>
          Back
        </a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}"/>
        </div>
        <div class="detail-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
              ${Rating.render({ 
                value: product.rating, 
                text: `${product.numReviews} reviews` 
              })}
            </li>
            <li>
               Price: <strong>$${product.price}</strong>
            </li>
            <li>
              Description:
                <div>
                  ${product.description}
                </div>
            </li>
          </ul>
        </div>
        <div class="details-action">
          <ul>
            <li>
              Price: $${product.price}
            </li>
            <li>
              Status: 
                ${product.coutInStock > 0 
                  ? `<span class="success">In Stock</span>` 
                  : `<span class="error">Unavailable</span>` 
                }
            </li>
            <li>
              <button id="add-button" class="primary">Add to Cart</button>  
            </li>
          </ul>
        </div>
      </div>
    </div>
    `
  }
}

export default ProductScreen 