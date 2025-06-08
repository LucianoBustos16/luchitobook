// src/components/ToasterWrapper.jsx
'use client'; // Indica que es un componente de cliente

import { Toaster } from 'sonner';

export default function ToasterWrapper() {
  return <Toaster position="bottom-right" richColors />;
}