import Image from 'next/image';

export default function Loading({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <div className="flex justify-center items-center">
      <div className={`relative ${className}`}>
        <Image
          src="/loading.svg"
          unoptimized
          priority
          alt="loading"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <span>{title}</span>
    </div>
  );
}
