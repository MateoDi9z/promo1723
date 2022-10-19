let container = document.getElementsByClassName("container")[0];

class Product {
  constructor(name, prices, stock) {
    this.stock = stock;
    this.name = name;
    this.prices = [];
    prices.forEach((v, i) => (this.prices[i + 1] = v));
  }

  pricesBoxHTML() {
    let ps = ``;
    for (let i = 0; i < this.prices.length; i++) {
      if (i != 0)
        ps += `<div id="price-${i}" class="price">x${i} $${this.prices[i]}</div>`;
    }
    return ps;
  }

  getHTML() {
    return `<div class="box"><h1>${this.name}</h1><div class="price">${
      this.stock == "SOLD" ? "SOLD OUT!" : this.pricesBoxHTML()
    }</div></div>`;
  }
}

const products = [
  new Product("Facturas", [100, 150]),
  new Product("Tortafritas", [100, 150]),
  new Product("Churros", [100, 150]),
  new Product("Bola de Fraile", [100, 150]),
  new Product("Donas", [150, 250]),
  new Product("Tostado", [100, 180]),
  new Product("Jugo Naranja", [100]),
];

let response = ``;
products.forEach((e) => (response += e.getHTML()));
container.innerHTML = response;
