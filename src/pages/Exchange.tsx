import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  MessageCircle, 
  Navigation as DirectionsIcon, 
  QrCode, 
  Clock, 
  CheckCircle, 
  MapPin,
  BookOpen,
  History,
  Search,
  Camera
} from "lucide-react";

const Exchange = () => {
  const [showQRScanner, setShowQRScanner] = useState(false);
  
  const exchangeData = {
    id: "EX-2024-001",
    book: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
    },
    partner: {
      name: "Sarah Miller",
      avatar: "SM",
      rating: 4.8
    },
    meetup: {
      location: "Central Park - Main Entrance",
      date: "Today",
      time: "3:00 PM"
    },
    status: {
      requested: { completed: true, time: "2 hours ago" },
      accepted: { completed: true, time: "1 hour ago" },
      meeting: { completed: false, time: "In 45 minutes" },
      exchange: { completed: false, time: "Pending" }
    }
  };

  const getStatusProgress = () => {
    const statuses = Object.values(exchangeData.status);
    const completedCount = statuses.filter(s => s.completed).length;
    return (completedCount / statuses.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-4 space-y-6 max-w-2xl">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold">Active Exchange</h1>
          <p className="text-muted-foreground">Track your book exchange progress</p>
        </div>

        {/* Active Exchange Card */}
        <Card className="shadow-brand animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <span>Exchange in Progress</span>
                <Badge className="bg-warning/20 text-warning animate-pulse-eco">Active</Badge>
              </CardTitle>
              <span className="text-sm text-muted-foreground">#{exchangeData.id}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Book and Partner Info */}
            <div className="flex items-center space-x-4">
              <img
                src={exchangeData.book.cover}
                alt={exchangeData.book.title}
                className="w-20 h-28 object-cover rounded-md shadow-sm"
              />
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold">{exchangeData.book.title}</h3>
                <p className="text-muted-foreground">by {exchangeData.book.author}</p>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                      {exchangeData.partner.avatar}
                    </div>
                    <span className="text-sm font-medium">with {exchangeData.partner.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${
                          i < Math.floor(exchangeData.partner.rating) 
                            ? 'text-warning' 
                            : 'text-muted-foreground'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-muted-foreground">({exchangeData.partner.rating})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Exchange Progress</span>
                <span>{Math.round(getStatusProgress())}% Complete</span>
              </div>
              <Progress value={getStatusProgress()} className="h-3" />
            </div>

            {/* Timeline/Status */}
            <div className="space-y-4">
              <h4 className="font-medium">Timeline</h4>
              <div className="space-y-3">
                {Object.entries(exchangeData.status).map(([key, status], index) => (
                  <div key={key} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      status.completed 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {status.completed ? (
                        <CheckCircle size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium capitalize ${
                        status.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {key === 'requested' ? 'Exchange Requested' :
                         key === 'accepted' ? 'Request Accepted' :
                         key === 'meeting' ? `Meet at ${exchangeData.meetup.location}` :
                         'Exchange Complete'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {status.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meeting Details */}
            <div className="bg-gradient-warm/20 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2 text-accent-foreground">
                <MapPin size={16} />
                <span className="font-medium">Meeting Point</span>
              </div>
              <p className="text-sm">{exchangeData.meetup.location}</p>
              <p className="text-sm text-muted-foreground">
                {exchangeData.meetup.date} at {exchangeData.meetup.time}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <MessageCircle size={16} />
                <span>Chat</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <DirectionsIcon size={16} />
                <span>Directions</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Section */}
        <Card className="bg-gradient-eco text-success-foreground animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <QrCode size={20} />
              <span>Exchange QR Code</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="space-y-2">
              <h3 className="font-semibold">Show this QR code to complete the exchange</h3>
              <p className="text-success-foreground/80 text-sm">
                The other person will scan this to confirm receipt
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg inline-block">
              <div className="w-48 h-48 bg-black/10 rounded-lg flex items-center justify-center">
                <QrCode size={64} className="text-muted-foreground" />
                <div className="absolute text-xs text-muted-foreground mt-20">
                  {exchangeData.id}
                </div>
              </div>
            </div>
            
            <Button 
              variant="secondary" 
              className="bg-white text-success hover:bg-white/90"
              onClick={() => setShowQRScanner(!showQRScanner)}
            >
              <Camera size={16} className="mr-2" />
              Scan Partner's QR Code
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 animate-fade-in">
          <h3 className="font-semibold">Quick Actions</h3>
          
          <div className="grid gap-3">
            <Link to="/add-book">
              <Button variant="outline" className="w-full h-12 justify-start">
                <BookOpen size={18} className="mr-3" />
                List a New Book
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button variant="outline" className="w-full h-12 justify-start">
                <Search size={18} className="mr-3" />
                Browse Available Books
              </Button>
            </Link>
            
            <Link to="/profile">
              <Button variant="outline" className="w-full h-12 justify-start">
                <History size={18} className="mr-3" />
                View Exchange History
              </Button>
            </Link>
          </div>
        </div>

        {/* Messages Preview */}
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Recent Messages</h4>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                  SM
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{exchangeData.partner.name}</p>
                  <p className="text-xs text-muted-foreground">
                    "Hi! I'm excited about this exchange. See you at 3 PM! 📚"
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Exchange;