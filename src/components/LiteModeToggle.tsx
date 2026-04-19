import { Zap, ZapOff } from 'lucide-react';
import { useSceneStore } from '@/stores/sceneStore';

const LiteModeToggle = () => {
  const isLiteMode = useSceneStore((s) => s.isLiteMode);
  const setLiteMode = useSceneStore((s) => s.setLiteMode);

  return (
    <button
      onClick={() => setLiteMode(!isLiteMode)}
      title={isLiteMode ? 'Enable 3D mode' : 'Enable lite mode (accessibility)'}
      aria-label={isLiteMode ? 'Enable 3D mode' : 'Enable lite mode'}
      className="fixed bottom-5 left-5 z-50 p-2.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 group"
    >
      {isLiteMode ? (
        <ZapOff className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      ) : (
        <Zap className="w-4 h-4 text-primary" />
      )}
    </button>
  );
};

export default LiteModeToggle;
