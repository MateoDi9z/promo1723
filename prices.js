let container = document.getElementsByClassName("container")[0]

class Product {
    constructor(name, prices) {
        this.name = name
        this.prices=[]
        prices.forEach((v, i) => this.prices[i+1] = v)
    }

    pricesBoxHTML(){
        let ps = ``
        for (let i = 0; i < this.prices.length; i++) {
            if (i != 0) ps += `<div id="price-${i}">x${i} $${this.prices[i]}</div>`
        }
        return ps
    }

    getHTML() {
        return `<div class="box"><h1>${this.name}</h1><div class="price">${
            this.pricesBoxHTML()
        }</div></div>`
    }
}

const products = [
    new Product("Facturas", [80, 150]),
    new Product("Tortafritas", [80, 150]),
    new Product("Churros", [80, 150]),
    new Product("Alfajores", [50]),
    new Product("Barrita", [85]),
]

let response = ``
products.forEach(e => response += e.getHTML())
container.innerHTML = response