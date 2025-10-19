"use client";

import { HabitStats } from '@/lib/types';
import { Target, TrendingUp, Award, CheckCircle } from 'lucide-react';

interface StatisticsProps {
  stats: HabitStats;
}

export function Statistics({ stats }: StatisticsProps) {
  const statCards = [
    {
      title: 'Total Habits',
      value: stats.totalHabits,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Completed Today',
      value: `${stats.completedToday}/${stats.totalHabits}`,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Current Streak',
      value: `${stats.currentStreak} days`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Best Streak',
      value: `${stats.bestStreak} days`,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="rounded-lg border bg-card p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
          </div>
        );
      })}
      
      <div className="col-span-2 md:col-span-4 rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Completion Rate</h3>
          <span className="text-2xl font-bold">{stats.completionRate}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(stats.completionRate, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}