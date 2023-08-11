import { Avatar } from "@/components/avatar";

export function Author() {
  return (
    <div className="flex items-center gap-2">
      <Avatar size={50} />
      <div>
        <span className="font-medium block ">Agis Carty</span>
        <span className="text-gray-600 dark:text-gray-200">SXM Quiz core team</span>
      </div>
    </div>
  );
}
