import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import { Facehash } from "facehash";

interface Props extends HTMLAttributes<HTMLPictureElement> {
  src: string;
  alt: string;
}

interface ProfileImageProps {
  className?: string;
  src?: string | null;
  alt: string;
  size?: number;
  border?: boolean;
  radius?: number;
}

const Image = ({ src, alt, ...rest }: Props) => {
  return (
    <picture
      draggable={false}
      className={cn("w-full h-full object-cover object-center", rest.className)}
    >
      <source srcSet={src} type="image/png" />
      <source srcSet={src} type="image/jpeg" />
      <img
        draggable={false}
        className="w-full h-full object-cover object-center text-xs"
        {...rest}
        alt={alt}
        fetchPriority="high"
        decoding="async"
        loading="lazy"
      />
    </picture>
  );
};

const ProfileImage = ({ className, src, alt }: ProfileImageProps) => {
  if (src && alt)
    return (
      <Image
        className={cn("w-8 h-8 rounded-[6px] object-cover", className)}
        src={src}
        alt={alt}
      />
    );
  else
    return (
      <Facehash
        name={alt}
        variant="solid"
        colors={["#ef4444", "#f97316", "#84cc16", "#8b5cf6"]}
      />
    );
};

export default Image;
export { ProfileImage };
