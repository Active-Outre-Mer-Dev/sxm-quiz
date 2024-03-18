"use client";
import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { updateQuizStatus } from "./actions";
import type { Quiz, QuizCat } from "@/types/custom.types";
import { useOptimistic, useTransition } from "react";
import Link from "next/link";

type PropTypes = {
  quizzes: QuizCat[];
  // drops: { id: string; label: string }[];
  isStatusGroup: boolean;
};

export default function QuizBoard({ quizzes, isStatusGroup }: PropTypes) {
  const [state, setState] = useOptimistic(quizzes, (quizzes, newQuiz: QuizCat) => {
    return quizzes.map((old) => (old.slug === newQuiz.slug ? newQuiz : old));
  });
  const [, startTransition] = useTransition();

  const categories = Array.from(new Set(quizzes.map((quiz) => quiz.categories?.title || ""))).map((cat) => ({
    id: cat.toLowerCase(),
    label: cat
  }));

  const quizTypes: Record<string, any> = {
    beta: [],
    published: [],
    pending: []
  };

  const statuses = [
    {
      id: "beta",
      label: "Beta"
    },
    {
      id: "pending",
      label: "Pending"
    },
    {
      id: "published",
      label: "Published"
    }
  ];

  categories.forEach((cat) => {
    quizTypes[cat.id] = quizzes.filter((quiz) => quiz.categories?.title === cat.label);
  });

  for (const quiz of quizzes) {
    if (quiz.status === "published") {
      quizTypes.published.push(quiz);
    } else if (quiz.status === "pending") {
      quizTypes.pending.push(quiz);
    } else {
      quizTypes.beta.push(quiz);
    }
  }

  const onDragEnd = async (result: DropResult) => {
    const quiz = state.find((t) => result.draggableId === `${t.slug}`);
    if (!quiz || !result.destination) return;
    if (result.destination.droppableId === result.source.droppableId) return;
    quiz.status = result.destination.droppableId as Quiz["status"];

    startTransition(() => {
      updateQuizStatus(quiz.id, quiz.status);
      setState(quiz);
    });
  };

  return (
    <div className="flex gap-8">
      <DragDropContext onDragEnd={onDragEnd}>
        {isStatusGroup &&
          statuses.map((value) => {
            return (
              <QuizDrop
                key={value.id}
                id={value.id}
                label={value.label}
                quiz={quizTypes[value.id]}
              />
            );
          })}
        {!isStatusGroup &&
          categories.map((value) => {
            return (
              <QuizDrop
                key={value.id}
                id={value.id}
                label={value.label}
                quiz={quizTypes[value.id]}
              />
            );
          })}
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
            <p className="mb-4 font-medium text-xl capitalize">
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
