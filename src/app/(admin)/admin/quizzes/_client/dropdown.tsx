"use client";
import { Button, Dropdown } from "@aomdev/ui";
import { ChevronDown, Check } from "lucide-react";
import { useReducer, useTransition } from "react";
import { setGrouping, setView } from "../actions";

type ViewTypes = "table" | "board";
type GroupTypes = "status" | "categories";
type Actions = { type: "view"; payload: ViewTypes } | { type: "grouping"; payload: GroupTypes };

type State = {
  grouping: GroupTypes;
  view: ViewTypes;
};

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case "view": {
      return {
        ...state,
        view: action.payload
      };
    }
    case "grouping": {
      return {
        ...state,
        grouping: action.payload
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
}

type PropTypes = {
  initialState: State;
};

export function Custom({ initialState }: PropTypes) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [, startTransition] = useTransition();
  const onViewChange = (payload: State["view"]) => {
    startTransition(() => {
      setView();
      dispatch({ type: "view", payload });
    });
  };
  const onGroupingChange = (payload: State["grouping"]) => {
    startTransition(() => {
      setGrouping();
      dispatch({ type: "grouping", payload });
    });
  };

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button
          variant={"neutral"}
          size={"sm"}
        >
          Display
          <span className="inline-block ml-2">
            <ChevronDown size={14} />
          </span>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Label>Grouping</Dropdown.Label>
        <Dropdown.Item
          data-selected={state.grouping === "categories"}
          className="data-[selected=true]:bg-primary-600 data-[selected=true]:text-white group"
          onSelect={onGroupingChange.bind(null, "categories")}
          rightSection={
            <Check
              size={16}
              className="group-data-[selected=true]:text-white hidden group-data-[selected=true]:inline-block"
            />
          }
        >
          Categories
        </Dropdown.Item>
        <Dropdown.Item
          data-selected={state.grouping === "status"}
          className="data-[selected=true]:bg-primary-600 data-[selected=true]:text-white group"
          onSelect={onGroupingChange.bind(null, "status")}
          rightSection={
            <Check
              size={16}
              className="group-data-[selected=true]:text-white hidden group-data-[selected=true]:inline-block"
            />
          }
        >
          Status
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Label>View</Dropdown.Label>
        <Dropdown.Item
          data-selected={state.view === "table"}
          className="data-[selected=true]:bg-primary-600 data-[selected=true]:text-white group"
          onSelect={onViewChange.bind(null, "table")}
          rightSection={
            <Check
              size={16}
              className="group-data-[selected=true]:text-white hidden group-data-[selected=true]:inline-block"
            />
          }
        >
          Table
        </Dropdown.Item>
        <Dropdown.Item
          data-selected={state.view === "board"}
          className="data-[selected=true]:bg-primary-600 data-[selected=true]:text-white group"
          onSelect={onViewChange.bind(null, "board")}
          rightSection={
            <Check
              size={16}
              className="group-data-[selected=true]:text-white hidden group-data-[selected=true]:inline-block"
            />
          }
        >
          Board
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
