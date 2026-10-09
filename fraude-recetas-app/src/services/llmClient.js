import OpenAI from 'openai';

export async function validateCognitiveData(imageBuffer, mimeType) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === 'tu_openai_api_key_aqui') {
    return {
      passed: true,
      doctorMatricula: '12345 (Simulada)',
      diagnosis: 'Tratamiento simulado',
      reasoning: 'Capa 2 (Simulada): Matrícula válida en registro y coherencia médica confirmada.',
    };
  }

  const openai = new OpenAI({ apiKey });
  const base64Image = imageBuffer.toString('base64');

  const prompt = `Analiza esta receta médica. Extrae los siguientes datos en formato JSON estricto:
  {
    "doctor_matricula": "Número de matrícula del médico o 'NO_DETECTADO'",
    "doctor_nombre": "Nombre del médico o 'NO_DETECTADO'",
    "medicamento": "Medicamento o tratamiento recetado",
    "diagnostico": "Diagnóstico indicado o presunto",
    "coherencia_tratamiento": true/false (¿El medicamento coincide médicamente con el diagnóstico?),
    "es_valida": true/false,
    "observaciones": "Breve explicación del análisis cognitivo"
  }`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      response_format: { type: 'json_object' },
    });

    const parsed = JSON.parse(response.choices[0].message.content);
    return {
      passed: parsed.es_valida && parsed.coherencia_tratamiento,
      doctorMatricula: parsed.doctor_matricula,
      diagnosis: parsed.diagnostico,
      reasoning: parsed.observaciones,
    };
  } catch (error) {
    console.error('Error en Capa 2 (LLM):', error);
    throw new Error('Fallo en el análisis cognitivo de la receta.');
  }
}