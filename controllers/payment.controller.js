class PaymentController {
    constructor(subscriptionService) {
      this.subscriptionService = subscriptionService;
    }
  
    async getPaymentLink(req, res) {
      try {
        const payment = await this.subscriptionService.createPayment();
  
        return res.json(payment);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create payment", err:error });
      }
    }
  
    async getSubscriptionLink(req, res) {
      try {
        const subscription = await this.subscriptionService.createSubscription();
  
        return res.json(subscription);
      } catch (error) {
        console.log(error);
  
        return res
          .status(500)
          .json({ error: true, msg: "Failed to create subscription" });
      }
    }

    async checkSubs(req, res){
      try{
        return res.json({msg: 'El servicio funcinona correctamente'})
      }catch{

      }
    }
  }
  

  module.exports = PaymentController;