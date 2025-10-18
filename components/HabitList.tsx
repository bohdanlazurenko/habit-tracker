import { Habit } from '@/lib/types'
import { HabitItem } from './HabitItem'

interface HabitListProps {
  habits: Habit[]
  onToggleHabit: (id: string) => void
  onDeleteHabit: (id: string) => void
  calculateStreak: (dates: string[]) => number
}

export function HabitList({ habits, onToggleHabit, onDeleteHabit, calculateStreak }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No habits yet. Start by adding one above!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Habits</h2>
      {habits.map(habit => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={() => onToggleHabit(habit.id)}
          onDelete={() => onDeleteHabit(habit.id)}
          streak={calculateStreak(habit.completedDates)}
        />
      ))}
    </div>
  )
}