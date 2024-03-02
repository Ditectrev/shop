import Image from 'next/image';
import Logo from './logo.svg';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <Image
      src={Logo}
      aria-label={`${process.env.SITE_NAME} logo`}
      {...props}
    />
  );
}
