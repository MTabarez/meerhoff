import React from 'react';
import { ArrowRight } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'blue' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

type PillButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type PillButtonAsLink = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type PillButtonProps = PillButtonAsButton | PillButtonAsLink;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-[#343448] text-white border border-[#343448] hover:bg-[#232333] hover:border-[#232333] active:bg-[#1A1A28] disabled:opacity-45 disabled:pointer-events-none',
  secondary:
    'bg-white text-[#343448] border border-transparent hover:bg-[#343448] hover:text-white active:bg-[#232333] disabled:opacity-45 disabled:pointer-events-none',
  blue:
    'bg-[#85ADE2] text-[#343448] border border-[#85ADE2] hover:bg-[#343448] hover:border-[#343448] hover:text-white active:bg-[#232333] disabled:opacity-45 disabled:pointer-events-none',
  outline:
    'bg-transparent text-[#343448] border border-[#343448]/65 hover:bg-[#343448] hover:border-[#343448] hover:text-white active:bg-[#232333] disabled:opacity-45 disabled:pointer-events-none',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[12px] min-h-[36px]',
  md: 'px-5 py-2.5 text-[13px] min-h-[42px]',
  lg: 'px-6 py-3 text-[14px] min-h-[46px]',
};

export const PillButton: React.FC<PillButtonProps> = ({
  variant = 'primary',
  size = 'md',
  showArrow = false,
  icon,
  children,
  className = '',
  ...rest
}) => {
  const sharedClass = [
    'group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[-0.01em] whitespace-nowrap shrink-0 cursor-pointer',
    'transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#343448]',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ].join(' ');

  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {showArrow && (
        <ArrowRight
          className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
    </>
  );

  if ('href' in rest && rest.href) {
    const { href, ...anchorProps } = rest;
    return (
      <a href={href} className={sharedClass} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? 'button'} className={sharedClass} {...buttonProps}>
      {content}
    </button>
  );
};
