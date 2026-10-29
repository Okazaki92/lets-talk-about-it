import { PageTitle } from '../UI/PageTitle';

export type NewsletterContent = {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

const Newsletter = ({ content }: { content: NewsletterContent }) => (
  <section
    id="newsletter"
    aria-label={content.title}
    className="w-full bg-main-yellow text-main-black"
  >
    <div className="mx-auto max-w-screen-large_desktop px-4 py-12 md:px-24 lg:py-20">
      <PageTitle title={content.title} />
      <p className="max-w-3xl text-lg leading-relaxed lg:text-2xl">
        {content.description}
      </p>
      <a
        href={content.href}
        className="mt-8 inline-flex rounded-xl border-2 border-main-black bg-main-black px-6 py-4 text-lg font-semibold text-main-white transition-colors hover:bg-main-yellow hover:text-main-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main-black"
      >
        {content.linkLabel}
      </a>
    </div>
  </section>
);

export default Newsletter;
