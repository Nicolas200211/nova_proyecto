import { clsx, type ClassValue } from "clsx";

/**
 * A utility function that combines multiple class names using clsx.
 * @param {...ClassValue[]} inputs - Class names or class name objects to be combined
 * @returns {string} Combined class names as a string
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
