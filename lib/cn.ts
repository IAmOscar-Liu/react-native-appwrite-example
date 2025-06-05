import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names or conditional class names and resolves Tailwind CSS conflicts
 * @param inputs - Class names to merge (strings, objects, or arrays)
 * @returns Merged class string with resolved Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
