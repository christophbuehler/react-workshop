import type {Task} from '@/hooks/use-tasks';
import {CheckCheck, Dot} from 'lucide-react';
import {Badge} from '../ui/badge';

interface TaskStatusBadgeProps {
  task: Task;
}

export const TaskStatusBadge = ({task}: TaskStatusBadgeProps) =>
  task.completed ? (
    <Badge variant="secondary" className="cursor-default gap-1">
      <CheckCheck className="w-4 h-4" />
      Completed
    </Badge>
  ) : (
    <Badge className="cursor-default text-white bg-green-600 gap-1">
      <Dot className="w-4 h-4" />
      Open
    </Badge>
  );
