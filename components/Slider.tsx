"use client";
import * as RadixSlider from "@radix-ui/react-slider";

type PropTypes = {
  label?: string;
};

export function Slider({ label, ...props }: PropTypes & RadixSlider.SliderProps) {
  return (
    <RadixSlider.Root
      {...props}
      className="relative flex items-center select-none touch-none w-[200px] h-5"
      step={1}
      aria-labelledby={label}
    >
      <RadixSlider.Track className="bg-surface-variant relative grow rounded-full h-1">
        <RadixSlider.Range className="absolute bg-primary rounded-full h-full" />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        aria-labelledby="thumb-label"
        className="block relative w-5 h-5 bg-primary rounded-full focus:outline-none"
      />
    </RadixSlider.Root>
  );
}
