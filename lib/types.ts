export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  completions: Record<string, boolean>;
  color?: string;
}

export interface HabitStats {
  totalHabits: number;
  completedToday: number;
  currentStreak: number;
  bestStreak: number;
  completionRate: number;
}