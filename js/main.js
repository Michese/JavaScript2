const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProducts = (list) => {
    const productList = list.map(({title, price}) => {
        return `<div class="product__item">
                <h3 class="product__h3">${title}</h3>
                <img class = "product__image" src="http://placehold.it/200x120" />
                <p class="product__price">${price}</p>
                <button class="button product__addItem">Добавить в корзину</button>
              </div>`
    }).join("");
    console.log(productList);
    document.querySelector('.products').innerHTML = productList;
};

renderProducts(products);
