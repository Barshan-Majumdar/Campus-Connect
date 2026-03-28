import { useRef, type ReactNode, type ButtonHTMLAttributes } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '../../lib/utils';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const AnimatedButton = ({
  children,
  className,
  variant = 'primary',
  ...props
}: AnimatedButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(textRef.current, {
        y: -2,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
      gsap.to(textRef.current, {
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20 shadow-lg",
    secondary: "bg-slate-800 text-white hover:bg-slate-700",
    outline: "border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500"
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative px-6 py-3 rounded-full font-medium transition-colors will-change-transform flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      <span ref={textRef} className="block relative z-10 pointer-events-none">
        {children}
      </span>
    </button>
  );
};
