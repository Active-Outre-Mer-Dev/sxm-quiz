type State = {
  score: number;
  inputs: string[];
};

type Action =
  | {
      type: "next";
      value: string;
    }
  | { type: "reset" };

export const initialState: State = {
  score: 0,
  inputs: []
};

export function reducer(state: typeof initialState, action: Action): State {
  switch (action.type) {
    case "next": {
      return {
        score: state.score + 1,
        inputs: [...state.inputs, action.value]
      };
    }
    case "reset": {
      return {
        score: 0,
        inputs: []
      };
    }

    default:
      return state;
  }
}
