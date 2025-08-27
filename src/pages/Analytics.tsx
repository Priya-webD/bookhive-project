import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Leaf, DollarSign, BookOpen, Award, Target } from "lucide-react";

const Analytics = () => {
  const monthlyData = [
    { month: "Jan", books: 2, co2: 1.2, savings: 45 },
    { month: "Feb", books: 4, co2: 2.8, savings: 89 },
    { month: "Mar", books: 3, co2: 2.1, savings: 67 },
    { month: "Apr", books: 6, co2: 4.2, savings: 134 },
    { month: "May", books: 5, co2: 3.5, savings: 112 },
    { month: "Jun", books: 3, co2: 2.1, savings: 67 },
  ];

  const impactStats = [
    { 
      label: "Books Exchanged", 
      value: 23, 
      growth: "+18%", 
      icon: BookOpen, 
      color: "text-primary",
      target: 30,
      progress: 76
    },
    { 
      label: "CO2 Saved", 
      value: "15.2 kg", 
      growth: "+24%", 
      icon: Leaf, 
      color: "text-success",
      target: "20 kg",
      progress: 76
    },
    { 
      label: "Money Saved", 
      value: "$346", 
      growth: "+15%", 
      icon: DollarSign, 
      color: "text-warning",
      target: "$500",
      progress: 69
    },
  ];

  const achievements = [
    { title: "Eco Warrior", description: "Saved 10kg CO2", earned: true },
    { title: "Book Lover", description: "Exchanged 20 books", earned: true },
    { title: "Community Builder", description: "Helped 10 readers", earned: false },
    { title: "Green Champion", description: "Save 25kg CO2", earned: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center space-x-3">
            <BarChart className="text-primary" />
            <span>Your Impact Analytics</span>
          </h1>
          <p className="text-muted-foreground">
            Track your positive environmental and community impact
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {impactStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lift transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={stat.color} size={20} />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-sm text-success flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    {stat.growth}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress to goal: {stat.target}</span>
                    <span>{stat.progress}%</span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Progress Chart */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="text-primary" size={20} />
              <span>Monthly Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="books" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  name="Books Exchanged"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Environmental Impact */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="text-success" size={20} />
                <span>Environmental Impact</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar 
                    dataKey="co2" 
                    fill="hsl(var(--success))" 
                    name="CO2 Saved (kg)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4 p-4 bg-success/10 rounded-lg">
                <p className="text-sm text-success-foreground">
                  <strong>Did you know?</strong> You've saved the equivalent of planting 2 trees! 
                  Keep up the amazing work! 🌱
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="text-warning" size={20} />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    achievement.earned 
                      ? 'bg-gradient-warm/20 border border-warning/30' 
                      : 'bg-muted/50'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    achievement.earned ? 'bg-warning text-warning-foreground' : 'bg-muted'
                  }`}>
                    <Award size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Target className="text-warning animate-bounce-gentle" size={16} />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Goals Section */}
        <Card className="bg-gradient-eco text-success-foreground animate-fade-in">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Keep Growing Your Impact!</h3>
              <p className="text-success-foreground/90">
                You're making a real difference in building a sustainable reading community.
                Set new goals and continue your journey!
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">23</div>
                  <div className="text-sm opacity-90">Books Exchanged</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">15.2</div>
                  <div className="text-sm opacity-90">KG CO2 Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">$346</div>
                  <div className="text-sm opacity-90">Money Saved</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;