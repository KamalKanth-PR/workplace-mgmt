import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { mockRequests, typeLabels } from '@/lib/mock-data';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function Approvals() {
  const navigate = useNavigate();
  const pending = mockRequests.filter(r => r.status === 'submitted' || r.status === 'under_review');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Approval Queue</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{pending.length} requests pending your review</p>
      </div>

      <div className="space-y-3">
        {pending.length === 0 && (
          <div className="bg-surface rounded-lg border border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">No pending approvals</p>
          </div>
        )}
        {pending.map(req => (
          <div key={req.id} className="bg-surface rounded-lg border border-border shadow-card p-5 flex items-center gap-5 hover:bg-primary/5 transition-colors">
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/requests/${req.id}`)}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-muted-foreground">{req.id}</span>
                <StatusBadge status={req.status} />
                <PriorityBadge priority={req.priority} />
              </div>
              <p className="text-sm font-medium text-foreground truncate">{req.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{req.requester} · {typeLabels[req.type]} · {format(new Date(req.createdAt), 'MMM d')}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="sm" className="press-effect gap-1.5" onClick={() => toast.success(`${req.id} approved`)}>
                <CheckCircle2 className="h-3.5 w-3.5" /> Approve
              </Button>
              <Button size="sm" variant="outline" className="press-effect gap-1.5 border-destructive text-destructive hover:bg-destructive/5" onClick={() => toast.success(`${req.id} rejected`)}>
                <XCircle className="h-3.5 w-3.5" /> Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
