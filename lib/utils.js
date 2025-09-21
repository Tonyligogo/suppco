import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(" ")
    .map(part => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Generate a random color for avatar background
export const getRandomColor = () => {
  const colors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))", 
    "hsl(120, 60%, 50%)", // Green
    "hsl(30, 90%, 60%)", // Orange
    "hsl(340, 75%, 65%)", // Pink
    "hsl(195, 85%, 55%)", // Cyan
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
