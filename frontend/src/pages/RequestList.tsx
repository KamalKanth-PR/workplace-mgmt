import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/StatusBadge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { CreateRequestSheet } from '@/components/CreateRequestSheet';
import { mockRequests, typeLabels, statusLabels, type RequestStatus, type RequestType, type Priority } from '@/lib/mock-data';
import { format } from 'date-fns';

export default function RequestList() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const navigate = useNavigate();

  const filtered = mockRequests.filter(r => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && r.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">All Requests</h1>
        <Button className="press-effect gap-2" onClick={() => setSheetOpen(true)}>
          <Plus className="h-4 w-4" /> New Request
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9 h-10" placeholder="Search by ID or title..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[160px] h-10"><SelectValue placeholder="All Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {(Object.keys(typeLabels) as RequestType[]).map(t => (
              <SelectItem key={t} value={t}>{typeLabels[t]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] h-10"><SelectValue placeholder="All Statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {(Object.keys(statusLabels) as RequestStatus[]).map(s => (
              <SelectItem key={s} value={s}>{statusLabels[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[140px] h-10"><SelectValue placeholder="All Priorities" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-lg border border-border shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {['ID', 'Title', 'Type', 'Requester', 'Created', 'Priority', 'Status'].map(h => (
                <th key={h} className="text-left py-3 px-5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(req => (
              <tr
                key={req.id}
                className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors cursor-pointer"
                onClick={() => navigate(`/requests/${req.id}`)}
              >
                <td className="py-3 px-5 font-mono text-xs text-muted-foreground whitespace-nowrap">{req.id}</td>
                <td className="py-3 px-5 font-medium text-foreground max-w-[250px] truncate">{req.title}</td>
                <td className="py-3 px-5 text-xs text-muted-foreground">{typeLabels[req.type]}</td>
                <td className="py-3 px-5 text-xs text-foreground">{req.requester}</td>
                <td className="py-3 px-5 font-mono text-xs text-muted-foreground">{format(new Date(req.createdAt), 'MMM d, yyyy')}</td>
                <td className="py-3 px-5"><PriorityBadge priority={req.priority} /></td>
                <td className="py-3 px-5"><StatusBadge status={req.status} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="py-12 text-center text-sm text-muted-foreground">No requests found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <CreateRequestSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
