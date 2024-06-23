import initTranslations from '@/app/i18n';
import Gallery from '@/components/Gallery/Gallery';
import PartnersCarousel from '@/components/PartnersCarousel/PartnersCarousel';
import WorkshopsHero from '@/components/WorkshopHero/WorkshopsHero';
import WorkshopsLead from '@/components/WorkshopsLead/WorkshopsLead';
import {
  AssetsQueryDocument,
  WorkshopsQueryDocument,
} from '@/graphql/generated';
import { request } from '@/lib/request';

const Workshop = async ({
  params: { locale, workshop: slug },
}: {
  params: { locale: string; workshop: string };
}) => {
  const i18nNamespaces = ['workshops'];
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const { workshop } = await request(WorkshopsQueryDocument, { locale, slug });

  return (
    <section className="bg-main-white w-screen flex flex-col justify-center">
      <div className="w-full bg-main-yellow flex justify-center">
        <WorkshopsHero locale={locale} edition={workshop} translation={t} />
      </div>
      <div>
        <WorkshopsLead locale={locale} edition={workshop} translation={t} />
      </div>
      {/* GALERIA */}
      <div className="w-full flex justify-center bg-main-black">
        {workshop?.gallery.length ? (
          <div
            id="gallery"
            className="px-4 py-10 w-full text-main-white max-w-[1440px]"
          >
            <h2 className="font-semibold text-[40px] lg:text-[48px] leading-[52px] lg:leading-[62px] text-start self-start w-full mb-5 lg:ml-[100px]">
              {t('gallery')}
            </h2>
            <h3 className=" font-semibold text-lg leading-6 lg:px-[100px] lg:mt-10 self-start mb-10">
              {t('galleryText')} {workshop?.title}
            </h3>
            <Gallery gallery={workshop?.gallery} />
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
      <div className="bg-main-white pt-20 overflow-hidden">
        <PartnersCarousel locale={locale} isMain={true} translation={t} />
      </div>
    </section>
  );
};

export default Workshop;
