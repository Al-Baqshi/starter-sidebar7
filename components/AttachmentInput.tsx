"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Plus, Trash2 } from 'lucide-react';

interface AttachmentInputProps {
  onUpload: (files: FileList | null) => void;
}

export function AttachmentInput({ onUpload }: AttachmentInputProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
      onUpload(files); // Call the onUpload callback with the selected files
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    onUpload(updatedFiles.length > 0 ? { length: updatedFiles.length, item: (i: number) => updatedFiles[i] } as FileList : null); // Call onUpload with null if no files are selected
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="attachments">Attachments</Label>
      <div className="flex items-center">
        <Input
          type="file"
          id="attachments"
          multiple
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="ml-2"
          onClick={() => {
            (document.getElementById("attachments") as HTMLInputElement).value = ""; // Clear the file input
            setSelectedFiles([]); // Clear the selected files
            onUpload(null); // Call onUpload with null to clear the attachments
          }}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Clear
        </Button>
      </div>
      {selectedFiles.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-medium">Selected Files:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveFile(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

