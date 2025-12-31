import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This function merges tailwind classes intelligently
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}