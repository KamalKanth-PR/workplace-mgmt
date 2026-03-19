import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface CreateRequestSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateRequestSheet({ open, onOpenChange }: CreateRequestSheetProps) {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [justification, setJustification] = useState('');
  const [priority, setPriority] = useState('');
  const [requestedDate, setRequestedDate] = useState('');

  const reqId = `REQ-${Math.floor(8900 + Math.random() * 100)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !title || !priority) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success(`Request ${reqId} created successfully`);
    onOpenChange(false);
    setType('');
    setTitle('');
    setJustification('');
    setPriority('');
    setRequestedDate('');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto bg-surface">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-lg font-semibold tracking-tight">New Request</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Auto-generated ID: <span className="font-mono text-xs">{reqId}</span>
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Request Type *</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system_access">System Access</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="facility">Facility</SelectItem>
                <SelectItem value="general_service">General Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Short Description *</Label>
            <Input className="h-10" placeholder="e.g. MacBook Pro M3 Max" value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Detailed Justification</Label>
            <Textarea placeholder="Explain why this resource is needed..." rows={4} value={justification} onChange={e => setJustification(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Priority *</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Requested Date</Label>
            <Input type="date" className="h-10" value={requestedDate} onChange={e => setRequestedDate(e.target.value)} />
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="submit" className="flex-1 press-effect">Submit Request</Button>
            <Button type="button" variant="outline" className="press-effect" onClick={() => onOpenChange(false)}>Cancel</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
