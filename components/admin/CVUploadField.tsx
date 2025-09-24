'use client';

import React from 'react';
import FileUploadField from './FileUploadField';

interface CVUploadFieldProps {
  path: string;
  label?: string;
  required?: boolean;
  description?: string;
}

export default function CVUploadField({
  path,
  label,
  required,
  description,
}: CVUploadFieldProps) {
  return (
    <FileUploadField
      path={path}
      label={label}
      required={required}
      description={description}
      accept=".pdf"
      uploadEndpoint="cv"
      fileTypeLabel="CV"
    />
  );
}