import Image from 'next/image';
import Logo from './logo.svg';

export default function LogoIcon() {
  return (
    <Image
      alt={`${process.env.SITE_NAME} logo`}
      aria-label={`${process.env.SITE_NAME} logo`}
      src={Logo}
    />
  );
}
