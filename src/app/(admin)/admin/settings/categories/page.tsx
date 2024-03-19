import { ActionIcon, Button, Card, Table, TextInput } from "@aomdev/ui";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";
import { Search } from "@/types/custom.types";
import { ColorSelect } from "./color-select";
import { createCategory, deleteCategory } from "./actions";
import { Trash } from "lucide-react";

export default async function CategoriesPage({ searchParams }: { searchParams: Search }) {
  const { error, data } = await createClient("server_component").from("categories").select("*");
  if (error) throw error;
  const showCreate = new URLSearchParams(searchParams).get("label") === "new";
  return (
    <main className="container mx-uto">
      <Link
        className={buttonStyles({ className: "w-fit mt-4 ml-auto mb-4" })}
        href={"?label=new"}
      >
        New label
      </Link>
      {showCreate && (
        <Card>
          <form
            className=""
            action={createCategory}
          >
            <div className="flex gap-4 items-center">
              <div className="basis-1/3">
                <TextInput
                  label="Name"
                  name="category"
                  required
                />
              </div>
              <ColorSelect />
            </div>
            <div className="flex gap-4 mt-4 justify-end">
              <Link
                className={buttonStyles({ variant: "neutral" })}
                href={"/admin/settings/categories"}
              >
                Cancel
              </Link>
              <Button className="">Create label</Button>
            </div>
          </form>
        </Card>
      )}
      <Table className="w-full mt-10">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((cat) => {
            return (
              <Table.Row
                key={cat.id}
                className="flex justify-end"
              >
                <Table.Cell className="grow">{cat.title}</Table.Cell>
                <Table.Cell className="w-fit">
                  <form action={deleteCategory.bind(null, cat.id)}>
                    <ActionIcon
                      color="error"
                      type="submit"
                    >
                      <Trash size={"75%"} />
                    </ActionIcon>
                  </form>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </main>
  );
}
