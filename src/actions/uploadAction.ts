'use server';

import { Storage } from '@google-cloud/storage';

export async function uploadImageToGCP(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No se encontró ningún archivo en la petición.');
    }

    // Inicializamos la llave privada JUSTO AQUÍ, dentro de la petición
    const rawPrivateKey = process.env.GCP_PRIVATE_KEY;
    if (!rawPrivateKey) {
      throw new Error('La variable GCP_PRIVATE_KEY no está definida en el entorno.');
    }

    const privateKey = rawPrivateKey.startsWith('-----BEGIN')
      ? rawPrivateKey.replace(/\\n/g, '\n')
      : Buffer.from(rawPrivateKey, 'base64').toString('utf-8');

    // Instanciamos el cliente de Storage bajo demanda
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: privateKey,
      },
    });

    const bucketName = process.env.GCP_BUCKET_NAME || '';
    if (!bucketName) {
      throw new Error('La variable GCP_BUCKET_NAME no está definida.');
    }

    // Procesamiento del buffer de la imagen
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const bucket = storage.bucket(bucketName);
    
    // Creamos un nombre de archivo único
    const uniqueFileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const gcpFile = bucket.file(uniqueFileName);

    // Subimos el archivo al bucket
    await gcpFile.save(buffer, {
      metadata: { contentType: file.type },
    });

    // Construimos la URL pública estándar
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;

    return { success: true, url: publicUrl };
  } catch (error: unknown) {
    console.error('Error subiendo a GCP en el servidor:', error);
    return { success: false, error: (error as Error).message || 'Error interno del servidor' };
  }
}