// Fallback implementation to avoid NPM installation errors
export function cn(...inputs: any[]) {
  return inputs
    .flat(Infinity)
    .filter((value) => value !== null && value !== undefined && value !== false && value !== "")
    .join(" ");
}
