"use client";

import { cardStyles } from "@aomdev/ui/src/card/styles";
import { FormEvent, useRef, useState } from "react";
import { Image } from "lucide-react";
type PropTypes = {
  defaultImg?: string;
  rounded?: string;
};

export function ImageDropzone({ defaultImg }: PropTypes) {
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
      <div
        className={cardStyles({ className: "flex items-center justify-center cursor-pointer" })}
        onClick={onClick}
      >
        <div className="flex gap-4 items-center">
          <Image className="text-gray-200" />
          <div>
            <p className="text-xl">Drag and drop images here</p>
          </div>
        </div>
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
      </div>
      {(image || defaultImg) && (
        <div className="space-y-2">
          <img
            src={imageURL || defaultImg}
            className="mt-5"
          />
          {image && <p className="text-gray-200">{image.name}</p>}
        </div>
      )}
    </div>
  );
}
