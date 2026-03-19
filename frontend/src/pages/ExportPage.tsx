import { FileDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockRequests, typeLabels, statusLabels, priorityLabels } from '@/lib/mock-data';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function ExportPage() {
  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Type', 'Requester', 'Department', 'Priority', 'Status', 'Created', 'Target Date'];
    const rows = mockRequests.map(r => [
      r.id, r.title, typeLabels[r.type], r.requester, r.requesterDept,
      priorityLabels[r.priority], statusLabels[r.status],
      format(new Date(r.createdAt), 'yyyy-MM-dd'), format(new Date(r.targetDate), 'yyyy-MM-dd'),
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `requests-export-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  const handleExportPDF = () => {
    toast.info('PDF export would generate a formatted report. For production, integrate a PDF library like jsPDF.');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Export Data</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Download request data for reporting</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-surface rounded-lg border border-border shadow-card p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <FileDown className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Export as CSV</h3>
          <p className="text-xs text-muted-foreground mb-4">Download all requests as a comma-separated file</p>
          <Button className="press-effect gap-2" onClick={handleExportCSV}>
            <FileDown className="h-4 w-4" /> Download CSV
          </Button>
        </div>

        <div className="bg-surface rounded-lg border border-border shadow-card p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Export as PDF</h3>
          <p className="text-xs text-muted-foreground mb-4">Generate a formatted PDF report</p>
          <Button variant="outline" className="press-effect gap-2" onClick={handleExportPDF}>
            <FileText className="h-4 w-4" /> Generate PDF
          </Button>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border shadow-card p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Export Preview</p>
        <p className="text-sm text-muted-foreground">{mockRequests.length} requests will be included in the export</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">ID</th>
                <th className="text-left py-2 px-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Title</th>
                <th className="text-left py-2 px-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockRequests.slice(0, 5).map(r => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="py-2 px-3 font-mono text-muted-foreground">{r.id}</td>
                  <td className="py-2 px-3 text-foreground">{r.title}</td>
                  <td className="py-2 px-3">{statusLabels[r.status]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-2 px-3">...and {mockRequests.length - 5} more</p>
        </div>
      </div>
    </div>
  );
}
