import LinesPattern from '@/IconsSVG/LinesPattern';
import { EditionsDocument } from '@/graphql/generated';
import { request } from '@/lib/request';
import toRoman from '../UI/NumberToRoman';
import MainTitle from '../MainTitle/MainTitle';
import Arrow from '@/IconsSVG/Arrow';
import Button from '../UI/Button';
import Calendar from '@/IconsSVG/Calendar';
import Location from '../Location/Location';

const EditionHero = async ({
  locale,
  edition,
  isMain,
  translation,
}: {
  locale: string;
  edition?: string | null;
  isMain?: boolean;
  translation: (key: string) => string;
}) => {
  const t = translation;

  const results = await request(EditionsDocument, {
    locale,
    edition,
  });

  const eventDate = new Date(results.event?.date ?? '');
  const formattedDate = `${eventDate.getDate().toString().padStart(2, '0')}.${(
    eventDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${eventDate.getFullYear()}`;

  return (
    <div
      className={`${
        isMain ? '' : ' pt-20 lg:pt-24'
      }  pb-[60px] w-full px-4 lg:px-[100px] flex flex-col items-center justify-center bg-main-yellow relative`}
    >
      <div
        className={`${
          isMain ? 'top-0' : 'mt-[4px] top-24'
        } self-end hidden lg:inline  absolute right-0`}
      >
        <LinesPattern fill="#0C0C0C" />
      </div>
      <h1 className=" self-start text-[40px] lg:text-[64px] lg:leading-[83px] leading-[52px] font-semibold mb-10 lg:mt-[60px]">
        events
      </h1>
      {results.event?.new ? (
        <h2 className="self-start text-lg font-normal lg:text-2xl lg:font-semibold">
          {t('invite')} {toRoman(parseInt(results.event?.edition ?? ''))}{' '}
          {t('edition')} {t('Event')}:
        </h2>
      ) : (
        <h2 className="self-start text-lg font-normal lg:text-2xl lg:font-semibold">
          {toRoman(parseInt(results.event?.edition ?? ''))} {t('Edition')}
        </h2>
      )}
      <MainTitle fill="#0C0C0C" />
      <h2 className="font-semibold text-[40px] leading-[52px] lg:text-[64px] lg:leading-[83px]  text-center">
        {results.event?.title}
      </h2>
      <Arrow />
      {results.event?.new ? (
        <div className="mt-5">
          <Button
            target="_blank"
            href={results.event?.sign ?? '#'}
            content={t('sign')}
            buttonColor="text-main-white"
            backgroundColor="bg-main-black"
            buttonHover="#0C0C0C"
            backgroundHover="#F5F5F5"
          />
        </div>
      ) : (
        <div className="mt-5">
          <Button
            href="#gallery"
            content={t('gallery')}
            buttonColor="text-main-white"
            backgroundColor="bg-main-black"
            buttonHover="#0C0C0C"
            backgroundHover="#F5F5F5"
          />
        </div>
      )}
      <div className="flex flex-row items-start lg:items-center justify-center w-full mt-6 lg:max-w-[936px] lg:justify-between">
        <div className="flex flex-col lg:flex-row  items-center justify-center lg:w-[357px] lg:gap-10">
          <div className="w-[28px] lg:w-[68px] h-[32px] lg:h-[64px]">
            <Calendar width="100%" height="100%" />
          </div>
          <h3 className=" font-medium text-base mt-6 lg:mt-0 lg:font-semibold lg:text-[40px] lg:leading-[52px] ">
            {formattedDate}
          </h3>
        </div>
        <div className="border-r-2 border-solid border-main-black bg-main-black  h-[79px] mx-[35px]"></div>
        <div className="flex flex-col items-center justify-center lg:flex-row lg:w-[357px] lg:gap-10">
          <Location data={results.event?.location} />
          <h3 className=" font-medium lg:font-semibold lg:text-[40px] lg:leading-[52px] text-base text-center mt-6 lg:mt-0 w-min lg:w-[75%] ">
            {results.event?.location?.toLocaleUpperCase()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default EditionHero;
