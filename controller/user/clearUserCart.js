const addToCartModel = require("../../models/cartProduct");

const clearUserCart = async (req, res) => {
    try {
        const currentUserId = req.userId; // Get user ID from auth middleware

        const deleteResult = await addToCartModel.deleteMany({ userId: currentUserId });

        res.json({
            message: "All products deleted from cart",
            error: false,
            success: true,
            data: deleteResult
        });

    } catch (err) {
        res.status(500).json({
            message: err?.message || "An error occurred",
            error: true,
            success: false
        });
    }
};

module.exports = clearUserCart;
