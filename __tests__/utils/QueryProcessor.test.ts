
describe("Extreme Startup question types", () => {
  test.each([
    ["What is your name?", "Ayan"],
    ["What is your Andrew ID?", "ayanf"],
    ["What is 33 minus 89?", "-56"],
    ["What is 6 minus 16?", "-10"],
    ["What is 96 plus 9 plus 18?", "123"],
    ["What is 9 plus 44 plus 50?", "103"],
    ["What is 68 plus 37?", "105"],
    ["What is 6 plus 24 multiplied by 46?", "1110"],
    ["What is 52 multiplied by 32 plus 87?", "1751"],
    ["What is 21 plus 52 multiplied by 72?", "3765"],
    [
      "Which of the following numbers is the largest: 84, 86, 13?",
      "86",
    ],
    [
      "Which of the following numbers are primes: 78, 90, 46, 97, 57?",
      "97",
    ],
    ["What is the scrabble score of banana?", "8"],
    ["What is the scrabble score of zoo?", "12"],
    [
      "Which of the following is an anagram of dictionary: abdication, butterfly, indicatory, incendiary?",
      "indicatory",
    ],
    [
      "Which of the following is an anagram of listen: enlists, inlets, banana, google?",
      "inlets",
    ],
  ])("answers %s", (query, expected) => {
    expect(QueryProcessor(query)).toBe(expected);
  });

  test("handles large exponentiation exactly", () => {
    expect(
      QueryProcessor("What is 77 to the power of 68?")
    ).toBe(
      (BigInt(77) ** BigInt(68)).toString()
    );
  });
});
