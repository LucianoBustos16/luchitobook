// src/components/WYSIWYGEditor.jsx
import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { supabase } from '../lib/supabaseClient';

export default function WYSIWYGEditor() {
  const [titulo, setTitulo] = useState('');
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Empieza a escribir...</p>',
  });

  const guardarDocumento = async () => {
    const { data, error } = await supabase
      .from('documentos')
      .insert([{ 
        titulo: titulo,
        contenido: editor.getHTML() 
      }]);

    if (error) {
      console.error('Error al guardar:', error);
    } else {
      alert('¡Documento guardado!');
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Título del documento" 
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <EditorContent editor={editor} />
      <button onClick={guardarDocumento}>Guardar</button>
    </div>
  );
}