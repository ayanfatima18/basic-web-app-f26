
const SCRABBLE_POINTS: Record<string, number> = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4,
  i: 1, j: 8, k: 5, l: 1, m: 3, n: 1, o: 1, p: 3,
  q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8,
  y: 4, z: 10,
};

// Check whether a number is prime
function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false;

  for (let divisor = 2; divisor * divisor <= n; divisor++) {
    if (n % divisor === 0) return false;
  }

  return true;
}

// Check whether two words are anagrams
function isAnagram(a: string, b: string): boolean {
  const normalize = (s: string) =>
    s.toLowerCase()
      .replace(/[^a-z]/g, "")
      .split("")
      .sort()
      .join("");

  return normalize(a) === normalize(b);
}

// Calculate large powers exactly
function exactPower(base: bigint, exponent: number): bigint {
  let result = BigInt(1);

  for (let i = 0; i < exponent; i++) {
    result *= base;
  }

  return result;
}

export default function QueryProcessor(query: string): string {
  const cleaned = (query ?? "")
    .trim()
    .replace(/\?\s*$/, "")
    .trim();

  const lower = cleaned.toLowerCase();

  // 1. Shakespeare
  if (lower.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  // 2. Name
  if (/^what is your name$/i.test(cleaned)) {
    return "Ayan";
  }

  // 3. Age
  if (/^what is your age$/i.test(cleaned)) {
    return "67";
  }

  // 4. Andrew ID
  if (/^what is your andrew id$/i.test(cleaned)) {
    return "ayanf";
  }

  // 5. Anagram questions
  const anagram = cleaned.match(
    /^which of the following is an anagram of\s+([a-z]+)\s*:\s*(.+)$/i
  );

  if (anagram) {
    const target = anagram[1];
    const options = anagram[2]
      .split(",")
      .map(s => s.trim());

    return options.find(
      option => isAnagram(target, option)
    ) ?? "";
  }

  // 6. Scrabble score
  const scrabble = cleaned.match(
    /^what is the scrabble score of\s+([a-z]+)$/i
  );

  if (scrabble) {
    const score = scrabble[1]
      .toLowerCase()
      .split("")
      .reduce(
        (total, letter) => total + SCRABBLE_POINTS[letter],
        0
      );

    return String(score);
  }

  // 7. Prime number questions
  const primeQuestion = cleaned.match(
    /^which of the following numbers are primes:\s*(-?\d+(?:\s*,\s*-?\d+)*)$/i
  );

  if (primeQuestion) {
    return primeQuestion[1]
      .split(",")
      .map(s => Number(s.trim()))
      .filter(isPrime)
      .join(", ");
  }

  // 8. Largest number questions
  const largest = cleaned.match(
    /^which of the following numbers is the largest:\s*(-?\d+(?:\s*,\s*-?\d+)*)$/i
  );

  if (largest) {
    const numbers = largest[1]
      .split(",")
      .map(s => Number(s.trim()));

    return String(Math.max(...numbers));
  }

  // 9. Exponentiation
  const power = cleaned.match(
    /^what is\s+(-?\d+)\s+to the power of\s+(\d+)$/i
  );

  if (power) {
    const exponent = Number(power[2]);

    if (
      !Number.isSafeInteger(exponent) ||
      exponent > 1000
    ) {
      return "";
    }

    return exactPower(
      BigInt(power[1]),
      exponent
    ).toString();
  }

  // 10. A multiplied by B plus C
  const multipliedThenPlus = cleaned.match(
    /^what is\s+(-?\d+)\s+multiplied by\s+(-?\d+)\s+plus\s+(-?\d+)$/i
  );

  if (multipliedThenPlus) {
    return (
      BigInt(multipliedThenPlus[1]) *
      BigInt(multipliedThenPlus[2]) +
      BigInt(multipliedThenPlus[3])
    ).toString();
  }

  // 11. A plus B multiplied by C
  const plusThenMultiplied = cleaned.match(
    /^what is\s+(-?\d+)\s+plus\s+(-?\d+)\s+multiplied by\s+(-?\d+)$/i
  );

  if (plusThenMultiplied) {
    return (
      BigInt(plusThenMultiplied[1]) +
      BigInt(plusThenMultiplied[2]) *
      BigInt(plusThenMultiplied[3])
    ).toString();
  }

  // 12. Subtraction
  const subtraction = cleaned.match(
    /^what is\s+(-?\d+)\s+minus\s+(-?\d+)$/i
  );

  if (subtraction) {
    return (
      BigInt(subtraction[1]) -
      BigInt(subtraction[2])
    ).toString();
  }

  // 13. Addition of two or more numbers
  const addition = cleaned.match(
    /^what is\s+(-?\d+(?:\s+plus\s+-?\d+)+)$/i
  );

  if (addition) {
    const total = addition[1]
      .split(/\s+plus\s+/i)
      .reduce(
        (sum, n) => sum + BigInt(n),
        BigInt(0)
      );

    return total.toString();
  }

  // Unknown question
  return "";
}
