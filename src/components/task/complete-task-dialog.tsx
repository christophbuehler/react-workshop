import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Task } from "@/hooks/use-tasks";
import { saveTask } from "@/lib/save-task";
import { useState } from "react";
import { useMyProfile } from "@/hooks/use-my-profile";
import { useError } from "@/hooks/use-error";

export interface CompleteTaskDialogProps {
  task: Task;
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const CompleteTaskDialog = ({
  task,
  open,
  onClose,
  onComplete,
}: CompleteTaskDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { myProfile } = useMyProfile();
  const { setError } = useError();

  const complete = async () => {
    try {
      setLoading(true);
      await saveTask({
        ...task,
        ownerId: task.originalOwnerId,
        completed: true,
      });
      onComplete();
    } catch {
      setError("Could not complete task");
      setLoading(false);
    }
  };

  const differentOriginalOwnerId =
    myProfile?.id !== task.originalOwnerId ? task.originalOwnerId : null;

  return (
    <Dialog open={open} onOpenChange={(opn) => !opn && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Task</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-primary/80">
          {differentOriginalOwnerId
            ? "This task will be completed and sent back to its owner."
            : "This task will be completed."}
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={complete} disabled={loading}>
            {loading ? "Completing..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteTaskDialog;