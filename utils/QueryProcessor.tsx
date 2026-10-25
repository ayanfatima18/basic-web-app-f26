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

  
  // Multiplication with addition (BODMAS/PEMDAS)
  const mixedMatch = query.trim().match(
    /^what is\s+(-?\d+)\s+plus\s+(-?\d+)\s+multiplied by\s+(-?\d+)\s*\??$/i
  );

  if (mixedMatch) {
    const a = BigInt(mixedMatch[1]);
    const b = BigInt(mixedMatch[2]);
    const c = BigInt(mixedMatch[3]);

    return (a + b * c).toString();
  }

  // Exponentiation: exact large integer calculations
  const powerMatch = query.trim().match(
    /^what is\s+(-?\d+)\s+to the power of\s+(\d+)\s*\??$/i
  );

  if (powerMatch) {
    const base = BigInt(powerMatch[1]);
    const exponent = BigInt(powerMatch[2]);

    return (base ** exponent).toString();
  }

  return "";
}
