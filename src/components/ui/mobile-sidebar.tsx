import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Sheet, SheetContent, SheetTrigger } from './sheet';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MobileSidebarProps {
  children: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  side?: 'left' | 'right';
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  children,
  className,
  triggerClassName,
  contentClassName,
  side = 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) {
    return (
      <aside className={cn("w-64 bg-card border-l border-border h-[calc(100vh-4rem)] overflow-y-auto", className)}>
        <div className="p-4">
          {children}
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Trigger Button */}
      <div className="md:hidden fixed top-20 right-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "bg-card border-border shadow-lg hover:bg-muted",
                triggerClassName
              )}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side={side} 
            className={cn(
              "w-80 p-0 bg-card border-border",
              contentClassName
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold">القائمة</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
              {children}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar - Hidden on Mobile */}
      <aside className="hidden md:block w-64 bg-card border-l border-border h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-4">
          {children}
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;

