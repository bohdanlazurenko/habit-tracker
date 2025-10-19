"use client";

import { useState, useEffect } from 'react';
import { Habit, HabitStats } from './types';
import { format, isToday, startOfDay, subDays } from 'date-fns';

const STORAGE_KEY = 'habit-tracker-data';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHabits(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load habits:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
      } catch (error) {
        console.error('Failed to save habits:', error);
      }
    }
  }, [habits, loading]);

  const addHabit = (name: string, color?: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      completions: {},
      color,
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const toggleHabitCompletion = (id: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        return {
          ...habit,
          completions: {
            ...habit.completions,
            [date]: !habit.completions[date],
          },
        };
      }
      return habit;
    }));
  };

  const getStats = (): HabitStats => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const completedToday = habits.filter(h => h.completions[today]).length;
    
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;
    
    for (let i = 0; i < 365; i++) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const completedOnDate = habits.filter(h => h.completions[date]).length;
      
      if (i === 0 && completedOnDate > 0) {
        currentStreak = 1;
        tempStreak = 1;
      } else if (i > 0 && completedOnDate > 0 && tempStreak > 0) {
        tempStreak++;
        if (i === 1) currentStreak = tempStreak;
      } else if (completedOnDate === 0) {
        if (i === 0) currentStreak = 0;
        tempStreak = 0;
      }
      
      bestStreak = Math.max(bestStreak, tempStreak);
    }
    
    const totalDays = Math.max(1, Math.floor((Date.now() - new Date(habits[0]?.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24)));
    const completionRate = habits.length > 0 
      ? habits.reduce((acc, habit) => {
          const completedDays = Object.values(habit.completions).filter(Boolean).length;
          return acc + (completedDays / totalDays);
        }, 0) / habits.length * 100
      : 0;
    
    return {
      totalHabits: habits.length,
      completedToday,
      currentStreak,
      bestStreak,
      completionRate: Math.round(completionRate),
    };
  };

  return {
    habits,
    loading,
    addHabit,
    deleteHabit,
    toggleHabitCompletion,
    getStats,
  };
}