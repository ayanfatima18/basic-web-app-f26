export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Ayan";
  }

  if (query.toLowerCase().includes("age")) {
    return "67";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "ayanf";
  }
/* -------- */


  // Addition questions
  const additionMatch = query.match(
    /what is\s+(-?\d+)\s+plus\s+(-?\d+)\s*\??\s*$/i
  );

  if (additionMatch) {
    const num1 = Number(additionMatch[1]);
    const num2 = Number(additionMatch[2]);
    return String(num1 + num2);
  }

  // Largest number questions
  const largestMatch = query.match(
    /which of the following numbers is the largest:\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*\??\s*$/i
  );

  if (largestMatch) {
    const numbers = largestMatch.slice(1).map(Number);
    return String(Math.max(...numbers));
  }

  return "";
  
  // Addition: supports 2, 3, or more numbers
  const additionMatch = query.trim().match(
    /^what is\s+(-?\d+(?:\s+plus\s+-?\d+)+)\s*\??$/i
  );

  if (additionMatch) {
    const numbers = additionMatch[1]
      .split(/\s+plus\s+/i)
      .map(Number);

    return String(numbers.reduce((sum, n) => sum + n, 0));
  }

  // Prime number questions
  const primeMatch = query.trim().match(
    /^which of the following numbers are primes:\s*([-\d,\s]+)\??$/i
  );

  if (primeMatch) {
    const numbers = primeMatch[1]
      .split(",")
      .map(n => Number(n.trim()));

    const isPrime = (n: number): boolean => {
      if (!Number.isInteger(n) || n < 2) return false;

      for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
      }

      return true;
    };

    return numbers.filter(isPrime).join(", ");
  }

}

