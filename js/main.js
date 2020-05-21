'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                return reject(`error ${xhr.status} ${xhr.statusText}`);
            } else {
                return resolve(xhr.responseText);
            }
        }
        xhr.send();
    })
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this._fetchProducts();
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this._render();
            });
    }

    _fetchProducts() {
        getRequest(`${API}/catalogData.json`).then(data => {
            this.goods = JSON.parse(data);
            this._render();
        }).catch(error => console.log(error));
    }

    _getProducts() {
        fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    _sumPriceGoods() {
        let result = 0;
        this.allProducts.forEach(product => {
            result += product.price;
        })
        return result;
    }
}

class ProductItem {

    constructor(product, img = 'https://placehold.it/200x150') {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}

class CartList {
    constructor() {

    }

}

class CartItem extends ProductItem {
    constructor(productItem, img) {
        super(productItem, img)
        this.quantity = 1;
    }

    render() {
        return `<tr>
            <td>${this.id_product}</td>
            <td>${this.product_name}</td>
            <td>${this.price}</td>
            <td>${this.quantity}</td>
        </tr>`;
    }
}

new ProductList();
// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://placehold.it/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => document.querySelector('.products')
//     .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
//
// renderProducts(products);