import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Package, Lock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { mockRequests, typeLabels } from '@/lib/mock-data';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function RequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  const request = mockRequests.find(r => r.id === id);

  if (!request) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Request not found</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/requests')}>Back to Requests</Button>
      </div>
    );
  }

  const handleAction = (action: string) => {
    toast.success(`Request ${request.id} ${action}`);
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    toast.success('Comment added');
    setComment('');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {/* Title */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Request {request.id}: {request.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{typeLabels[request.type]} · {request.requester} · {request.requesterDept}</p>
        </div>
        <div className="flex items-center gap-2">
          <PriorityBadge priority={request.priority} />
          <StatusBadge status={request.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left: Content */}
        <div className="space-y-6">
          {/* Description */}
          <div className="bg-surface rounded-lg border border-border shadow-card p-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Description</h3>
            <p className="text-sm text-foreground leading-relaxed">{request.description}</p>
          </div>

          {/* Justification */}
          <div className="bg-surface rounded-lg border border-border shadow-card p-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Justification</h3>
            <p className="text-sm text-foreground leading-relaxed">{request.justification}</p>
          </div>

          {/* Timeline */}
          <div className="bg-surface rounded-lg border border-border shadow-card p-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Timeline</h3>
            <div className="space-y-0">
              {request.timeline.map((entry, i) => (
                <div key={entry.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    {i < request.timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-5">
                    <p className="text-sm font-medium text-foreground">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">{entry.actor} · {format(new Date(entry.timestamp), 'MMM d, yyyy h:mm a')}</p>
                    {entry.detail && <p className="text-sm text-muted-foreground mt-1 italic">"{entry.detail}"</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="bg-surface rounded-lg border border-border shadow-card p-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
              <MessageSquare className="h-3 w-3 inline mr-1" /> Comments
            </h3>
            <div className="space-y-4 mb-4">
              {request.comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-muted-foreground">{c.avatar}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{c.author} <span className="text-muted-foreground font-normal">· {format(new Date(c.timestamp), 'MMM d')}</span></p>
                    <p className="text-sm text-foreground mt-0.5">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                rows={2}
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" className="self-end press-effect" onClick={handleComment}>Post</Button>
            </div>
          </div>
        </div>

        {/* Right: Action Sidebar */}
        <div className="space-y-4">
          <div className="bg-surface rounded-lg border border-border shadow-card p-5 sticky top-20">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Actions</h3>

            {(request.status === 'submitted' || request.status === 'under_review') && (
              <div className="space-y-2 mb-5">
                <Button className="w-full press-effect gap-2" onClick={() => handleAction('approved')}>
                  <CheckCircle2 className="h-4 w-4" /> Approve
                </Button>
                <Button variant="outline" className="w-full press-effect gap-2 border-destructive text-destructive hover:bg-destructive/5" onClick={() => handleAction('rejected')}>
                  <XCircle className="h-4 w-4" /> Reject
                </Button>
              </div>
            )}

            {request.status === 'approved' && (
              <Button className="w-full press-effect gap-2 mb-5" onClick={() => handleAction('fulfilled')}>
                <Package className="h-4 w-4" /> Mark Fulfilled
              </Button>
            )}

            {request.status === 'fulfilled' && (
              <Button variant="outline" className="w-full press-effect gap-2 mb-5" onClick={() => handleAction('closed')}>
                <Lock className="h-4 w-4" /> Close Request
              </Button>
            )}

            <div className="border-t border-border pt-4 space-y-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Requester</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary">{request.requesterAvatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{request.requester}</p>
                    <p className="text-xs text-muted-foreground">{request.requesterDept}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Created</p>
                <p className="text-sm font-mono text-foreground mt-0.5">{format(new Date(request.createdAt), 'MMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Requested Date</p>
                <p className="text-sm font-mono text-foreground mt-0.5">{format(new Date(request.requestedDate), 'MMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Target Resolution</p>
                <p className="text-sm font-mono text-foreground mt-0.5">{format(new Date(request.targetDate), 'MMM d, yyyy')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
