"use client";
import { ActionIcon, Button } from "@aomdev/ui";
import { Edit, Trash2 } from "lucide-react";
import { useActionState } from "@/lib/hooks/use-action-state";
import { FactDeleteSchemaType, FactUpdateScema, deleteFact, updateFact } from "./actions";
import { startTransition, useState, useTransition } from "react";
import { Textarea } from "@aomdev/ui";
import { useFormStatus } from "react-dom";
import { MotionConfig, motion, AnimatePresence } from "framer-motion";
import { useMeasure } from "@/lib/hooks/use-measure";

type Props = {
  children: React.ReactNode;
};

export function Facts({ children }: Props) {
  return (
    <MotionConfig transition={{ duration: 0.3, type: "spring", bounce: 0 }}>
      <motion.ul>
        <AnimatePresence initial={false}>{children}</AnimatePresence>
      </motion.ul>
    </MotionConfig>
  );
}

type PropTypes = {
  description: string;
  id: string;
  removeOptimisticFact: () => void;
};

export function Fact({ description, id, removeOptimisticFact }: PropTypes) {
  const { formAction } = useActionState<FactDeleteSchemaType>(deleteFact);
  const { formAction: updateAction } = useActionState<FactUpdateScema>(updateFact);
  const [isPending, startTransition] = useTransition();
  const [shouldEdit, setShouldEdit] = useState(false);
  const [ref, height] = useMeasure();
  return (
    <motion.li
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      layout
      className="overflow-hidden"
    >
      <motion.form
        animate={{ height: height === 0 ? "auto" : height }}
        data-pending={isPending}
        action={(formData) => {
          setShouldEdit(false);
          startTransition(() => {
            updateAction(formData);
          });
        }}
        className="overflow-hidden"
      >
        <div
          ref={ref}
          className="flex items-start justify-between group py-6 px-2 border-b-neutral-200 dark:border-b-neutral-700 border-b"
        >
          <input
            type="hidden"
            name="id"
            defaultValue={id}
          />
          <div className="grow space-y-4">
            {shouldEdit && (
              <FactEditField
                onCancel={setShouldEdit.bind(null, false)}
                value={description}
              />
            )}
            {!shouldEdit && description}
          </div>
          {!shouldEdit && (
            <FactButtons
              removeOptimistic={removeOptimisticFact}
              action={formAction}
              onEdit={setShouldEdit}
            />
          )}
        </div>
      </motion.form>
    </motion.li>
  );
}

function FactEditField({ value, onCancel }: { value: string; onCancel: () => void }) {
  const { pending } = useFormStatus();
  return (
    <>
      <Textarea
        defaultValue={value}
        rows={5}
        autoFocus
        name="description"
      />
      <div className="flex gap-2">
        <Button
          type="button"
          variant={"neutral"}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          disabled={pending}
          className="group group-data-[pending=true]:bg-error-300"
        >
          Submit
        </Button>
      </div>
    </>
  );
}

function FactButtons({
  action,
  onEdit,
  removeOptimistic
}: {
  action: (payload: FormData) => void;
  onEdit: (val: boolean) => void;
  removeOptimistic: () => void;
}) {
  const { pending } = useFormStatus();
  return (
    <div className="flex gap-4">
      <ActionIcon
        disabled={pending}
        type="button"
        onClick={() => onEdit(true)}
      >
        <Edit size={"75%"} />
      </ActionIcon>

      <ActionIcon
        disabled={pending}
        color="error"
        formAction={(formData: FormData) => {
          removeOptimistic();
          startTransition(() => {
            action(formData);
          });
        }}
      >
        <Trash2 size={"75%"} />
      </ActionIcon>
    </div>
  );
}
