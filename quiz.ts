type Questions = {
  question: string;
  answer: string;
  options: string[];
  type: string;
  difficulty: "easy" | "medium" | "hard";
};

export const questions: Questions[] = [
  {
    answer: "Island",
    question: "What is St Martin?",
    options: ["Continent", "City", "Country"],
    type: "geography",
    difficulty: "easy"
  },
  {
    answer: "1493",
    question: "When was St Martin discovered?",
    options: ["1568", "1392", "1501"],
    type: "history",
    difficulty: "medium"
  },
  {
    answer: "900",
    question: "What is SXM's GDP",
    options: ["400", "500", "100"],
    type: "economy",
    difficulty: "hard"
  },
  {
    answer: "Maho",
    options: ["Simpson Bay", "Marigot", "Grand-Case"],
    question: "Where is Princess Juliana Airport located?",
    type: "geography",
    difficulty: "easy"
  },
  {
    answer: "11 November",
    options: ["4 July", "14 July", "17 August"],
    question: "When is SXM Day?",
    type: "History",
    difficulty: "easy"
  },
  {
    answer: "1648",
    options: ["1492", "1776", "1555"],
    question: "When was the island divided into two parts?",
    type: "history",
    difficulty: "medium"
  },
  {
    answer: "Marigot",
    options: ["Grand-Case", "St James", "Sandy-Ground"],
    question: "What is the capitol of the French Side",
    type: "geography",
    difficulty: "easy"
  },
  {
    answer: "Philipsburg",
    options: ["Simpson Bay", "St Peters", "Cole Bay"],
    question: "What is the capitol of the Dutch Side",
    type: "geography",
    difficulty: "easy"
  },
  {
    answer: "Pic Paradis",
    options: ["Mont des Accords", "St Peters hill", "Morne Valois"],
    question: "What is the highest hill in Saint Martin/Sint Maarten?",
    type: "geography",
    difficulty: "medium"
  }
];
