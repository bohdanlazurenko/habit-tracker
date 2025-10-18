# Habit Tracker

A simple and effective habit tracking application built with Next.js 14, TypeScript, and Tailwind CSS. Build consistency by tracking your daily habits and maintaining streaks.

## Features

- Add and manage daily habits
- Mark habits as complete for the day
- Track streaks for each habit
- Clean and intuitive interface
- Data persistence using localStorage
- Responsive design

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (Icons)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Add a Habit**: Use the form at the top to add a new habit you want to track
2. **Mark Complete**: Click the checkbox next to a habit to mark it as complete for today
3. **View Streaks**: Your current streak for each habit is displayed below the habit name
4. **Delete Habits**: Click the trash icon to remove a habit you no longer want to track

## Project Structure

```
habit-tracker/
├── app/
│   ├── api/
│   │   └── ping/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AddHabitForm.tsx
│   ├── HabitItem.tsx
│   └── HabitList.tsx
├── lib/
│   ├── storage.ts
│   └── types.ts
├── public/
└── ...config files
```

## Build & Deploy

To create a production build:

```bash
npm run build
npm start
```

## License

MIT License