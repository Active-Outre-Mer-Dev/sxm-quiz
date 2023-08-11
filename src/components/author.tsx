import { Avatar } from "@/components/avatar";

type PropTypes = {
  position?: string;
  img?: string;
  firstName: string;
  lastName: string;
};

export function Author({ firstName, lastName, img, position = "SXM Quiz Core Team" }: PropTypes) {
  const initials = firstName[0] + lastName[0];
  return (
    <div className="flex items-center gap-2">
      {img ? (
        <Avatar size={50} src={img} />
      ) : (
        <div
          style={{ width: 50, height: 50 }}
          className="rounded-full uppercase font-medium bg-neutral-100 flex items-center justify-center"
        >
          {initials}
        </div>
      )}
      <div>
        <span className="font-medium block ">
          {firstName} {lastName}
        </span>
        <span className="text-gray-600 dark:text-gray-200">{position}</span>
      </div>
    </div>
  );
}
