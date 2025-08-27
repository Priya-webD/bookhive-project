import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Crown, Star, Gift, Coins, Zap, Target, Users } from "lucide-react";

const Rewards = () => {
  const userPoints = 1240;
  const nextLevelPoints = 1500;
  const progressToNext = (userPoints / nextLevelPoints) * 100;

  const badges = [
    { 
      name: "First Exchange", 
      description: "Complete your first book exchange", 
      icon: Star, 
      earned: true, 
      rarity: "Common" 
    },
    { 
      name: "Eco Warrior", 
      description: "Save 10kg of CO2", 
      icon: Target, 
      earned: true, 
      rarity: "Rare" 
    },
    { 
      name: "Community Helper", 
      description: "Help 5 fellow readers", 
      icon: Users, 
      earned: true, 
      rarity: "Epic" 
    },
    { 
      name: "Book Collector", 
      description: "Exchange 50 books", 
      icon: Crown, 
      earned: false, 
      rarity: "Legendary" 
    },
    { 
      name: "Speed Reader", 
      description: "Complete 10 exchanges in a month", 
      icon: Zap, 
      earned: false, 
      rarity: "Rare" 
    },
    { 
      name: "Green Champion", 
      description: "Save 50kg of CO2", 
      icon: Target, 
      earned: false, 
      rarity: "Epic" 
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Emma Chen", points: 2845, avatar: "EC" },
    { rank: 2, name: "Marcus Johnson", points: 2134, avatar: "MJ" },
    { rank: 3, name: "You (Sarah)", points: 1240, avatar: "SY", isUser: true },
    { rank: 4, name: "Alex Rivera", points: 987, avatar: "AR" },
    { rank: 5, name: "Jordan Smith", points: 856, avatar: "JS" },
  ];

  const rewards = [
    { name: "Free Coffee", points: 150, available: true, icon: "☕" },
    { name: "Book Store Voucher", points: 300, available: true, icon: "🎫" },
    { name: "Premium Membership", points: 500, available: true, icon: "⭐" },
    { name: "Signed Book", points: 800, available: true, icon: "📚" },
    { name: "Author Meet & Greet", points: 1200, available: false, icon: "🤝" },
    { name: "Kindle e-Reader", points: 2000, available: false, icon: "📱" },
  ];

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-muted text-muted-foreground";
      case "Rare": return "bg-primary/20 text-primary";
      case "Epic": return "bg-warning/20 text-warning";
      case "Legendary": return "bg-gradient-warm text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center space-x-3">
            <Trophy className="text-warning" size={32} />
            <span>Rewards & Achievements</span>
          </h1>
          <p className="text-muted-foreground">
            Celebrate your sustainable reading journey and unlock amazing rewards
          </p>
        </div>

        {/* Points & Level Progress */}
        <Card className="bg-gradient-warm text-accent-foreground animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <Coins size={24} />
                  <span>{userPoints.toLocaleString()} Points</span>
                </h2>
                <p className="text-accent-foreground/80">Level 3 • Green Reader</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">Next Level</p>
                <p className="font-semibold">{nextLevelPoints - userPoints} points to go</p>
              </div>
            </div>
            <Progress value={progressToNext} className="h-3" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Badges Section */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="text-warning" size={20} />
                <span>Your Badges</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-lift ${
                      badge.earned 
                        ? 'border-border bg-card hover:-translate-y-1' 
                        : 'border-dashed border-muted bg-muted/20 opacity-60'
                    }`}
                  >
                    <div className="text-center space-y-2">
                      <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                        badge.earned ? 'bg-gradient-warm' : 'bg-muted'
                      }`}>
                        <badge.icon size={20} className={badge.earned ? 'text-accent-foreground' : 'text-muted-foreground'} />
                      </div>
                      <div>
                        <h4 className={`font-medium text-sm ${
                          badge.earned ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {badge.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {badge.description}
                        </p>
                        <Badge className={`mt-2 text-xs ${getBadgeColor(badge.rarity)}`}>
                          {badge.rarity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="text-warning" size={20} />
                <span>Community Leaderboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center space-x-4 p-3 rounded-lg transition-all ${
                      user.isUser 
                        ? 'bg-gradient-eco/20 border border-success/30 shadow-brand' 
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      user.rank === 1 
                        ? 'bg-gradient-warm text-accent-foreground' 
                        : user.rank === 2 
                        ? 'bg-muted text-muted-foreground' 
                        : user.rank === 3 
                        ? 'bg-warning/20 text-warning' 
                        : 'bg-background text-foreground'
                    }`}>
                      {user.rank}
                    </div>
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${user.isUser ? 'text-success' : ''}`}>
                        {user.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{user.points.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Redeemable Rewards */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="text-primary" size={20} />
              <span>Redeem Your Points</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg transition-all ${
                    reward.available 
                      ? 'border-border hover:shadow-lift hover:-translate-y-1 cursor-pointer' 
                      : 'border-dashed border-muted opacity-60'
                  }`}
                >
                  <div className="text-center space-y-3">
                    <div className="text-3xl">{reward.icon}</div>
                    <div>
                      <h4 className="font-semibold">{reward.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center justify-center space-x-1 mt-1">
                        <Coins size={12} />
                        <span>{reward.points} points</span>
                      </p>
                    </div>
                    <Button 
                      variant={reward.available ? "hero" : "outline"} 
                      size="sm" 
                      disabled={!reward.available || userPoints < reward.points}
                      className="w-full"
                    >
                      {reward.available && userPoints >= reward.points 
                        ? "Redeem" 
                        : reward.available 
                        ? `Need ${reward.points - userPoints} more` 
                        : "Coming Soon"
                      }
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenges */}
        <Card className="bg-gradient-eco text-success-foreground animate-fade-in">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold flex items-center justify-center space-x-2">
                <Target size={28} />
                <span>Weekly Challenge</span>
              </h3>
              <p className="text-success-foreground/90">
                Exchange 3 books this week and earn 200 bonus points!
              </p>
              <div className="flex justify-center space-x-8 mt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">1</div>
                  <div className="text-sm opacity-90">Exchanged</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-sm opacity-90">Target</div>
                </div>
              </div>
              <Progress value={33} className="h-3 max-w-xs mx-auto" />
              <p className="text-sm opacity-80">2 more exchanges to complete the challenge!</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Rewards;