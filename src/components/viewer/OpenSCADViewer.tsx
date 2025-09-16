import { useOpenSCAD } from '@/hooks/useOpenSCAD';
import { useEffect, useState } from 'react';
import { ThreeScene } from '@/components/viewer/ThreeScene';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { BufferGeometry } from 'three';
import { Loader2, CircleAlert } from 'lucide-react';
import { useBlob } from '@/contexts/BlobContext';

interface OpenSCADViewerProps {
  scadCode: string | null;
}

export function OpenSCADViewer({ scadCode }: OpenSCADViewerProps) {
  const { setBlob } = useBlob();
  const { compileScad, isCompiling, output, isError, error } = useOpenSCAD();
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null);

  useEffect(() => {
    if (scadCode) {
      compileScad(scadCode);
    }
  }, [scadCode, compileScad]);

  useEffect(() => {
    setBlob(output ?? null);
    if (output && output instanceof Blob) {
      output.arrayBuffer().then((buffer) => {
        const loader = new STLLoader();
        const geom = loader.parse(buffer);
        geom.center();
        geom.computeVertexNormals();
        setGeometry(geom);
      });
    } else {
      setGeometry(null);
    }
  }, [output, setBlob]);

  return (
    <div className="h-full w-full bg-adam-neutral-700/50 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out">
      <div className="h-full w-full">
        {geometry ? (
          <div className="h-full w-full">
            <ThreeScene geometry={geometry} />
          </div>
        ) : (
          <>
            {isError && (
              <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-adam-blue/20" />
                    <CircleAlert className="h-8 w-8 text-adam-blue" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-adam-blue">
                      Error Compiling Model
                    </p>
                    <p className="mt-1 text-xs text-adam-text-primary/60">
                      There was an error compiling the OpenSCAD code.
                    </p>
                    <pre className="mt-2 whitespace-pre-wrap rounded-md bg-adam-bg-secondary-dark p-2 text-left text-xs text-red-400">
                      {error?.message}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {isCompiling && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-adam-neutral-700/30 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-adam-blue" />
              <p className="text-xs font-medium text-adam-text-primary/70">
                Compiling...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
