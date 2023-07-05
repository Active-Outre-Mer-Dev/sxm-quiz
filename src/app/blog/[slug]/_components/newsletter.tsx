import { Title, TextInput, Button } from "@aomdev/ui";

export function Newsletter() {
  return (
    <div
      className={`w-11/12 lg:w-5/6 mb-16 bg-gradient-to-r min-h-[250px] flex justify-between
     lg:items-center from-primary-500 to-primary-600 mx-auto rounded-md p-4
     lg:flex-row flex-col`}
    >
      <Title
        order={2}
        className="font-heading basis-1/2 lg:mb-0 mb-6 font-medium text-white text-2xl lg:text-4xl"
      >
        Want more product updates? <br /> Sign up for the newsletter
      </Title>
      <div className="flex gap-2 lg:flex-row flex-col basis-1/2  justify-end text-white">
        <TextInput size={"lg"} className="text-white" />
        <Button size={"lg"} className="bg-white text-primary-500">
          Subscribe
        </Button>
      </div>
    </div>
  );
}
