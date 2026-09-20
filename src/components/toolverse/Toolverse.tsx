import { Suspense, useState, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/data/categories';
import { usePerformanceTier } from '@/hooks/usePerformance';
import { Toolverse2D } from './Toolverse2D';
import { Loader2 } from 'lucide-react';

const ToolverseScene = lazy(() => import('./ToolverseScene').then((m) => ({ default: m.ToolverseScene })));

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-primary-400" />
    </div>
  );
}

export function Toolverse() {
  const tier = usePerformanceTier();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const navigate = useNavigate();

  const use3D = tier !== 'low' && !webglFailed;

  if (!use3D) {
    return <Toolverse2D />;
  }

  const handleWorldClick = () => {
    if (hoveredIndex !== null) {
      navigate(`/category/${categories[hoveredIndex].slug}`);
    }
  };

  return (
    <div className="relative w-full">
      {/* 3D Canvas */}
      <div
        className="relative h-[400px] sm:h-[480px] md:h-[520px] w-full"
        onClick={handleWorldClick}
        onError={() => setWebglFailed(true)}
      >
        <ErrorBoundary onError={() => setWebglFailed(true)}>
          <Canvas
            camera={{ position: [0, 2, 8], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: tier === 'high', powerPreference: 'high-performance' }}
            onCreated={({ gl }) => {
              if (!gl.getContext()) setWebglFailed(true);
            }}
          >
            <Suspense fallback={null}>
              <ToolverseScene
                onHover={setHoveredIndex}
                hoveredIndex={hoveredIndex}
                categories={categories}
              />
            </Suspense>
          </Canvas>
        </ErrorBoundary>

        {/* Floating labels */}
        {hoveredIndex !== null && (
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-32">
            <div
              className="rounded-xl border bg-bg-elevated/90 backdrop-blur-sm px-4 py-2 text-center shadow-elevated"
              style={{ borderColor: `${categories[hoveredIndex].color}40` }}
            >
              <p className="text-sm font-bold text-content-primary">{categories[hoveredIndex].name}</p>
              <p className="text-xs text-content-muted">{categories[hoveredIndex].tagline}</p>
            </div>
          </div>
        )}

        {/* Hint */}
        {hoveredIndex === null && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <p className="text-xs text-content-muted animate-pulse-slow">Hover and click a world to explore</p>
          </div>
        )}
      </div>

      {/* Fallback grid below 3D for accessibility */}
      <div className="mt-2 grid grid-cols-4 md:grid-cols-8 gap-2">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/category/${cat.slug}`)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="rounded-lg border border-border-subtle px-2 py-1.5 text-2xs font-medium text-content-muted hover:text-content-primary hover:border-border-default transition-all"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Simple error boundary
import { Component, type ReactNode } from 'react';
class ErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return <LoadingFallback />;
    return this.props.children;
  }
}
