import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';

function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ تم تثبيت التطبيق');
        } else {
          console.log('❌ المستخدم رفض التثبيت');
        }
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };

  return (
    isVisible && (
      <Button
        onClick={handleInstallClick}
        variant="educational"
        size="sm"
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        📲 تثبيت التطبيق
      </Button>
    )
  );
}

export default InstallAppButton;