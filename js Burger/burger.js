'use strict';

class BurgerElement {
    constructor(element) {
        this.name = element.value;
        this.price = Number(element.dataset.price);
        this.calories = Number(element.dataset.calories);
    }
}

class Burger {
    constructor() {
        this.size = this._getBurgerElement("size");
        this.add = this._getBurgerElement("add");
        this.toppings = this._getBurgerElements("topping");
        this.price = this._sumPrice()
        this.calories = this._sumCalories()
    }
    _getBurgerElement(name) {
        const block = document.querySelector(`input[name=${name}]:checked`);
        return new BurgerElement(block);
    }
    _getBurgerElements(name) {
        let result = [];
        const blocks = document.querySelectorAll(`input[name=${name}]:checked`);
        blocks.forEach(block => {
            result.push(new BurgerElement(block));
        });
        return result;
    }

    _sumPrice() {
        let result = this.size.price + this.add.price;
        this.toppings.forEach(topping => result += topping.price);
        return result;
    }

    _sumCalories() {
        let result = this.size.calories + this.add.calories;
        this.toppings.forEach(topping => result += topping.calories);
        return result;
    }

    showSum(namePriceBlock="#burger_price", nameCaloriesBlock="#burger_calories") {
        document.querySelector(namePriceBlock).innerHTML = this.price;
        document.querySelector(nameCaloriesBlock).innerHTML = this.calories;
    }
}

window.addEventListener('load', function() {
    document.querySelector('#burger__submit').addEventListener('click', function() {
        const burger = new Burger();
        burger.showSum();
    })
})