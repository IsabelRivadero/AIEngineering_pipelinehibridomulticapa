export default function FileUploader({ onFileSelect, disabled }) {
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div style={{ border: '2px dashed #0070f3', padding: '30px', borderRadius: '12px', textAlign: 'center', backgroundColor: '#f0f8ff' }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={disabled}
        id="file-input"
        style={{ display: 'none' }}
      />
      <label htmlFor="file-input" style={{ cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 'bold', color: '#0070f3' }}>
        {disabled ? 'Procesando receta...' : 'Haz clic aquí o arrastra la imagen de la receta médica'}
      </label>
    </div>
  );
}