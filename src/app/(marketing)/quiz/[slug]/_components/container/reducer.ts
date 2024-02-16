export const initialState: State = { score: 0, time: 0, complete: false, streak: 0, tab: "description" };

export type State = {
  score: number;
  time: number;
  complete: boolean;
  streak: number;
  tab: string;
};

type Action =
  | { type: "completed"; payload: { score: number; time: number; streak: number } }
  | { type: "reset" }
  | { type: "tab"; payload: string };

export function reducer(state: typeof initialState, action: Action): State {
  switch (action.type) {
    case "completed": {
      return { ...action.payload, complete: true, tab: "summary" };
    }
    case "tab": {
      return { ...state, tab: action.payload };
    }
    case "reset": {
      return { score: 0, time: 0, complete: false, streak: 0, tab: state.tab };
    }
    default: {
      return state;
    }
  }
}
