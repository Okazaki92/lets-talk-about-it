import LinesPattern from '@/IconsSVG/LinesPattern';
import toRoman from '../UI/NumberToRoman';
import MainTitle from '../MainTitle/MainTitle';
import Arrow from '@/IconsSVG/Arrow';
import Button from '../UI/Button';
import Calendar from '@/IconsSVG/Calendar';
import Location from '../Location/Location';

const WorkshopsHero = async ({
  locale,
  edition,
  isMain,
  translation,
}: {
  locale: string;
  edition: {
    title: string;
    date: string;
    location: string;
    new: boolean;
    signUp: string;
    lead: {
      name: string;
    }[];
  } | null;

  isMain?: boolean;
  translation: (key: string) => string;
}) => {
  const t = translation;

  const eventDate = new Date(edition?.date ?? '');
  const formattedDate = `${eventDate.getDate().toString().padStart(2, '0')}.${(
    eventDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${eventDate.getFullYear()}`;

  const formatLocation = (location: string) => {
    const wordsArray = location.split(' ');
    const lastWord = wordsArray.pop();
    const remainingWords = wordsArray.join(' ');
    return (
      <>
        {remainingWords.length > 1 && <h2>{remainingWords}</h2>}
        <h2>{lastWord}</h2>
      </>
    );
  };

  return (
    <div
      className={`${
        isMain ? '' : ' pt-20 lg:pt-24'
      }  pb-[60px] w-full px-4 lg:px-[100px] flex flex-col items-center justify-center bg-main-yellow relative max-w-[1440px]`}
    >
      <div
        className={`${
          isMain ? 'top-0' : 'mt-[4px] top-24'
        } self-end hidden lg:inline  absolute right-0`}
      >
        <LinesPattern fill="#0C0C0C" />
      </div>
      <div className="self-start flex flex-col lg:flex-row justify-center lg:items-center mt-10 mb-5 lg:mt-20 lg:mb-10 lg:gap-5 w-full">
        <h2 className="text-lg lg:text-[48px] lg:leading-[62px] leading-[42px] font-normal">
          {t('workshops')}
        </h2>
        <h2 className="text-lg font-medium lg:text-[48px] leading-[52px] lg:font-bold lg:text-center uppercase lg:normal-case tracking-tight">
          {edition?.lead?.map((lead, index) => (
            <span key={index}>
              {lead.name}
              {index < edition.lead.length - 1 ? ' & ' : ''}
            </span>
          ))}
        </h2>
      </div>
      <MainTitle fill="#0C0C0C" events />
      <h2 className="font-semibold text-[18px] leading-[23px] lg:text-[40px] lg:leading-[52px] lg:font-bold lg:mt-10 mb-4 text-center">
        {edition?.title}
      </h2>
      <Arrow />
      {edition?.new ? (
        <div className="mt-5">
          <Button
            target="_blank"
            href={edition?.signUp ?? '#'}
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
            href={`#gallery`}
            content={t('gallery')}
            buttonColor="text-main-white"
            backgroundColor="bg-main-black"
            buttonHover="#0C0C0C"
            backgroundHover="#F5F5F5"
            description={t('galleryDescription')}
          />
        </div>
      )}
      <div className="flex flex-row items-start lg:items-center justify-center w-full mt-6 lg:max-w-[936px] ">
        <div className="flex flex-col lg:flex-row  items-center justify-center lg:justify-end lg:w-[357px] lg:gap-10">
          <div className="w-[28px] lg:w-[68px] h-[32px] lg:h-[64px]">
            <Calendar width="100%" height="100%" />
          </div>
          <h3 className=" font-medium text-base mt-6 lg:mt-0  lg:text-[32px] lg:leading-[42px] lg:font-normal ">
            {formattedDate}
          </h3>
        </div>
        <div className="border-r-2 border-solid border-main-black bg-main-black  h-[79px] mx-[35px]"></div>
        <div className="flex flex-col items-center justify-center lg:flex-row lg:w-[357px] lg:gap-10">
          <Location data={edition?.location} />
          <div className=" font-medium lg:text-[32px] lg:leading-[42px] lg:font-normal text-base text-center lg:text-start mt-6 lg:mt-0 w-min lg:w-[100%] ">
            {formatLocation(edition?.location as string)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopsHero;
