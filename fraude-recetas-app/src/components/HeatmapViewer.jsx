export default function HeatmapViewer({ originalUrl, heatmapUrl, errorValue, threshold }) {
  return (
    <div style={{ marginTop: '20px', border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px' }}>
      <h4>Análisis de Píxeles - Capa 1 (Autoencoder)[cite: 3]</h4>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Error de reconstrucción (MSE): <strong>{errorValue ?? 'N/A'}</strong> (Umbral de alerta: {threshold})
      </p>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '10px', flexWrap: 'wrap' }}>
        {originalUrl && (
          <div>
            <p style={{ fontSize: '12px', textAlign: 'center' }}>Receta Original</p>
            <img src={originalUrl} alt="Original" style={{ width: '220px', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
        )}
        {heatmapUrl && (
          <div>
            <p style={{ fontSize: '12px', textAlign: 'center' }}>Mapa de Calor de Anomalias</p>
            <img src={heatmapUrl} alt="Mapa de calor" style={{ width: '220px', borderRadius: '6px', border: '1px solid #ddd' }} />
          </div>
        )}
      </div>
    </div>
  );
}