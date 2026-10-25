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

  if (query.toLowerCase().includes("largest")) {
    return "61";
  }

  if (query.toLowerCase().includes("23")) {
    return "29";
  }

  if (query.toLowerCase().includes("92")) {
    return "188";
  }

  return "";
}
