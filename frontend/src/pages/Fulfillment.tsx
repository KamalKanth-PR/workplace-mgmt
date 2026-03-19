import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { mockRequests, typeLabels } from '@/lib/mock-data';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function Fulfillment() {
  const navigate = useNavigate();
  const approved = mockRequests.filter(r => r.status === 'approved');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Fulfillment Queue</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{approved.length} approved requests ready for fulfillment</p>
      </div>

      <div className="space-y-3">
        {approved.length === 0 && (
          <div className="bg-surface rounded-lg border border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">No requests to fulfill</p>
          </div>
        )}
        {approved.map(req => (
          <div key={req.id} className="bg-surface rounded-lg border border-border shadow-card p-5 flex items-center gap-5 hover:bg-primary/5 transition-colors">
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/requests/${req.id}`)}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-muted-foreground">{req.id}</span>
                <StatusBadge status={req.status} />
              </div>
              <p className="text-sm font-medium text-foreground truncate">{req.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{req.requester} · {typeLabels[req.type]} · Target: {format(new Date(req.targetDate), 'MMM d')}</p>
            </div>
            <Button size="sm" className="press-effect gap-1.5 shrink-0" onClick={() => toast.success(`${req.id} marked as fulfilled`)}>
              <Package className="h-3.5 w-3.5" /> Mark Fulfilled
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
