import { cn } from '@/lib/utils';
import { type RequestStatus, statusLabels } from '@/lib/mock-data';

const statusClassMap: Record<RequestStatus, string> = {
  submitted: 'status-pending',
  under_review: 'status-review',
  approved: 'status-approved',
  rejected: 'status-rejected',
  fulfilled: 'status-fulfilled',
  closed: 'status-closed',
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-tight',
      statusClassMap[status]
    )}>
      {statusLabels[status]}
    </span>
  );
}
