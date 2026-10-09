export default function ResultCard({ result }) {
  if (!result) return null;

  const isApproved = result.verdict === 'APROBADA';

  return (
    <div style={{ 
      marginTop: '24px', 
      padding: '20px', 
      borderRadius: '10px', 
      backgroundColor: isApproved ? '#e6f4ea' : '#fce8e6',
      border: `2px solid ${isApproved ? '#137333' : '#c5221f'}`
    }}>
      <h2 style={{ color: isApproved ? '#137333' : '#c5221f', marginTop: 0 }}>
        Veredicto Final: {result.verdict}
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p><strong>Capa 1 (Filtro Rápido - Autoencoder):</strong> {result.layer1.message}[cite: 3]</p>
        <p><strong>Capa 2 (Filtro Cognitivo - LLM):</strong> {result.layer2.reasoning}[cite: 3]</p>
        {result.layer2.doctorMatricula && (
          <p><strong>Matrícula Profesional:</strong> {result.layer2.doctorMatricula}</p>
        )}
      </div>
    </div>
  );
}