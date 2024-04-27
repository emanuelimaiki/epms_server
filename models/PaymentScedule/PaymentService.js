const Payment = require('./Payment');

class PaymentService {
  async createPayment(paymentData) {
    try {
      const newPayment = new Payment(paymentData);
      const savedPayment = await newPayment.save();
      return savedPayment;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getPaymentById(paymentId) {
    try {
      const payment = await Payment.findById(paymentId);
      return payment;
    } catch (error) {
      throw error;
    }
  }
  async getPayments() {
    try {
      const payment = await Payment.find();
      return payment;
    } catch (error) {
      throw error;
    }
  }

  async updatePayment(paymentId, updatedPaymentData) {
    try {
      const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updatedPaymentData, {new: true});
      return updatedPayment;
    } catch (error) {
      throw error;
    }
  }

  async deletePayment(paymentId) {
    try {
      const deletedPayment = await Payment.findByIdAndDelete(paymentId);
      return deletedPayment;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PaymentService;
