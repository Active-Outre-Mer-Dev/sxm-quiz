import profile from "@/assets/agis.jpg";

type PropTypes = {
  size?: number;
};

export function Avatar({ size = 50 }: PropTypes) {
  return (
    <img
      loading="lazy"
      decoding="async"
      src={profile.src}
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  );
}
