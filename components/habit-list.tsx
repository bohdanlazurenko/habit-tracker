"use client";

import { format } from 'date-fns';
import { Check, X, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Habit } from '@/lib/types';

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string, date: string) => void;
  onDelete: (id: string) => void;
}

export function HabitList({ habits, onToggle, onDelete }: HabitListProps) {
  const today = format(new Date(), 'yyyy-MM-dd');

  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No habits yet. Create your first habit to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => {
        const isCompleted = habit.completions[today];
        
        return (
          <div
            key={habit.id}
            className="flex items-center gap-3 p-4 rounded-lg border bg-card transition-all hover:shadow-sm"
          >
            <button
              onClick={() => onToggle(habit.id, today)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all ${
                isCompleted
                  ? 'bg-primary border-primary'
                  : 'border-muted-foreground hover:border-primary'
              }`}
            >
              {isCompleted && (
                <Check className="w-4 h-4 text-primary-foreground m-auto" />
              )}
            </button>
            
            <div className="flex-1">
              <h3 className={`font-medium ${
                isCompleted ? 'line-through text-muted-foreground' : ''
              }`}>
                {habit.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: habit.color || '#3b82f6' }}
                />
                <p className="text-xs text-muted-foreground">
                  Created {format(new Date(habit.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(habit.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}