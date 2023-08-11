type PropTypes = {
  size?: number;
  src?: string;
};

export function Avatar({ size = 50, src }: PropTypes) {
  return (
    <img
      loading="lazy"
      decoding="async"
      src={src}
      width={size}
      height={size}
      className="rounded-full object-cover"
    />
  );
}
