"use client";
import { useState } from "react";
import { colors } from "@/lib/colors";

export function ColorSelect() {
  const [selectedColor, setColor] = useState("");
  return (
    <div className="">
      <p className="font-medium text-sm mb-1">Color</p>
      <div className="space-x-2 mt-auto">
        {colors.map((color) => {
          return (
            <button
              type="button"
              onClick={setColor.bind(null, color || "")}
              data-selected={color === selectedColor}
              data-color={color}
              className={`data-[color=primary]:bg-primary-600 data-[color=secondary]:bg-secondary-600
            data-[color=tertiary]:bg-tertiary-600 data-[color=warn]:bg-warn-600
            data-[color=success]:bg-success-600 data-[color=error]:bg-error-600
            data-[selected=true]:ring-2
            h-10 w-10 rounded`}
            ></button>
          );
        })}
      </div>
      <input
        className="hidden"
        defaultValue={selectedColor}
        name="color"
      />
    </div>
  );
}
