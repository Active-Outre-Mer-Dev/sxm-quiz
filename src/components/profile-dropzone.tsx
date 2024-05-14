"use client";

import { cardStyles } from "@aomdev/ui/src/card/styles";
import { FormEvent, useRef, useState } from "react";
import { Avatar } from "./avatar";
import { ImagePlus } from "lucide-react";
import { Tooltip } from "@aomdev/ui";

type PropTypes = {
  defaultImg?: string;
  rounded?: string;
};

export function ProfileDropzone({ defaultImg }: PropTypes) {
  const [image, setImage] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);
  const onClick = () => {
    ref.current?.click();
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setImage(Array.from(e.currentTarget.files)[0]);
    }
  };

  const imageURL = image ? URL.createObjectURL(image?.slice()!) : defaultImg ? defaultImg : "";

  return (
    <div>
      {!image && (
        <input
          hidden
          name="default_image"
          defaultValue={defaultImg}
        />
      )}
      <input
        ref={ref}
        type="file"
        hidden
        name="image"
        onChange={onChange}
      />

      <Tooltip>
        <Tooltip.Trigger>
          <div
            onClick={onClick}
            className="space-y-2 relative w-fit cursor-pointer"
          >
            <Avatar
              src={imageURL || defaultImg}
              size={100}
            />
            <div className="absolute bottom-0 right-1 text-gray-300 p-1 bg-neutral-800 rounded-full h-7 w-7 flex items-center justify-center">
              <ImagePlus size={"100%"} />
            </div>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content
          sideOffset={5}
          className={cardStyles()}
        >
          Upload image
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
