import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // o usa <a href> si no usas router

export default function DocumentosList() {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    supabase
      .from('documentos')
      .select('*')
      .order('creado_en', { ascending: false }) // opcional: orden por fecha
      .then(({ data }) => setDocumentos(data));
  }, []);

  return (
    <ul>
      {documentos.map((doc) => (
        <li key={doc.id}>
          <a href={`/documentos/${doc.id}`}>
            <h2>{doc.titulo}</h2>
            <p>{new Date(doc.creado_en).toLocaleDateString()}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
