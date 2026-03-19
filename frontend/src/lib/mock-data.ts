export type RequestStatus = 'submitted' | 'under_review' | 'approved' | 'rejected' | 'fulfilled' | 'closed';
export type RequestType = 'system_access' | 'equipment' | 'facility' | 'general_service';
export type Priority = 'low' | 'medium' | 'high';

export interface RequestItem {
  id: string;
  type: RequestType;
  title: string;
  description: string;
  justification: string;
  requester: string;
  requesterDept: string;
  requesterAvatar: string;
  priority: Priority;
  status: RequestStatus;
  createdAt: string;
  requestedDate: string;
  targetDate: string;
  updatedAt: string;
  timeline: TimelineEntry[];
  comments: Comment[];
}

export interface TimelineEntry {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  detail?: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

const names = ['Alice Chen', 'Bob Martinez', 'Carol Johnson', 'David Kim', 'Eva Patel', 'Frank O\'Brien'];
const depts = ['Engineering', 'Marketing', 'Finance', 'HR', 'Operations', 'IT'];

function genId(i: number): string {
  return `REQ-${String(8800 + i).padStart(4, '0')}`;
}

function avatar(name: string) {
  return name.split(' ').map(n => n[0]).join('');
}

const titles: Record<RequestType, string[]> = {
  system_access: ['SAP Production Access', 'AWS Console Read-Only', 'Jira Admin Permissions', 'GitHub Enterprise Seat'],
  equipment: ['MacBook Pro M3 Max', '27" 4K Monitor', 'Standing Desk Converter', 'Ergonomic Chair'],
  facility: ['Meeting Room A Booking', 'Parking Spot Assignment', 'Office Relocation - Floor 3', 'Lab Access Card'],
  general_service: ['Business Card Reprint', 'VPN Configuration', 'Software License Renewal', 'Catering for Team Event'],
};

const statuses: RequestStatus[] = ['submitted', 'under_review', 'approved', 'rejected', 'fulfilled', 'closed'];
const types: RequestType[] = ['system_access', 'equipment', 'facility', 'general_service'];
const priorities: Priority[] = ['low', 'medium', 'high'];

export const mockRequests: RequestItem[] = Array.from({ length: 18 }, (_, i) => {
  const type = types[i % 4];
  const titleOptions = titles[type];
  const name = names[i % names.length];
  const status = statuses[i % 6];
  const created = new Date(2025, 2, 1 + i);

  return {
    id: genId(i),
    type,
    title: titleOptions[i % titleOptions.length],
    description: `Request for ${titleOptions[i % titleOptions.length].toLowerCase()} to support ongoing project deliverables and team productivity improvements.`,
    justification: `This resource is critical for Q2 deliverables. The current setup does not meet the requirements for the upcoming sprint cycle, and this upgrade will significantly improve output quality and team velocity.`,
    requester: name,
    requesterDept: depts[i % depts.length],
    requesterAvatar: avatar(name),
    priority: priorities[i % 3],
    status,
    createdAt: created.toISOString(),
    requestedDate: new Date(created.getTime() + 3 * 86400000).toISOString(),
    targetDate: new Date(created.getTime() + 7 * 86400000).toISOString(),
    updatedAt: new Date(created.getTime() + 2 * 86400000).toISOString(),
    timeline: [
      { id: `t-${i}-1`, action: 'Request submitted', actor: name, timestamp: created.toISOString() },
      ...(status !== 'submitted' ? [{ id: `t-${i}-2`, action: 'Moved to Under Review', actor: 'System', timestamp: new Date(created.getTime() + 86400000).toISOString() }] : []),
      ...(status === 'approved' || status === 'fulfilled' || status === 'closed' ? [{ id: `t-${i}-3`, action: 'Approved', actor: 'David Kim', timestamp: new Date(created.getTime() + 2 * 86400000).toISOString(), detail: 'Budget cleared for this cycle.' }] : []),
      ...(status === 'rejected' ? [{ id: `t-${i}-3`, action: 'Rejected', actor: 'Carol Johnson', timestamp: new Date(created.getTime() + 2 * 86400000).toISOString(), detail: 'Budget constraint. Resubmit next quarter.' }] : []),
      ...(status === 'fulfilled' || status === 'closed' ? [{ id: `t-${i}-4`, action: 'Fulfilled', actor: 'Frank O\'Brien', timestamp: new Date(created.getTime() + 4 * 86400000).toISOString(), detail: 'Item delivered. S/N: SN-29401' }] : []),
      ...(status === 'closed' ? [{ id: `t-${i}-5`, action: 'Closed', actor: name, timestamp: new Date(created.getTime() + 5 * 86400000).toISOString() }] : []),
    ],
    comments: [
      { id: `c-${i}-1`, author: name, avatar: avatar(name), text: 'Please prioritize this — needed for the upcoming sprint.', timestamp: created.toISOString() },
      ...(i % 3 === 0 ? [{ id: `c-${i}-2`, author: 'David Kim', avatar: 'DK', text: 'Noted. I\'ll review this today.', timestamp: new Date(created.getTime() + 86400000).toISOString() }] : []),
    ],
  };
});

export const typeLabels: Record<RequestType, string> = {
  system_access: 'System Access',
  equipment: 'Equipment',
  facility: 'Facility',
  general_service: 'General Service',
};

export const statusLabels: Record<RequestStatus, string> = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
  fulfilled: 'Fulfilled',
  closed: 'Closed',
};

export const priorityLabels: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};
