'use client';

import React from 'react';
import FileUploadField from './FileUploadField';

interface PhotoUploadFieldProps {
  path: string;
  label?: string;
  required?: boolean;
  description?: string;
}

export default function PhotoUploadField({
  path,
  label,
  required,
  description,
}: PhotoUploadFieldProps) {
  return (
    <FileUploadField
      path={path}
      label={label}
      required={required}
      description={description}
      accept="image/*"
      uploadEndpoint="photo"
      fileTypeLabel="photo"
    />
  );
}