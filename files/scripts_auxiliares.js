import ProductManager from "./classes/ProductManager.js";

// Agrego dos funciones, una para agregar 10 productos al json y otra para ver si el limit al 
// obtener productos funciona correctamente

async function agregar_10_productos_al_json() {
    let productManager = new ProductManager("./files/products.json")

    await productManager.addProduct({title: "Manzana", description: "Soy una Manzana", price: 10, thumbnail: "manza_img", code: 5, stock: 10});

    await productManager.addProduct({title: "Banana", description: "Soy una Banana", price: 4, thumbnail: "banana_img", code: 9, stock: 12});

    await productManager.addProduct({title: "Pera", description: "Soy una Pera", price: 4, thumbnail: "pera_img", code: 12, stock: 11});

    await productManager.addProduct({title: "Mandarina", description: "Soy una Mandarina", price: 5, thumbnail: "mandarina_img", code: 8, stock: 3});

    await productManager.addProduct({title: "Pepino", description: "Soy un pepino", price: 21, thumbnail: "pepino_img", code: 51, stock: 2});

    await productManager.addProduct({title: "Naranja", description: "Soy una naranja", price: 17, thumbnail: "naranja_img", code: 3, stock: 2});

    await productManager.addProduct({title: "Ciruela", description: "Soy una ciruela", price: 17, thumbnail: "ciruela_img", code: 6, stock: 3});

    await productManager.addProduct({title: "Tomate", description: "Soy un tomate", price: 87, thumbnail: "tomate_img", code: 1, stock: 15});

    await productManager.addProduct({title: "Lechuga", description: "Soy una lechuga", price: 24, thumbnail: "lechuga_img", code: 34, stock: 5});

    await productManager.addProduct({title: "Zapallo", description: "Soy un zapallo", price: 38, thumbnail: "zapallo_img", code: 39, stock: 2});
}

async function imprimir_productos(limit = null) {
    let productManager = new ProductManager("./files/products.json")

    console.log(await productManager.getProducts(limit))
}

//agregar_10_productos_al_json()

//imprimir_productos(3)