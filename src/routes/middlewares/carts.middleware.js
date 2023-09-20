export const verifyCartAccess = (req, res, next) => {
        if (req.user.cart === req.params.cid)  {
        next() // Todo bien (el carrito al que se agrega el producto, es el del usuario)
        }
        else {
        res.send({status: "failure", details: "You can only add products to your cart"})
        }
    }