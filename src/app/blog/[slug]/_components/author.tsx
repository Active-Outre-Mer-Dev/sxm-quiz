import { Avatar } from "@/components/avatar";

export function Author() {
  return (
    <div className="flex items-center gap-2">
      <Avatar size={50} />
      <div>
        <span className="font-medium block text-gray-800">Agis Carty</span>
        <span className="text-gray-600">SXM Quiz core team</span>
      </div>
    </div>
  );
}
