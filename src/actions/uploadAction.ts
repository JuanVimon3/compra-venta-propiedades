'use server';

import { Storage } from '@google-cloud/storage';

export async function uploadImageToGCP(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No se encontró ningún archivo en la petición.');
    }

    const rawPrivateKey = process.env.GCP_PRIVATE_KEY;
    
    // CASO DE PRUEBA 1: ¿La variable de entorno si existe en Vercel?
    if (!rawPrivateKey) {
      return { 
        success: false, 
        error: "DEBUG: GCP_PRIVATE_KEY no está llegando al servidor. Revisa los Env Variables de Vercel." 
      };
    }

    // Procesamos la llave según el formato que venga
    const privateKey = rawPrivateKey.startsWith('-----BEGIN')
      ? rawPrivateKey.replace(/\\n/g, '\n')
      : Buffer.from(rawPrivateKey, 'base64').toString('utf-8');

    // CASO DE PRUEBA 2: Inspeccionar cómo se ve la llave procesada antes de dársela a Google
    // Evaluamos longitud y si tiene la cabecera correcta para descartar problemas de formato
    if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
      return {
        success: false,
        error: `DEBUG: Estructura de llave inválida tras procesar. Longitud: ${privateKey.length}. Empieza con: ${privateKey.substring(0, 20)}...`
      };
    }

    // Instanciamos el cliente bajo demanda
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: privateKey,
      },
    });

    const bucketName = process.env.GCP_BUCKET_NAME || '';
    if (!bucketName) {
      return { success: false, error: "DEBUG: GCP_BUCKET_NAME está vacío." };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const bucket = storage.bucket(bucketName);
    
    const uniqueFileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const gcpFile = bucket.file(uniqueFileName);

    await gcpFile.save(buffer, {
      metadata: { contentType: file.type },
    });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;
    return { success: true, url: publicUrl };

  } catch (error: unknown) {
    // CAPTURA CRÍTICA: Retornamos el mensaje detallado exacto del error criptográfico nativo hacia el frontend
    return { 
      success: false, 
      error: `DEBUG SERVER ERROR: ${error instanceof Error ? error.message : 'Error sin mensaje'} | Stack: ${error instanceof Error && error.stack ? error.stack.substring(0, 150) : 'Sin stack trace'}`}
  }
}