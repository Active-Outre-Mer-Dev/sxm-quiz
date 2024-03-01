import { Alert, Button, Card, TextInput, Textarea, Title } from "@aomdev/ui";
import { Select, Switch } from "./client";
import { createClient } from "@/lib/supabase";
import { deleteQuiz, updateQuiz } from "./actions";

const categories = [
  {
    label: "History",
    value: "history"
  },
  {
    label: "Economy",
    value: "economy"
  },
  {
    label: "Environment",
    value: "environment"
  },
  {
    label: "Geography",
    value: "geography"
  }
];

export default async function QuizSettings({ params }: { params: { id: string } }) {
  const supabase = createClient("server_component");
  const { data, error } = await supabase.from("quiz").select("*").eq("id", params.id).single();
  if (error) throw error;

  return (
    <div className="basis-5/6 space-y-6">
      <Card>
        <Title
          order={2}
          className="font-heading text-2xl mb-4"
        >
          Project Information
        </Title>
        <form
          className="space-y-4 w-1/2"
          action={updateQuiz.bind(null, Number(params.id))}
        >
          <TextInput
            label="Title"
            name="title"
            defaultValue={data.title}
          />
          <TextInput
            label="Slug"
            name="slug"
            defaultValue={data.slug}
          />
          <div>
            <label className="text-sm font-medium block mb-1">Category</label>
            <Select
              name="category"
              fullWidth
              defaultValue={data.category}
              items={categories}
            />
          </div>
          <Switch
            label="Published"
            name="status"
          />
          <Textarea
            rows={6}
            defaultValue={data.description}
            label="Description"
            name="description"
          />

          <Button>Submit</Button>
        </form>
      </Card>
      <Alert
        color="error"
        title="Delete Project"
      >
        <p className="mb-2">This quiz will be permanently deleted.</p>

        <form action={deleteQuiz.bind(null, Number(params.id))}>
          <Button
            variant={"error"}
            className="ml-auto"
          >
            Delete
          </Button>
        </form>
      </Alert>
    </div>
  );
}
