import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Job, Tender } from '@/types/soq'

interface TenderFormProps {
  onSubmit: (tender: any) => void;
  onCancel: () => void;
  jobs: any[];
}

export function TenderForm({ onSubmit, onCancel, jobs }: TenderFormProps) {
  const [tenderName, setTenderName] = useState('');
  const [tenderDescription, setTenderDescription] = useState('');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<'public' | 'private'>('private');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Date.now().toString(),
      name: tenderName,
      description: tenderDescription,
      jobs: selectedJobs,
      status: 'draft',
      privacy: privacy,
      startTime: startTime,
      endTime: endTime
    });
  };

  const handleJobToggle = (jobId: string) => {
    setSelectedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Tender</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tenderName" className="block text-sm font-medium text-gray-700">Tender Name</label>
            <Input
              id="tenderName"
              value={tenderName}
              onChange={(e) => setTenderName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="privacy" className="block text-sm font-medium text-gray-700">Privacy</label>
            <Select onValueChange={(value) => setPrivacy(value as 'public' | 'private')}>
              <SelectTrigger id="privacy">
                <SelectValue placeholder="Select privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
            <div className="relative">
              <Input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <Button
                type="button"
                className="absolute right-0 top-0 px-3 py-2"
                onClick={() => {
                  const input = document.getElementById('startTime') as HTMLInputElement;
                  input.blur();
                }}
              >
                Done
              </Button>
            </div>
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
            <Input
              id="endTime"
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="tenderDescription" className="block text-sm font-medium text-gray-700">Tender Description</label>
            <Textarea
              id="tenderDescription"
              value={tenderDescription}
              onChange={(e) => setTenderDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Jobs</label>
            <div className="space-y-2">
              {jobs.map(job => (
                <div key={job.id} className="flex items-center">
                  <Checkbox
                    id={`job-${job.id}`}
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={() => handleJobToggle(job.id)}
                  />
                  <label htmlFor={`job-${job.id}`} className="ml-2 text-sm">{job.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Create Tender</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

