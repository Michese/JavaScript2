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
        this._getProducts();
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
            .then(data => {
                this.goods = [...data];
                this._render();
            })
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
        return `<div class="product-item" data-id=${this.id_product}>
                <img src=${this.img} alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}

class CartList {
    constructor(url = `${API}/catalogData.json`, container = '.cart__table') {
        this.container = container;
        this.allCartProducts = [];
        this.goods = [];
        this._getProducts(url);
    }

    _getProducts(url) {
        fetch(url)
            .then(promise => promise.json())
            .then(data => {
                this.goods = [...data];
                this._getAllProducts();
            })
            .catch(error => console.log(error));
    }

    addCartEl(idProductEl) {
        this.allCartProducts.forEach(cartProduct => {
            if (cartProduct.id_product === idProductEl) {
                const childId = document.querySelector(`td[data-id="${cartProduct.id_product}"]`);
                if (childId === null) {
                    ++cartProduct.quantity;
                    this._renderAdd(cartProduct);
                } else {
                    const childQuantity = childId.parentNode.querySelector(`td[data-quantity = "${cartProduct.quantity}"]`);
                    ++cartProduct.quantity;
                    ++childQuantity.dataset.quantity;
                    childQuantity.innerHTML = cartProduct.quantity;
                }
            }
        })
    }

    removeCartEl(idProductEl) {

    }

    _getAllProducts() {
        this.allCartProducts = this.goods.map(good => new CartItem(good));
    }

    _renderAdd(cartProduct) {
        const block = document.querySelector(this.container);
        block.insertAdjacentHTML("beforeend", cartProduct.render());
        const empty = document.querySelector('.empty');
        if (empty !== null) {
            empty.style.display = 'none';
        }
    }
}

class CartItem extends ProductItem {
    constructor(productItem, img) {
        super(productItem, img)
        this.quantity = 0;
    }

    render() {
        return `<tr>
            <td data-id=${this.id_product}>${this.id_product}</td>
            <td data-name=${this.product_name}>${this.product_name}</td>
            <td data-price=${this.price}>${this.price}</td>
            <td data-quantity=${this.quantity}>${this.quantity}</td>
            <td class="delete">Del</td>
        </tr>`;
    }
}

function addEventAddButton() {
    const addToCartButtons = document.querySelectorAll('.buy-btn');
    setTimeout(
        addToCartButtons.forEach(button => {
            button.addEventListener('click', event => {
                const idItem = Number(event.target.parentNode.parentNode.dataset.id);
                cart.addCartEl(idItem);
            })
        })
        , 500)
}

window.addEventListener('load', function () {
    new ProductList();
    const cart = new CartList();
    setTimeout(() => {
    const addToCartButtons = document.querySelectorAll('.buy-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', event => {
                const idItem = Number(event.target.parentNode.parentNode.dataset.id);
                cart.addCartEl(idItem);
            })
        })}
        , 500)

})

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