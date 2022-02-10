import Image from "next/image";

export const CustomImage = ({ src, alt, width, height }) => {
  console.log(src);
  return (
    <Image
      src={`${src}`}
      alt={alt}
      width={width || 720}
      height={height || 480}
      layout={"responsive"}
      quality={80}
      loading="eager"
      unoptimized={false}
    />
  );
};
