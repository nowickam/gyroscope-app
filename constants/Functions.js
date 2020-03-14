
export function round(n) {
    if (!n) {
      return 0;
    }
  
    return Math.floor(n * 1000) / 1000;
  }