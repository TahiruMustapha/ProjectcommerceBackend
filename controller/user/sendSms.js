const twilio = require("twilio");

// Twilio Credentials (Replace with your actual credentials)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio number
const client = new twilio(accountSid, authToken);

const sendSMS = async (req, res) => {
    const { phone, name, cartItems, totalAmount } = req.body;

    // Format the phone number to E.164 format
    const formatPhoneNumber = (phone) => {
        if (!phone.startsWith("+")) {
            return "+233" + phone.slice(1);  // Assuming Ghana numbers
        }
        return phone;
    };

    const formattedPhone = formatPhoneNumber(phone);

    // Format the Order Summary for SMS
    const itemsList = cartItems
        .map((item) => `${item.productId.productName} (x${item.quantity}) - ${item.quantity * item.productId.sellingPrice} GHS`)
        .join("\n");

    const messageBody = `
Thank you for your purchase, ${name}!
Order Summary:
${itemsList}
Total Amount: ${totalAmount} GHS
`;

    try {
        // Send SMS using Twilio
        await client.messages.create({
            body: messageBody,
            from: twilioPhoneNumber, // Your Twilio number
            to: formattedPhone, // Corrected phone number variable
        });

        res.status(200).json({ message: "Receipt sent via SMS successfully" });
    } catch (error) {
        console.error("Error sending SMS:", error);
        res.status(500).json({ message: "Failed to send receipt SMS" });
    }
};

module.exports = sendSMS;
