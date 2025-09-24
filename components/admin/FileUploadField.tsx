'use client';

import React, { useState } from 'react';
import { useField } from '@payloadcms/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Check, ExternalLink, Copy } from 'lucide-react';

interface FileUploadFieldProps {
  path: string;
  label?: string;
  required?: boolean;
  description?: string;
  accept?: string;
  uploadEndpoint: string;
  fileTypeLabel?: string;
}

export default function FileUploadField({
  path,
  label,
  required,
  description,
  accept = '*/*',
  uploadEndpoint,
  fileTypeLabel = 'file',
}: FileUploadFieldProps) {
  const { value, setValue } = useField<string>({ path });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}&type=${uploadEndpoint}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      console.log('Upload result:', result);
      
      // Construct the URL from the filename
      const fileUrl = `/api/files/${result.filename}`;
      console.log('Constructed URL:', fileUrl);
      
      setValue(fileUrl);
      console.log('Value set to:', fileUrl);
      setUploadSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      setUploadError(`Failed to upload ${fileTypeLabel}. Please try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  const clearValue = () => {
    setValue('');
    setUploadError(null);
    setUploadSuccess(false);
  };

  const openUrl = () => {
    if (value) {
      window.open(value, '_blank');
    }
  };

  const copyToClipboard = async () => {
    if (value) {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={`file-upload-${path}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
      <div className="flex items-center gap-2">
        <Input
          id={`file-upload-${path}`}
          type="file"
          accept={accept}
          onChange={handleFileUpload}
          disabled={isUploading}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => document.getElementById(`file-upload-${path}`)?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
        </Button>
      </div>

      {value && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700 flex-1 truncate">{value}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-6 w-6 p-0"
              title="Copy URL"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={openUrl}
              className="h-6 w-6 p-0"
              title="Open URL"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearValue}
              className="h-6 w-6 p-0"
              title="Clear"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          {uploadSuccess && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <Check className="h-4 w-4" />
              {fileTypeLabel.charAt(0).toUpperCase() + fileTypeLabel.slice(1)} uploaded successfully!
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md">
          {uploadError}
        </div>
      )}
    </div>
  );
}
