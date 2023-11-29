export const verifyCartAccess = (req, res, next) => {
        if (req.user.cart === req.params.cid)  {
        next() /* Todo bien (el carrito es el del usuario) */
        }
        else {
        res.status(403).send({status: "failure", details: "You can only use your cart"})
        }
    }