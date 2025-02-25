    const nodemailer = require("nodemailer");

    const sendMail = async (req, res) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const {email,name,cartItems,totalAmount} = req.body;  // ✅ Extract customer's email

        const itemsList = cartItems
            .map(
                (item) =>
                    `
    <div style="margin-bottom: 20px; padding: 10px; border-bottom: 1px solid #ddd;">
      <p style="margin: 5px 0; font-size: 14px; color: #333;">
        <strong style="color: #555;">Name:</strong> ${item.productId.productName}
      </p>
      <p style="margin: 5px 0; font-size: 14px; color: #333;">
        <strong style="color: #555;">Quantity:</strong> ${item.quantity}
      </p>
      <p style="margin: 5px 0; font-size: 14px; color: #333;">
        <strong style="color: #555;">Price:</strong> ${item.productId.sellingPrice}
      </p>
      <p style="margin: 5px 0; font-size: 14px; color: #333;">
        <strong style="color: #555;">Total:</strong> ${item.quantity * item.productId.sellingPrice}
      </p>
    </div>
  `


            )
            .join("");

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to:email,
            subject:"Your Purchase Receipt",
            html: ` 
      <h1>Thank you for your purchase, ${name}!</h1>
      <h2>Order Summary:</h2>
       <div>
        ${itemsList}   <!-- Inserts the formatted order items -->
      </div>
       <h3>Total Amount: ${totalAmount}</h3>
    `,
    };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Receipt sent successfully" });

        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ message: "Failed to send receipt email" });
        }
    };

    module.exports = sendMail;
