"use client";
import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { updateQuiz } from "./actions";
import type { Quiz } from "@/types/custom.types";
import { useOptimistic, useTransition } from "react";
import Link from "next/link";

type PropTypes = {
  quizzes: Quiz[];
};

export default function QuizBoard({ quizzes }: PropTypes) {
  const [state, setState] = useOptimistic(quizzes, (quizzes, newQuiz: Quiz) => {
    return quizzes.map((old) => (old.slug === newQuiz.slug ? newQuiz : old));
  });
  const [, startTransition] = useTransition();
  const unpublished: typeof quizzes = [];
  const published: typeof quizzes = [];
  const beta: typeof quizzes = [];
  for (const quiz of state) {
    if (quiz.status === "published") {
      published.push(quiz);
    } else if (quiz.status === "pending") {
      unpublished.push(quiz);
    } else {
      beta.push(quiz);
    }
  }

  const onDragEnd = async (result: DropResult) => {
    const quiz = state.find((t) => result.draggableId === `${t.slug}`);
    if (!quiz || !result.destination) return;
    if (result.destination.droppableId === result.source.droppableId) return;
    quiz.status = result.destination.droppableId as Quiz["status"];

    startTransition(() => {
      updateQuiz(quiz.id, quiz.status);
      setState(quiz);
    });
  };

  return (
    <div className="flex gap-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <QuizDrop
          label="Pending"
          key={0}
          id="pending"
          quiz={unpublished}
        />
        <QuizDrop
          label="Beta"
          key={1}
          id="beta"
          quiz={beta}
        />
        <QuizDrop
          label="Published"
          key={2}
          id="published"
          quiz={published}
        />
      </DragDropContext>
    </div>
  );
}

type Prop = {
  slug: string;
  index: number;
  title: string;
  id: number;
};

function QuizItem({ slug, index, title, id }: Prop) {
  return (
    <Draggable
      draggableId={slug}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            data-dragging={snapshot.isDragging}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            className={cardStyles({ className: "mb-4 data-[dragging=true]:opacity-80 last-of-type:mb-0" })}
          >
            {title}
            <Link
              href={`/admin/quizzes/${id}`}
              className="block mt-4 text-primary-300 w-fit"
            >
              View{" "}
            </Link>
          </div>
        );
      }}
    </Draggable>
  );
}

type QuizDropProps = {
  id: string;
  label: string;
  quiz: Quiz[];
};

function QuizDrop({ id, quiz, label }: QuizDropProps) {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            data-dropping={snapshot.isDraggingOver}
            {...provided.droppableProps}
            className="data-[dropping=true]:bg-neutral-800/30 p-4 pb-24 basis-1/3"
          >
            <p className="mb-4 font-medium text-xl">
              {label} ({quiz.length})
            </p>
            {quiz.map((quiz, index) => (
              <QuizItem
                key={quiz.slug}
                id={quiz.id}
                slug={quiz.slug}
                index={index}
                title={quiz.title}
              />
            ))}
          </div>
        );
      }}
    </Droppable>
  );
}
