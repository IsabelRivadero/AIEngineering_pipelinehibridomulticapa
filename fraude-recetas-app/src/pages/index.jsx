import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import HeatmapViewer from '../components/HeatmapViewer';
import ResultCard from '../components/ResultCard';

export default function Home() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      alert('Error procesando la receta médica');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#111' }}>Sistema Multicapa de Detección de Fraude[cite: 3]</h1>
        <p style={{ color: '#666' }}>Validación física por Autoencoder (Píxeles) + Validación Cognitiva por LLM[cite: 3]</p>
      </header>

      <FileUploader onFileSelect={handleFileSelect} disabled={loading} />

      {loading && (
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <p>Analizando la receta en las dos capas del pipeline...</p>
        </div>
      )}

      {result && (
        <>
          <ResultCard result={result} />
          <HeatmapViewer 
            originalUrl={previewUrl} 
            heatmapUrl={result.layer1.heatmapUrl}
            errorValue={result.layer1.reconstructionError}
            threshold={result.layer1.threshold}
          />
        </>
      )}
    </div>
  );
}