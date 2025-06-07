import { Image } from 'lucide-react';
import { supabase } from '../lib/supabaseClient'

function ImageUploadButton({ editor }) {
  const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error('❌ Error uploading image:', error.message);
    return;
  }

  // Obtener URL pública
  const { data: publicData } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  const publicUrl = publicData?.publicUrl;

  if (publicUrl) {
    editor.chain().focus().setImage({ src: publicUrl }).run();
  }
};


  return (
    <div className="image-upload-button">
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      <button
      className='h-full'
        aria-label="Subir imagen"
        onClick={() => document.getElementById('image-upload').click()}
      >
        <Image size={18} />
      </button>
    </div>
  );
}

export default ImageUploadButton;
