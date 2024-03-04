import Image from 'next/image';
import LogoSquareSVG from './logo-square.svg';

export default function LogoSquare() {
  return (
    <Image
      alt={`${process.env.SITE_NAME} logo`}
      aria-label={`${process.env.SITE_NAME} logo`}
      src={LogoSquareSVG}
    />
  );
}
