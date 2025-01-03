"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { JobForm } from '@/components/JobForm'
import { JobList } from '@/components/JobList'
import { TenderForm } from '@/components/TenderForm'
import { Job, Tender } from '@/types/soq'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SOQPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showTenderForm, setShowTenderForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const addJob = (newJob: Job) => {
    setJobs([...jobs, newJob]);
    setShowJobForm(false);
  };

  const updateJob = (updatedJob: Job) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
  };

  const addTender = (newTender: Tender) => {
    setTenders([...tenders, newTender]);
    setShowTenderForm(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Schedule of Quantities (SOQ)</h1>
      <div className="flex space-x-4 items-center">
        <Select onValueChange={(value) => setSelectedProject(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="project1">Project 1</SelectItem>
            <SelectItem value="project2">Project 2</SelectItem>
            <SelectItem value="project3">Project 3</SelectItem>
          </SelectContent>
        </Select>
        {selectedProject && (
          <>
            <Button onClick={() => setShowJobForm(true)}>Create New Job</Button>
            <Button onClick={() => setShowTenderForm(true)}>Create New Tender</Button>
          </>
        )}
      </div>

      {showJobForm && (
        <JobForm
          onSubmit={addJob}
          onCancel={() => setShowJobForm(false)}
          projectId={selectedProject}
        />
      )}

      {showTenderForm && (
        <TenderForm
          onSubmit={addTender}
          onCancel={() => setShowTenderForm(false)}
          jobs={jobs}
          projectId={selectedProject}
        />
      )}

      <JobList jobs={jobs} updateJob={updateJob} />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Tenders</h2>
        {tenders.map(tender => (
          <div key={tender.id} className="mb-4 p-4 border rounded">
            <h3 className="text-lg font-semibold">{tender.name}</h3>
            <p>{tender.description}</p>
            <p>Status: {tender.status}</p>
            <p>Jobs: {tender.jobs.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

