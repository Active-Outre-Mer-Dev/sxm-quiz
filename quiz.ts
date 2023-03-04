type Questions = {
  question: string;
  answer: string;
  options: string[];
  type: string;
};

export const questions: Questions[] = [
  {
    answer: "Island",
    question: "What is St Martin?",
    options: ["Continent", "City", "Island", "Country"],
    type: "geography"
  },
  {
    answer: "1492",
    question: "When was St Martin discovered?",
    options: ["1568", "1392", "1501", "1492"],
    type: "history"
  }
];
