"use client";

import { format } from 'date-fns';
import { useHabits } from '@/lib/use-habits';
import { HabitForm } from '@/components/habit-form';
import { HabitList } from '@/components/habit-list';
import { Statistics } from '@/components/statistics';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { habits, loading, addHabit, deleteHabit, toggleHabitCompletion, getStats } = useHabits();
  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Habit Tracker</h1>
          <p className="text-muted-foreground">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
            <Statistics stats={stats} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Today's Habits</h2>
            <div className="space-y-4">
              <HabitForm onSubmit={addHabit} />
              <HabitList
                habits={habits}
                onToggle={toggleHabitCompletion}
                onDelete={deleteHabit}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}