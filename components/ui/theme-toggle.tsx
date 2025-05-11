'use client';

import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className={cn(
        'flex w-16 h-8 p-1 rounded-xl border shadow-sm cursor-pointer transition-all duration-300',
        isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200',
        className,
      )}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            'flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300',
            isDark
              ? 'transform translate-x-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white shadow-md'
              : 'transform translate-x-8 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white shadow-md',
          )}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-white" strokeWidth={1.5} />
          ) : (
            <Sun className="w-4 h-4 text-white" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            'flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300',
            isDark ? 'bg-transparent' : 'transform -translate-x-8',
          )}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
          ) : (
            <Moon className="w-4 h-4 text-black" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  );
}
