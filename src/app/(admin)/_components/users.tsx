import { Avatar } from "@/components/avatar";

export function User() {
  return (
    <div className="flex items-center gap-2 ">
      <Avatar
        size={40}
        src="/agis-carty/profile.jpg"
      />
      <span className="flex flex-col items-start">
        <span className="font-medium">Agis Carty</span>
        <span className="text-gray-300">a.carty2555@gmail.com</span>
      </span>
    </div>
  );
}
