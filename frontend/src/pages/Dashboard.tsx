import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, CheckCircle2, AlertCircle, Archive, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { CreateRequestSheet } from '@/components/CreateRequestSheet';
import { mockRequests, typeLabels } from '@/lib/mock-data';
import { format } from 'date-fns';

export default function Dashboard() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const navigate = useNavigate();

  const pending = mockRequests.filter(r => r.status === 'submitted' || r.status === 'under_review').length;
  const approved = mockRequests.filter(r => r.status === 'approved').length;
  const fulfilled = mockRequests.filter(r => r.status === 'fulfilled').length;

  const recentRequests = mockRequests.slice(0, 8);
  const pendingApprovals = mockRequests.filter(r => r.status === 'submitted' || r.status === 'under_review').slice(0, 5);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Overview of all resource requests</p>
        </div>
        <Button className="press-effect gap-2" onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4" />
          New Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Requests" value={mockRequests.length} icon={<Archive className="h-4 w-4" />} />
        <StatCard label="Pending" value={pending} icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Approved" value={approved} icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="Fulfilled" value={fulfilled} icon={<AlertCircle className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Requests Table */}
        <div className="lg:col-span-2 bg-surface rounded-lg border border-border shadow-card">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">Active Requests</h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1" onClick={() => navigate('/requests')}>
              View all <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Title</th>
                  <th className="text-left py-3 px-5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Priority</th>
                  <th className="text-left py-3 px-5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="group border-b border-border last:border-0 hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() => navigate(`/requests/${req.id}`)}
                  >
                    <td className="py-3 px-5 font-mono text-xs text-muted-foreground whitespace-nowrap">{req.id}</td>
                    <td className="py-3 px-5 font-medium text-foreground">{req.title}</td>
                    <td className="py-3 px-5 text-muted-foreground text-xs">{typeLabels[req.type]}</td>
                    <td className="py-3 px-5"><PriorityBadge priority={req.priority} /></td>
                    <td className="py-3 px-5"><StatusBadge status={req.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Approvals Rail */}
        <div className="bg-surface rounded-lg border border-border shadow-card">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">Pending Approvals</h2>
          </div>
          <div className="divide-y divide-border">
            {pendingApprovals.length === 0 && (
              <p className="p-5 text-sm text-muted-foreground">No pending approvals</p>
            )}
            {pendingApprovals.map((req) => (
              <div
                key={req.id}
                className="px-5 py-3 hover:bg-primary/5 transition-colors cursor-pointer press-effect"
                onClick={() => navigate(`/requests/${req.id}`)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] text-muted-foreground">{req.id}</span>
                  <StatusBadge status={req.status} />
                </div>
                <p className="text-sm font-medium text-foreground truncate">{req.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{req.requester} · {format(new Date(req.createdAt), 'MMM d')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreateRequestSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
