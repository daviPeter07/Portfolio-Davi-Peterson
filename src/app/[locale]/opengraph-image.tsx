import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const alt = 'Davi Peterson - Software Developer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  // Read the local photo
  const photoPath = path.join(process.cwd(), 'public', 'meProfessional.jpg');
  let photoBase64 = '';
  try {
    const photoBuffer = fs.readFileSync(photoPath);
    photoBase64 = `data:image/jpeg;base64,${photoBuffer.toString('base64')}`;
  } catch (e) {
    console.error('Failed to read image', e);
  }

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050505', // Fundo preto puro
        fontFamily: 'sans-serif',
        color: 'white',
        padding: '40px',
      }}
    >
      {/* Background Decorative Elements (Orange Glow) */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -150,
          right: -100,
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(234,88,12,0.15) 0%, rgba(0,0,0,0) 60%)',
          borderRadius: '50%',
        }}
      />

      {/* Left Side: Photo */}
      <div
        style={{
          display: 'flex',
          width: '40%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {photoBase64 && (
          <img
            src={photoBase64}
            alt="Davi Peterson"
            style={{
              width: '400px',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '24px',
              border: '4px solid #f97316', // Laranja
              boxShadow: '0 20px 50px rgba(249,115,22,0.3)',
            }}
          />
        )}
      </div>

      {/* Right Side: Text */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '60%',
          paddingLeft: '40px',
          justifyContent: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '80px',
            fontWeight: '900',
            margin: '0 0 10px 0',
            color: '#ffffff',
            letterSpacing: '-2px',
          }}
        >
          Davi Peterson
        </h1>
        <h2
          style={{
            fontSize: '40px',
            fontWeight: '600',
            margin: '0 0 30px 0',
            color: '#f97316', // Laranja
            letterSpacing: '-1px',
          }}
        >
          Junior Full Stack Developer
        </h2>
        <p
          style={{
            fontSize: '32px',
            color: '#a1a1aa', // Cinza claro
            margin: '0 0 40px 0',
            lineHeight: 1.4,
            maxWidth: '90%',
          }}
        >
          Criando soluções digitais robustas, modernas e escaláveis com foco em alta performance.
        </p>

        {/* Tech Badges (Laranjas com texto preto) */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000000',
              backgroundColor: '#f97316',
              padding: '12px 28px',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(249,115,22,0.4)',
            }}
          >
            Frontend & UI
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000000',
              backgroundColor: '#f97316',
              padding: '12px 28px',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(249,115,22,0.4)',
            }}
          >
            Backend & APIs
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000000',
              backgroundColor: '#f97316',
              padding: '12px 28px',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(249,115,22,0.4)',
            }}
          >
            Cloud & Infra
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#000000',
              backgroundColor: '#f97316',
              padding: '12px 28px',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(249,115,22,0.4)',
            }}
          >
            Inteligência Artificial
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
