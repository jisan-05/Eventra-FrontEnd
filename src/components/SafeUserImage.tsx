"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DEFAULT_AVATAR_SRC, getSafeAvatarSrc } from "@/lib/safe-image-src";

type Props = {
  src: string | null | undefined;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export default function SafeUserImage({ src, alt, width, height, className, priority }: Props) {
  const [displaySrc, setDisplaySrc] = useState(() => getSafeAvatarSrc(src));

  useEffect(() => {
    setDisplaySrc(getSafeAvatarSrc(src));
  }, [src]);

  return (
    <Image
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={displaySrc.startsWith("http://")}
      onError={() => setDisplaySrc(DEFAULT_AVATAR_SRC)}
    />
  );
}
