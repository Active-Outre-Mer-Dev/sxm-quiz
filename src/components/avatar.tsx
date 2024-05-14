import { User } from "lucide-react";
type PropTypes = {
  size?: number;
  src?: string;
};

export function Avatar({ size = 50, src }: PropTypes) {
  return (
    <>
      {src ? (
        <img
          loading="lazy"
          decoding="async"
          src={src}
          style={{ borderRadius: "50%", width: size, height: size }}
          className="rounded-full object-cover"
        />
      ) : (
        <div
          style={{ width: size, height: size }}
          className="bg-gray-800 rounded-full flex items-center justify-center"
        >
          <User size={"75%"} />
        </div>
      )}
    </>
  );
}
