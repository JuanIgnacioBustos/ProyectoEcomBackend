import ViewService from "../services/views.service.js";

let viewService = new ViewService()

const home = async (req, res) => {
    let products = await viewService.getProducts();

    res.render('home', {
        title: "Inicio",
        products: products.docs
    });
}

const realTimeProducts = async (req, res) => {
    res.render('realTimeProducts');
}

const chat = async (req, res) => {
    res.render('chat')
}

const products = async (req, res) => {
    let user = req.user

    if (!user) {
        return res.redirect('/login')
    }

    let limit = req.query.limit
    let page = req.query.page
    let sort = req.query.sort

    let products = await viewService.getProducts(limit, page, sort); 

    products.prevLink = products.hasPrevPage ? `http://localhost:8080/products?page=${products.prevPage}&limit=${limit}&sort=${sort}` : '';
    products.nextLink = products.hasNextPage ? `http://localhost:8080/products?page=${products.nextPage}&limit=${limit}&sort=${sort}` : '';

    res.render('products', {
        title: "Products",
        products: products,
        user: user
    })
}

const cart = async (req, res) => {
    try {
        let cartId = req.params.cid

        let cartProducts = await viewService.getAllProductsFromCart(cartId)
    
        res.render('cart', {
        title: "Cart",
        cartProducts: cartProducts,
        cartId: cartId
        })
    }
    catch (err) {
        return res.status(404).send({status: "error", error: err.message});
    }
}

const login = async (req, res) => {
    res.render('login')
}

const register = async (req, res) => {
    res.render('register')
}

const resetPassword = async (req, res) => {
    res.render('resetPassword');
}

const requestResetPassword = async (req, res) => {
    res.render('requestResetPassword')
}

const user = async (req, res, next) => {
    try {
        let userId = req.params.uid

        let user = await viewService.getUserById(userId)
    
        res.render('user', {
        title: "User",
        user: user,
        userId: userId
        })
    }
    catch (err) {
        return res.status(404).send({status: "error", error: err.message});
    }
}

export default {
    home,
    realTimeProducts,
    chat,
    products,
    cart,
    login,
    register,
    resetPassword,
    requestResetPassword,
    user
}