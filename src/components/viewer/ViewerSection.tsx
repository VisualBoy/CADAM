import Loader from './Loader';
import { OpenSCADViewer } from './OpenSCADViewer';
import { useIsLoading } from '@/services/messageService';

interface ViewerSectionProps {
  scadCode: string | null;
}

export function ViewerSection({ scadCode }: ViewerSectionProps) {
  const isLoading = useIsLoading();

  return (
    <div className="flex h-full w-full items-center justify-center bg-adam-neutral-700">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader message="Generating model" />
        </div>
      ) : (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2">
          <OpenSCADViewer scadCode={scadCode} />
        </div>
      )}
    </div>
  );
}
