import images from "@/content/responsive-images.generated.json";

type ImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

const imageManifest: Record<string, {
  width: number;
  height: number;
  variants: { src: string; width: number }[];
} | undefined> = images;

export function ResponsiveImage({ src, alt, sizes, className }: ImageProps) {
  const image = imageManifest[src];
  if (!image) throw new Error(`Missing responsive image configuration: ${src}`);

  const srcSet = image.variants.length
    ? [...image.variants, { src, width: image.width }].map((variant) => `${variant.src} ${variant.width}w`).join(", ")
    : undefined;

  // Static export serves precomputed files with their actual widths.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} width={image.width} height={image.height} srcSet={srcSet} sizes={srcSet ? sizes : undefined} loading="lazy" decoding="async" />;
}
