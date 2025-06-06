import toRoman from '../UI/NumberToRoman';
import { request } from '@/lib/request';
import { EditionQueryDocument } from '@/graphql/generated';
import PartnersCarousel from '../PartnersCarousel/PartnersCarousel';
import Gallery from '../Gallery/Gallery';
import EditionHero from '../EditionHero/EditionHero';
import LeadSection from '../LeadSection/LeadSection';
import { Suspense } from 'react';
import Loader from '../UI/Loader';

type Edition = {
  date: string;
  edition: string;
  location: string;
  slug: string;
  title: string;
  lead: {
    name: string;
    position: string[];
    photo: {
      url: string;
      width: number;
      height: number;
      fileName: string;
    };
    linkedIn: string;
  }[];
  speakers: {
    name: string;
    position: string[];
    photo: {
      url: string;
      width: number;
      height: number;
      fileName: string;
    };
    linkedIn: string;
  }[];
  singUpLink: string;
  new: boolean;
};

const Edition = async ({
  locale,
  edition,
  translation,
}: {
  locale: string;
  edition: string;
  translation: (key: string) => string;
}) => {
  const t = translation;

  const { event, assetsConnection } = await request(EditionQueryDocument, {
    locale,
    edition,
  });

  const gallery = event?.gallery ?? [];

  return (
    <section className="flex justify-center">
      <div className="">
        {/* HERO SECTION */}
        <div className="w-full bg-main-yellow flex justify-center">
          <EditionHero
            locale={locale}
            edition={event as Edition}
            translation={t}
          />
        </div>
        {/* LEAD SECTION */}
        <div className="w-full flex justify-center">
          <LeadSection edition={event as Edition} translation={t} />
        </div>
        {/* GALERIA */}
        <div
          className="w-full flex justify-center bg-main-black"
          aria-description={t('opisGalerii')}
        >
          {event?.gallery.length ? (
            <div
              id="gallery"
              className="px-4 py-10 w-full text-main-white max-w-[1440px]"
            >
              <h2 className="font-semibold text-[40px] lg:text-[48px] leading-[52px] lg:leading-[62px] text-start self-start w-full mb-5 lg:ml-[100px]">
                {t('gallery')}
              </h2>
              <h3 className=" font-semibold text-lg leading-6 lg:px-[100px] lg:mt-10 self-start mb-10">
                {t('galleryText')} {toRoman(parseInt(event?.edition ?? ''))}{' '}
                {t('galleryText2')}
              </h3>
              <Suspense fallback={<Loader />}>
                <Gallery
                  totalImages={assetsConnection.aggregate.count}
                  gallery={gallery}
                  label={t('kliknijAbyZobaczyc')}
                />
              </Suspense>
            </div>
          ) : (
            <div
              id="gallery"
              className="bg-main-black px-4 py-10 w-full text-main-white max-w-[1440px]"
            >
              <h2 className="font-semibold text-[40px] lg:text-[48px] leading-[52px] lg:leading-[62px] text-start self-start w-full mb-5 lg:ml-[100px]">
                {t('gallery')}
              </h2>
              <h3 className=" font-semibold text-lg leading-6 lg:px-[100px] lg:mt-10 self-start">
                {t('noGallery')}
              </h3>
            </div>
          )}
        </div>
        {/* PARTNERS */}
        <div className="pt-20">
          <PartnersCarousel locale={locale} translation={t} />
        </div>
      </div>
    </section>
  );
};

export default Edition;
