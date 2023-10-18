export function levenshtein(a: string, b: string): number {
        const matrix = [];
  
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
  
    return matrix[b.length][a.length];
  }


  
  
  export function findClosestCategory(label: string, categoriesArray: string[]): string | null {
    let minDistance = Infinity;
    let closestCategory = null;
  
    for (const category of categoriesArray) {
      const distance = levenshtein(label.toLowerCase(), category.toLowerCase());
      if (distance < minDistance) {
        minDistance = distance;
        closestCategory = category;
      }
    }
  
    if (minDistance <= 2) {
      return closestCategory;
    }
  
    return null;
  }
  