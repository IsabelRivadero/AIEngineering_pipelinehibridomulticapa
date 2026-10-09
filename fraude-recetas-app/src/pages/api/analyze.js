import formidable from 'formidable';
import fs from 'fs';
import { checkPixelAnomaly } from '../../services/autoencoderClient';
import { validateCognitiveData } from '../../services/llmClient';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const form = formidable({});
  
  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(400).json({ message: 'Error al subir la imagen' });
    }

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
    const imageBuffer = fs.readFileSync(uploadedFile.filepath);
    const mimeType = uploadedFile.mimetype || 'image/jpeg';

    try {
      // 1. Ejecutar Capa 1: Filtro Rápido (Autoencoder de Píxeles)[cite: 3]
      const layer1Result = await checkPixelAnomaly(imageBuffer, mimeType);

      // Si la Capa 1 falla por alteración física, se frena inmediatamente por fraude[cite: 3]
      if (!layer1Result.passed) {
        return res.status(200).json({
          verdict: 'RECHAZADA (Sospecha de alteración física)',
          layer1: layer1Result,
          layer2: { reasoning: 'No ejecutada debido al fallo en la Capa 1.' }
        });
      }

      // 2. Ejecutar Capa 2: Filtro Cognitivo (LLM)[cite: 3]
      const layer2Result = await validateCognitiveData(imageBuffer, mimeType);

      const finalVerdict = (layer1Result.passed && layer2Result.passed) 
        ? 'APROBADA' 
        : 'RECHAZADA (Inconsistencia de datos médicos)';

      return res.status(200).json({
        verdict: finalVerdict,
        layer1: layer1Result,
        layer2: layer2Result,
      });

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}