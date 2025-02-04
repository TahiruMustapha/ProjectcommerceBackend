const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId;

        // Check if the product already exists in the cart for the current user
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

        if (isProductAvailable) {
            // If the product exists, increment the quantity
            isProductAvailable.quantity += 1;
            await isProductAvailable.save();

            return res.json({
                data: isProductAvailable,
                message: "Product quantity updated in Cart",
                success: true,
                error: false,
            });
        } else {
            // If the product does not exist, add it to the cart
            const payload = {
                productId: productId,
                quantity: 1,
                userId: currentUser,
            };

            const newAddToCart = new addToCartModel(payload);
            const saveProduct = await newAddToCart.save();

            return res.json({
                data: saveProduct,
                message: "Product Added in Cart",
                success: true,
                error: false,
            });
        }
    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartController;