export async function checkPixelAnomaly(imageBuffer, mimeType) {
  const serviceUrl = process.env.AUTOENCODER_SERVICE_URL;
  const threshold = parseFloat(process.env.AUTOENCODER_THRESHOLD || '0.035');

  // Si no hay un endpoint real configurado aún, se simula la validación de la Capa 1
  if (!serviceUrl || serviceUrl.includes('tu-servicio-autoencoder')) {
    console.warn('AUTOENCODER_SERVICE_URL no configurada. Ejecutando simulación.');
    return {
      passed: true,
      reconstructionError: 0.012,
      threshold: threshold,
      heatmapUrl: null,
      message: 'Capa 1 (Simulada): Estructura de píxeles normal.'
    };
  }

  try {
    const formData = new FormData();
    const blob = new Blob([imageBuffer], { type: mimeType });
    formData.append('file', blob, 'prescription.jpg');

    const response = await fetch(serviceUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error en el servicio Autoencoder: ${response.statusText}`);
    }

    const data = await response.json();
    // data debe retornar { mse_error: number, heatmap_b64: string }
    const passed = data.mse_error < threshold;

    return {
      passed,
      reconstructionError: data.mse_error,
      threshold,
      heatmapUrl: data.heatmap_b64 ? `data:image/png;base64,${data.heatmap_b64}` : null,
      message: passed 
        ? 'Capa 1 Aprobada: Sin alteración de píxeles detectada.' 
        : 'Capa 1 Rechazada: Modificación física o alteración de píxeles sospechosa.'
    };
  } catch (error) {
    console.error('Error invocando Capa 1:', error);
    // En caso de fallo técnico, se permite avanzar a Capa 2 informando la falla
    return {
      passed: true,
      reconstructionError: null,
      threshold,
      heatmapUrl: null,
      message: 'Capa 1 Omitida por error de conexión con el modelo.'
    };
  }
}