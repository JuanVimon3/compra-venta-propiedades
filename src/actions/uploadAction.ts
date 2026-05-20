'use server';

import { Storage } from '@google-cloud/storage';



// Inicializamos el cliente de Google Cloud Storage usando las variables de entorno
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucketName = process.env.GCP_BUCKET_NAME || '';

export async function uploadImageToGCP(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No se encontró ningún archivo en la petición.');
    }

    // Convertimos el archivo a un Buffer para que Node.js lo pueda procesar
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const bucket = storage.bucket(bucketName);
    
    // Creamos un nombre de archivo único usando la fecha actual para evitar colisiones
    const uniqueFileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const gcpFile = bucket.file(uniqueFileName);

    // Subimos el archivo al bucket definiendo su tipo MIME correcto (image/jpeg, image/png, etc.)
    await gcpFile.save(buffer, {
      metadata: { contentType: file.type },
    });

    // Construimos la URL pública estándar para acceder a la imagen
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;

    return { success: true, url: publicUrl };
  } catch (error: unknown) {
    console.error('Error subiendo a GCP:', error);
    return { success: false, error: (error as Error).message || 'Error interno del servidor' };
  }
}