"use client";
import { useState } from "react";

export function Test() {
  const [state, setState] = useState<string>("");

  const onClick = async () => {
    const res = await fetch("/api/hello");
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setState(prev => prev + decoder.decode(value));
      }
    }
  };

  return (
    <>
      <p className="w-4/5">{state}</p>
      <button onClick={onClick} className={`bg-primary text-on-primary rounded-full px-4 py-1 label-large`}>
        Fetch
      </button>
    </>
  );
}
