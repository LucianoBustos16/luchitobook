// src/components/TiptapEditor.jsx
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { supabase } from '../lib/supabaseClient';  // Ajusta la ruta según tu estructura

export default function TiptapEditor() {
    const [title, setTitle] = useState(""); // Estado para el título
    const [content, setContent] = useState("<p>Empieza a escribir aquí...</p>");

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // Guarda el contenido en el estado
    },
  });

    const handleSave = async () => {
  if (!title.trim()) {
    alert("¡El título es obligatorio!");
    return;
  }

  try {
    const { data, error } = await supabase
      .from('documentos')
      .insert([{ 
        titulo: title, 
        contenido: content 
      }]);

    if (error) throw error;
    alert("Documento guardado en Supabase!");
  } catch (err) {
    console.error("Error al guardar:", err);
    alert("Error al guardar. Revisa la consola.");
  }
};

  if (!editor) {
    return <div>Cargando editor...</div>;
  }

  return (
    <div className="editor-container">

    <input
            type="text"
            placeholder="Título del documento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
        />

      {/* Toolbar con botones de formato */}
      <div className="toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}
        >
          Negrita
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}
        >
          Cursiva
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
        >
          Título 1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}
        >
          Lista
        </button>
      </div>

      {/* Menú contextual (aparece al seleccionar texto) */}
      {editor && (
        <BubbleMenu editor={editor}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "active" : ""}
          >
            Negrita
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "active" : ""}
          >
            Cursiva
          </button>
        </BubbleMenu>
      )}

      {/* Área de escritura */}
      <EditorContent editor={editor} className="editor-content" />

      {/* Botón de guardar */}
      <button onClick={handleSave} className="save-button">
        Guardar Documento
      </button>
    </div>
  );
}