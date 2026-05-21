export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Asegura ejecución pura en el backend


import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';




export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ success: false, error: 'No se encontró ningún archivo.' }, { status: 400 });
    }

    

const rawPrivateKey = process.env.GCP_PRIVATE_KEY;
if (!rawPrivateKey) {
  return NextResponse.json({ success: false, error: 'GCP_PRIVATE_KEY no configurada.' }, { status: 500 });
}


const cleanKey = rawPrivateKey.replace(/^['"]|['"]$/g, '').trim();


let privateKey = '';
if (cleanKey.startsWith('-----BEGIN')) {
  
  privateKey = cleanKey.replace(/\\n/g, '\n');
} else {
  
  const noNewLines = cleanKey.replace(/\s/g, '');
  privateKey = Buffer.from(noNewLines, 'base64').toString('utf-8');
}


if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
  return NextResponse.json({ success: false, error: 'La llave privada no se decodificó correctamente.' }, { status: 500 });
}

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: privateKey,
  },
});


    const bucketName = process.env.GCP_BUCKET_NAME || '';
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const bucket = storage.bucket(bucketName);
    
    const uniqueFileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const gcpFile = bucket.file(uniqueFileName);

    await gcpFile.save(buffer, {
      metadata: { contentType: file.type },
    });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;
    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error: unknown) {
    console.error('Error en API upload:', error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Error desconocido' }, { status: 500 });
  }
}