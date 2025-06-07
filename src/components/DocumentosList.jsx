// src/components/DocumentosList.jsx
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function DocumentosList() {
  const [documentos, setDocumentos] = useState([]);



  useEffect(() => {
    supabase
      .from('documentos')
      .select('*')
      .then(({ data }) => setDocumentos(data));
  }, []);

  
  return (
    <ul>
      {documentos.map((doc) => (
        <li key={doc.id}>
          <h2>{doc.titulo}</h2>
          <div dangerouslySetInnerHTML={{ __html: doc.contenido }} />
        </li>
      ))}
    </ul>
  );
}