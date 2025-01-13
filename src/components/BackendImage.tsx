import clsx from "clsx";

export const getBackendImageUrl = ({
  src,
  width,
  height = undefined,
  fit = undefined,
  quality = "85",
}: {
  src: string | { source: string; image: string };
  width: string;
  height?: string;
  fit?: string;
  quality?: string;
}) => {
  if (typeof src === "object") {
    src = `${src.source}/${src.image}`;
  }

  const srcLastQ = String(src).lastIndexOf("?");
  const srcQuery = String(src).substring(srcLastQ);
  const params = new URLSearchParams(srcQuery);

  if (width) {
    params.append("w", width);
  }

  if (height) {
    params.append("h", height);
  }

  if (fit) {
    params.append("fit", fit);
  }

  if (quality) {
    params.append("q", quality);
  }

  const newSrc = String(src).substring(0, srcLastQ > -1 ? srcLastQ : undefined);

  return `https://tvguide.vg.no/backend/api/images/${newSrc}?${params.toString()}`;
};

export function BackendImage({
  source,
  alt = "",
  quality = "85",
  className = undefined,
  width = "1000",
  ...props
}: {
  source?: { source: string; image: string };
  alt?: string;
  quality?: string;
  className?: string;
  [key: string]: unknown;
  width?: string;
}) {
  if (!source || !source.image) {
    return null;
  }
  if (source.image?.startsWith("https://cdn.images.simply.tv/")) {
    source.image = source.image.replace(/.*\/([0-9]+)$/, "$1");
  }

  return (
    <img
      src={getBackendImageUrl({ src: source, quality, width })}
      alt={alt}
      className={clsx("object-contain", className)}
      {...props}
    />
  );
}
