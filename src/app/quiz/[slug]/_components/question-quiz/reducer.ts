export type Action =
  | {
      type: "next";
      value: { answer: string; choice: string };
    }
  | { type: "reset" };

type State = { choices: string[]; highStreak: number; streak: number; current: number; points: number };

export const initialState: State = {
  highStreak: 0,
  streak: 0,
  current: 0,
  points: 0,
  choices: []
};

export function reducer(state: typeof initialState, action: Action): typeof initialState {
  switch (action.type) {
    case "next": {
      const current = state.current + 1;
      let highStreak = state.highStreak;
      let nextStreak = state.streak;
      let points = state.points;
      let choices = state.choices.slice();
      choices.push(action.value.choice);
      if (action.value.answer === action.value.choice) {
        points++;
        nextStreak++;
        if (nextStreak > state.highStreak) {
          highStreak++;
        }
      } else {
        nextStreak = 0;
      }
      return {
        current,
        highStreak,
        streak: nextStreak,
        points,
        choices
      };
    }
    case "reset": {
      return {
        current: 0,
        highStreak: 0,
        streak: 0,
        points: 0,
        choices: []
      };
    }
    default: {
      return state;
    }
  }
}
