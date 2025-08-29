import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Leaf, Coins, BookOpen, Sparkles, Heart, Zap } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import floatingElements from "@/assets/floating-elements.jpg";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10 animate-background-shift"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: '200% 200%',
            backgroundPosition: '0% 50%'
          }}
        />
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-magical rounded-full opacity-20 animate-float blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-sunset rounded-full opacity-30 animate-float blur-lg" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-ocean rounded-full opacity-15 animate-float blur-2xl" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-warm rounded-full opacity-25 animate-bounce-gentle blur-lg" style={{ animationDelay: '1s' }} />
      </div>
      
      <Navigation />
      
      <main className="container mx-auto p-4 space-y-8 relative z-10">
        {/* Welcome Section */}
        <div className="animate-fade-in relative">
          <div className="absolute -top-4 -right-4 text-4xl animate-bounce-gentle">
            <Sparkles className="text-warning animate-glow-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-success to-accent bg-clip-text text-transparent mb-4 animate-glow-pulse">
            Good morning, Sarah! 🌱
          </h1>
          <p className="text-lg text-muted-foreground mb-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Ready to discover your next great read?
          </p>
          <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center space-x-1 text-sm text-success">
              <Heart className="w-4 h-4 animate-pulse-eco fill-current" />
              <span>Making reading magical</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-warning">
              <Zap className="w-4 h-4 animate-wiggle" />
              <span>Join 10k+ readers</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl animate-fade-in group" style={{ animationDelay: '0.9s' }}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110" size={20} />
          <Input
            placeholder="Search for books, authors, or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg shadow-brand hover:shadow-glow focus:shadow-magical transition-all duration-500 border-2 hover:border-primary/50 focus:border-primary bg-card/80 backdrop-blur-sm rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-success/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          {stats.map((stat, index) => (
            <Card key={index} className="group hover:shadow-float transition-all duration-500 hover:-translate-y-3 cursor-pointer bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 hover:border-primary/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {stat.label}
                </CardTitle>
                <div className="relative">
                  <stat.icon className={`${stat.color} animate-pulse-eco group-hover:scale-125 transition-transform duration-300`} size={24} />
                  <div className="absolute inset-0 animate-glow-pulse opacity-0 group-hover:opacity-50" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <p className="text-sm text-success mt-2 flex items-center animate-fade-in">
                  <Sparkles className="w-3 h-3 mr-1 animate-wiggle" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Books Near You */}
        <section className="animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold flex items-center space-x-3 group">
              <MapPin className="text-primary animate-bounce-gentle group-hover:scale-110 transition-transform" size={28} />
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Books Near You</span>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-eco" />
            </h2>
            <Button variant="outline" className="hover:bg-gradient-warm hover:text-accent-foreground hover:border-transparent hover:shadow-glow transition-all duration-300 hover:scale-105">
              View All
            </Button>
          </div>
          
          <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
            {nearbyBooks.map((book, index) => (
              <div
                key={book.id}
                className="group flex-shrink-0 w-52 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-2xl p-5 shadow-brand hover:shadow-float transition-all duration-500 hover:-translate-y-4 cursor-pointer border-2 hover:border-primary/30 relative overflow-hidden animate-fade-in"
                style={{ animationDelay: `${1.8 + index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2 right-2 bg-primary/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-float">
                      <Heart className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold text-base mb-1 truncate group-hover:text-primary transition-colors">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 group-hover:text-foreground/80 transition-colors">{book.author}</p>
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="secondary" className="bg-success/20 text-success border-success/30 group-hover:animate-glow-pulse">
                      {book.condition}
                    </Badge>
                    <Link to="/checkout" className="group/link">
                      <span className="text-muted-foreground flex items-center hover:text-primary cursor-pointer transition-colors group-hover/link:animate-wiggle">
                        <MapPin size={14} className="mr-1" />
                        {book.distance}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Browse Categories */}
        <section className="animate-fade-in" style={{ animationDelay: '2.4s' }}>
          <h2 className="text-3xl font-semibold mb-6 flex items-center space-x-3 group">
            <Star className="text-warning animate-wiggle group-hover:scale-110 transition-transform" size={28} />
            <span className="bg-gradient-to-r from-foreground to-warning bg-clip-text text-transparent">Browse Categories</span>
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse-eco" />
          </h2>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="group relative overflow-hidden hover:bg-gradient-warm hover:text-accent-foreground hover:border-transparent hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in border-2 hover:border-warning/50"
                style={{ animationDelay: `${2.6 + index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-warning/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:animate-bounce-gentle">{category}</span>
              </Button>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '3.2s' }}>
          <Card className="group bg-gradient-eco text-success-foreground hover:shadow-float transition-all duration-500 hover:-translate-y-2 relative overflow-hidden border-2 hover:border-success/30">
            <div className="absolute inset-0 animate-background-shift opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, hsl(var(--success)), transparent 50%), radial-gradient(circle at 80% 80%, hsl(var(--primary)), transparent 50%)' }} />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <BookOpen size={40} className="group-hover:animate-wiggle transition-transform duration-300" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full animate-pulse-eco" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">List a Book</h3>
                  <p className="text-sm opacity-90">Share books you've finished reading</p>
                </div>
              </div>
              <Link to="/add-book">
                <Button variant="secondary" className="w-full group-hover:animate-glow-pulse hover:shadow-magical transition-all duration-300 text-lg py-3">
                  <Sparkles className="w-5 h-5 mr-2 animate-bounce-gentle" />
                  Add Book
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-warm text-accent-foreground hover:shadow-float transition-all duration-500 hover:-translate-y-2 relative overflow-hidden border-2 hover:border-warning/30">
            <div className="absolute inset-0 animate-background-shift opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, hsl(var(--warning)), transparent 50%), radial-gradient(circle at 20% 70%, hsl(var(--accent)), transparent 50%)' }} />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <Coins size={40} className="group-hover:animate-wiggle transition-transform duration-300" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse-eco" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Active Exchanges</h3>
                  <p className="text-sm opacity-90">Check your ongoing book exchanges</p>
                </div>
              </div>
              <Link to="/exchange">
                <Button variant="secondary" className="w-full group-hover:animate-glow-pulse hover:shadow-magical transition-all duration-300 text-lg py-3">
                  <Zap className="w-5 h-5 mr-2 animate-bounce-gentle" />
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