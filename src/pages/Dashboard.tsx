import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Leaf, Coins, BookOpen } from "lucide-react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Books Exchanged", value: "23", icon: BookOpen, color: "text-primary" },
    { label: "CO2 Saved", value: "15.2 kg", icon: Leaf, color: "text-success" },
    { label: "Points Earned", value: "1,240", icon: Coins, color: "text-warning" },
  ];

  const nearbyBooks = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      condition: "Excellent",
      distance: "0.5 km",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      condition: "Good",
      distance: "1.2 km",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop",
    },
    {
      id: 3,
      title: "The Midnight Library",
      author: "Matt Haig",
      condition: "Like New",
      distance: "2.0 km",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
    },
  ];

  const categories = [
    "Fiction", "Non-Fiction", "Mystery", "Romance", "Sci-Fi", "Biography", "Self-Help", "History"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-4 space-y-8">
        {/* Welcome Section */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Good morning, Sarah! 🌱
          </h1>
          <p className="text-muted-foreground">
            Ready to discover your next great read?
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl animate-fade-in">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search for books, authors, or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-lg shadow-brand"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lift transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`${stat.color} animate-pulse-eco`} size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-success mt-1">+12% from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Books Near You */}
        <section className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center space-x-2">
              <MapPin className="text-primary" size={24} />
              <span>Books Near You</span>
            </h2>
            <Button variant="outline">View All</Button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {nearbyBooks.map((book) => (
              <div
                key={book.id}
                className="flex-shrink-0 w-48 bg-card rounded-lg p-4 shadow-brand hover:shadow-lift transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-sm mb-1 truncate">{book.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="secondary">{book.condition}</Badge>
                  <Link to="/checkout">
                    <span className="text-muted-foreground flex items-center hover:text-primary cursor-pointer">
                      <MapPin size={12} className="mr-1" />
                      {book.distance}
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Browse Categories */}
        <section className="animate-fade-in">
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Star className="text-warning" size={24} />
            <span>Browse Categories</span>
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="hover:bg-gradient-warm hover:text-accent-foreground hover:border-transparent"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          <Card className="bg-gradient-eco text-success-foreground hover:shadow-lift transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <BookOpen size={32} />
                <div>
                  <h3 className="font-semibold">List a Book</h3>
                  <p className="text-sm opacity-90">Share books you've finished reading</p>
                </div>
              </div>
              <Link to="/add-book">
                <Button variant="secondary" className="mt-4 w-full">
                  Add Book
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-warm text-accent-foreground hover:shadow-lift transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Coins size={32} />
                <div>
                  <h3 className="font-semibold">Active Exchanges</h3>
                  <p className="text-sm opacity-90">Check your ongoing book exchanges</p>
                </div>
              </div>
              <Link to="/exchange">
                <Button variant="secondary" className="mt-4 w-full">
                  View Exchange
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;