import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const moodData = [
  { day: "Day 1", score: 12 },
  { day: "Day 3", score: 9 },
  { day: "Day 5", score: 7 },
  { day: "Day 7", score: 5 },
];

export default function UserDashboard({ userProgress, completedModules }) {
  return (
    <div className="max-w-6xl mx-auto py-8 px-6 space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-2 text-sm">
            <span>{Object.keys(completedModules).length} Rooms</span>
            <span>{Math.round(
              (Object.values(completedModules).flat().length / 28) * 100
            )}%</span>
          </div>
          <Progress value={
            (Object.values(completedModules).flat().length / 28) * 100
          } />
        </CardContent>
      </Card>

      {/* Room-wise Progress */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.keys(userProgress).map((room) => (
          <Card key={room}>
            <CardHeader>
              <CardTitle className="capitalize">{room}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={userProgress[room]} />
              <p className="mt-2 text-sm text-muted-foreground">
                {userProgress[room]}% complete
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Streaks & Achievements */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-3">
            <Flame className="text-orange-500 w-8 h-8" />
            <p className="text-lg font-semibold">5 days 🔥</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-3">
            <Trophy className="text-yellow-500 w-8 h-8" />
            <p className="text-lg font-semibold">3 earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Mood Tracking Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Mood Progress (PHQ-9)</CardTitle>
        </CardHeader>
        <CardContent style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
