export const initializeCashfree = ({ orderAmount, orderId, customerName, customerEmail, customerPhone, onSuccess }) => {
    if (!window.Cashfree) {
      console.error("Cashfree SDK not loaded.");
      return;
    }
  
    const cashfree = window.Cashfree;
    cashfree.payments({
      orderId: orderId,
      orderAmount: orderAmount,
      customerName: customerName,
      customerPhone: customerPhone,
      customerEmail: customerEmail,
      notifyUrl: "https://your-backend.com/cashfree-webhook",
      paymentModes: ["cc", "dc", "upi", "netbanking", "wallet"],
      callbackMode: "post",
      returnUrl: "https://your-frontend.com/booking-success",
      onSuccess: (data) => {
        console.log("Payment Successful", data);
        onSuccess();
      },
      onFailure: (error) => {
        console.error("Payment Failed", error);
      },
    });
  };
  