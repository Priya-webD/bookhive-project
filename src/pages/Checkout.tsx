import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, MessageCircle, QrCode, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const bookDetails = {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 15.00,
    serviceFee: 1.50,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    condition: "Excellent",
    seller: "Sarah Miller"
  };

  const total = bookDetails.price + bookDetails.serviceFee;

  const handlePayment = async (method: string) => {
    setIsProcessing(true);
    
    try {
      if (method === 'stripe') {
        // TODO: Implement actual Stripe integration
        // const { data } = await supabase.functions.invoke('create-payment', {
        //   body: { amount: total * 100, currency: 'usd' }
        // });
        // window.open(data.url, '_blank');
        
        // Simulate payment for demo
        setTimeout(() => {
          setIsProcessing(false);
          setIsPaid(true);
          toast({
            title: "Payment Successful!",
            description: "Your purchase has been completed.",
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      toast({
        title: "Payment Failed",
        description: "Please try again or use a different payment method.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Checkout</h1>
        </div>
      </div>

      <main className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Transaction Summary */}
        <Card className="shadow-brand animate-fade-in">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <img
                src={bookDetails.cover}
                alt={bookDetails.title}
                className="w-20 h-28 object-cover rounded-md shadow-sm"
              />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">{bookDetails.title}</h3>
                <p className="text-sm text-muted-foreground">by {bookDetails.author}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{bookDetails.condition}</Badge>
                  <span className="text-sm text-muted-foreground">from {bookDetails.seller}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Book Price</span>
                <span>${bookDetails.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>${bookDetails.serviceFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        {!isPaid && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Button
                  variant={selectedPayment === 'stripe' ? 'hero' : 'outline'}
                  className="h-12 justify-start"
                  onClick={() => setSelectedPayment('stripe')}
                >
                  <CreditCard className="mr-3" size={20} />
                  Pay with Stripe
                </Button>
                
                <Button
                  variant={selectedPayment === 'paypal' ? 'hero' : 'outline'}
                  className="h-12 justify-start"
                  onClick={() => setSelectedPayment('paypal')}
                >
                  <div className="w-5 h-5 mr-3 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs font-bold">
                    P
                  </div>
                  Pay with PayPal
                </Button>
                
                <Button
                  variant={selectedPayment === 'card' ? 'hero' : 'outline'}
                  className="h-12 justify-start"
                  onClick={() => setSelectedPayment('card')}
                >
                  <CreditCard className="mr-3" size={20} />
                  Credit/Debit Card
                </Button>
              </div>

              {/* Credit Card Form */}
              {selectedPayment === 'card' && (
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg animate-fade-in">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button
                variant="success"
                size="lg"
                className="w-full"
                disabled={!selectedPayment || isProcessing}
                onClick={() => handlePayment(selectedPayment)}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Shield size={18} className="mr-2" />
                    Confirm and Pay ${total.toFixed(2)}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Exchange QR Code (shown after payment) */}
        {isPaid && (
          <Card className="bg-gradient-eco text-success-foreground animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle size={24} />
                <span>Payment Successful!</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Scan to Complete Exchange</h3>
                <p className="text-success-foreground/90 text-sm">
                  Show this QR code to {bookDetails.seller} to complete your transaction
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg inline-block">
                <div className="w-48 h-48 bg-black/10 rounded-lg flex items-center justify-center">
                  <QrCode size={64} className="text-muted-foreground" />
                  <div className="absolute text-xs text-muted-foreground mt-20">
                    Transaction: TX{Date.now().toString().slice(-6)}
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-success-foreground/80">
                This QR code is now active and ready to be scanned by the seller
              </p>
            </CardContent>
          </Card>
        )}

        {/* Communication Section */}
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">SM</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{bookDetails.seller}</p>
                  <p className="text-xs text-muted-foreground">
                    "Hi! I'm excited about this exchange!"
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <MessageCircle size={16} className="mr-2" />
                Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Checkout;