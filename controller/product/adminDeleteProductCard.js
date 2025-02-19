const productModel = require("../../models/productModel");

const adminDeleteProductCard = async (req, res) => {
    try {

        // Get productId from req.params or req.query
        const productId = req.query.productId; 

        
        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false
            });
        }

        
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        
        if (!deletedProduct) {
            return res.status(404).json({
                message: "No product found!",
                error: true,
                success: false
            });
        }

        
        res.status(200).json({
            message: "Successfully deleted product",
            success: true,
        });
    } catch (err) {
        
        res.status(500).json({
            message: err?.message || "Server error",
            error: true,
            success: false
        });
    }
};

module.exports = adminDeleteProductCard;