import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Settings, Star, MapPin, Edit, Plus, Calendar, User } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("books");

  const userStats = {
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 4.6,
    exchanges: 23,
    points: 1240,
    co2Saved: "12.8kg"
  };

  const userBooks = [
    {
      id: 1,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      condition: "Excellent",
      status: "Available",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      condition: "Good",
      status: "Reserved",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop"
    },
    {
      id: 3,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      condition: "Like New",
      status: "Available",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop"
    }
  ];

  const exchangeHistory = [
    {
      id: 1,
      title: "The Silent Patient",
      partner: "Alex Rivera",
      date: "2024-01-15",
      status: "Completed",
      type: "Exchange"
    },
    {
      id: 2,
      title: "Educated",
      partner: "Maria Chen",
      date: "2024-01-10",
      status: "Completed",
      type: "Purchase"
    }
  ];

  const reviews = [
    {
      id: 1,
      reviewer: "Alex Rivera",
      rating: 5,
      comment: "Great condition book and smooth transaction!",
      date: "2024-01-15",
      type: "received"
    },
    {
      id: 2,
      reviewer: "Maria Chen",
      rating: 4,
      comment: "Quick and easy exchange. Highly recommended!",
      date: "2024-01-10",
      type: "received"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-success/20 text-success";
      case "Reserved": return "bg-warning/20 text-warning";
      case "Sold": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-4 space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="shadow-brand animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              {/* Profile Picture */}
              <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
                SJ
              </div>
              
              {/* User Details */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-semibold">{userStats.name}</h2>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Edit size={14} />
                  </Button>
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(userStats.rating) 
                            ? 'text-warning fill-warning' 
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">({userStats.rating})</span>
                </div>
                
                {/* Location */}
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span>{userStats.location}</span>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{userStats.exchanges}</div>
                    <div className="text-xs text-muted-foreground">Exchanges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-warning">{userStats.points}</div>
                    <div className="text-xs text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">{userStats.co2Saved}</div>
                    <div className="text-xs text-muted-foreground">CO2 Saved</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Card className="animate-fade-in">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <CardHeader className="pb-0">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="books">My Books</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
              </CardHeader>

              {/* My Books Tab */}
              <TabsContent value="books" className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Listed Books ({userBooks.length})</h3>
                  <Link to="/add-book">
                    <Button variant="hero" size="sm">
                      <Plus size={16} className="mr-2" />
                      Add Book
                    </Button>
                  </Link>
                </div>
                
                <div className="grid gap-4">
                  {userBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-lift transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{book.condition}</Badge>
                          <Badge className={getStatusColor(book.status)}>{book.status}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Exchange History</h3>
                
                <div className="space-y-4">
                  {exchangeHistory.map((exchange) => (
                    <div
                      key={exchange.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium">{exchange.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {exchange.type} with {exchange.partner}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          <span>{exchange.date}</span>
                        </div>
                      </div>
                      <Badge className="bg-success/20 text-success">
                        {exchange.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Reviews Received</h3>
                
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 border rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{review.reviewer}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < review.rating 
                                  ? 'text-warning fill-warning' 
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;