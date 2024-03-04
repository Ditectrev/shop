import clsx from 'clsx';
import Image from 'next/image';
import LogoSquareSVG from './logo-square.svg';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black',
        {
          'h-[40px] w-[40px] rounded-xl': !size,
          'h-[30px] w-[30px] rounded-lg': size === 'sm'
        }
      )}
    >
      <Image
        alt={`${process.env.SITE_NAME} logo`}
        aria-label={`${process.env.SITE_NAME} logo`}
        src={LogoSquareSVG}
      />
    </div>
  );
}
