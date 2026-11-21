export const DESIGN_TOKENS = {
  colors: {
    warmIvory: '#F4F0E8',
    deepNavy: '#343448',
    deepNavyHover: '#252536',
    softBlue: '#85ADE2',
    softBlueHover: '#6E9BD6',
    pureWhite: '#FFFFFF',
    secondaryGray: '#D9D7D2',
    mutedText: '#777783',
  },
  typography: {
    fontFamily: "'Manrope', Arial, sans-serif",
    scale: {
      displayXL: 'text-[48px] sm:text-[68px] lg:text-[96px] xl:text-[108px] leading-[0.92] tracking-[-0.03em] font-normal',
      displayL: 'text-[40px] sm:text-[56px] lg:text-[74px] xl:text-[84px] leading-[0.95] tracking-[-0.03em] font-normal',
      h1: 'text-[38px] sm:text-[48px] lg:text-[64px] xl:text-[72px] leading-[0.98] tracking-[-0.025em] font-normal',
      h2: 'text-[32px] sm:text-[42px] lg:text-[52px] leading-[1.04] tracking-[-0.025em] font-normal',
      h3: 'text-[26px] sm:text-[32px] lg:text-[38px] leading-[1.12] tracking-[-0.02em] font-normal',
      h4: 'text-[20px] sm:text-[23px] lg:text-[26px] leading-[1.2] tracking-[-0.015em] font-normal',
      bodyLarge: 'text-[16px] sm:text-[18px] leading-[1.55] font-normal',
      body: 'text-[14px] sm:text-[15px] leading-[1.6] font-normal',
      label: 'text-[11px] sm:text-[12px] leading-[1.3] tracking-[0.01em] font-medium',
      micro: 'text-[10px] leading-[1.3] tracking-[0.02em] font-normal',
    },
  },
  spacing: {
    containerPadding: 'px-4 sm:px-6 lg:px-10',
    sectionY: 'py-20 sm:py-24 lg:py-32',
    maxWidth: 'max-w-[1440px] mx-auto',
  },
  radii: {
    media: 'rounded-none',
    surface: 'rounded-none',
    pill: 'rounded-full',
  },
  transitions: {
    ui: 'transition-all duration-300 ease-out',
    media: 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
  },
} as const;
