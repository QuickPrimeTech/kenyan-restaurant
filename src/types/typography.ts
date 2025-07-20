// types/typography.ts

export type BaseProps<T> = {
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<T>;

export type HeadingProps = BaseProps<HTMLHeadingElement>;
export type ParagraphProps = BaseProps<HTMLParagraphElement>;
export type BlockquoteProps = BaseProps<HTMLQuoteElement>;
export type LargeProps = BaseProps<HTMLDivElement>;
export type SmallProps = BaseProps<HTMLElement>;
export type MutedProps = BaseProps<HTMLParagraphElement>;
