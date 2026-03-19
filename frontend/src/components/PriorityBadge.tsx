import { cn } from '@/lib/utils';
import { type Priority, priorityLabels } from '@/lib/mock-data';

const priorityClassMap: Record<Priority, string> = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-tight',
      priorityClassMap[priority]
    )}>
      {priorityLabels[priority]}
    </span>
  );
}
