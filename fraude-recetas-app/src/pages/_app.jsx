export default function App({ Component, pageProps }) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#fafafa', minHeight: '100vh', padding: '20px' }}>
      <Component {...pageProps} />
    </div>
  );
}