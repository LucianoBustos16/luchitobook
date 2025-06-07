import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState, useEffect } from "react"
import { supabase } from '../lib/supabaseClient'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

import ImageUploadButton from './ImageUploadButton.jsx'; // Asegúrate de que este componente esté correctamente importado

import {
  Bold, Italic, List, ListOrdered, AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react';


export default function TiptapEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedHeading, setSelectedHeading] = useState('p');

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
      placeholder: 'Empieza a escribir aquí...',
      emptyEditorClass: 'is-editor-empty'
    }),
      Image.configure({
        inline: true,  // Permite imágenes en línea
        allowBase64: true,  // Soporta imágenes en base64
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'], // Aplica a estos nodos
        alignments: ['left', 'center', 'right', 'justify'], // Habilitar estas opciones
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: '', // vacío si quieres que se vea el placeholder,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Sube a Supabase Storage
  const { data, error } = await supabase.storage
    .from('nombre-del-bucket')
    .upload(`images/${file.name}`, file);

  if (error) {
    console.error('Error al subir:', error);
    return;
  }

  // Obtén URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('nombre-del-bucket')
    .getPublicUrl(data.path);

  // Inserta la imagen en el editor
  editor.chain().focus()
    .setImage({ src: publicUrl })
    .run();
};

  // Efecto para actualizar el select según el formato actual
  useEffect(() => {
    if (!editor) return;

    const updateHeadingSelect = () => {
      if (editor.isActive('paragraph')) {
        setSelectedHeading('p');
      } else {
        for (let level = 1; level <= 6; level++) {
          if (editor.isActive('heading', { level })) {
            setSelectedHeading(`h${level}`);
            break;
          }
        }
      }
    };

    editor.on('selectionUpdate', updateHeadingSelect);
    editor.on('transaction', updateHeadingSelect);

    return () => {
      editor.off('selectionUpdate', updateHeadingSelect);
      editor.off('transaction', updateHeadingSelect);
    };
  }, [editor]);

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

  const handleHeadingChange = (event) => {
    const value = event.target.value;
    setSelectedHeading(value);

    if (value === 'p') {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value.replace('h', ''));
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  if (!editor) {
    return <div>Cargando editor...</div>;
  }

  return (
    <div className="editor-container">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />

      {/* Toolbar mejorado */}
      <div className="toolbar">

      <form>
        <select
          id="countries"
          value={selectedHeading}
          onChange={handleHeadingChange}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="p">Párrafo</option>
          <option value="h1">Título 1</option>
          <option value="h2">Título 2</option>
          <option value="h3">Título 3</option>
          <option value="h4">Título 4</option>
          <option value="h5">Título 5</option>
          <option value="h6">Título 6</option>
        </select>
      </form>


        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}
        >
          <Bold className="icon" size={20} /> {/* Tamaño personalizable */}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}
        >
          <Italic className="icon" size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}
        >
          <List className="icon" size={20} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "active" : ""}
        >
          <ListOrdered className="icon" size={20} />
        </button>

        {/* Botones de alineación */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'active' : ''}
          aria-label="Alinear izquierda"
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'active' : ''}
          aria-label="Centrar"
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'active' : ''}
          aria-label="Alinear derecha"
        >
          <AlignRight size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'active' : ''}
          aria-label="Justificar"
        >
          <AlignJustify size={18} />
        </button>

        <ImageUploadButton editor={editor} />



        {/* Botones de tablas */}
        <button
          onClick={() => editor.chain().focus().insertTable({ rows: 2, cols: 3 }).run()}
          disabled={!editor.can().insertTable({ rows: 2, cols: 3 })}
        >
          Insertar Tabla
        </button>
        <button
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
        >
          Borrar Tabla
        </button>
      </div>

      {/* Bubble Menu */}
      {/* {editor && (
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
      )} */}

      <EditorContent editor={editor} className="editor-content" />

      <button onClick={handleSave} className="save-button">
        Guardar Documento
      </button>
    </div>
  );
}