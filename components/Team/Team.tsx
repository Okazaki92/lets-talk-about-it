import { PageTitle } from '../UI/PageTitle';

export type TeamContent = {
  title: string;
  members: {
    name: string;
    paragraphs: string[];
  }[];
};

const Team = ({ content }: { content: TeamContent }) => (
  <section
    id="team"
    aria-label={content.title}
    className="w-full max-w-screen-large_desktop px-4 md:px-24 py-12 lg:py-20"
  >
    <PageTitle title={content.title} />
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {content.members.map((member) => (
        <li
          key={member.name}
          className="rounded-xl border border-main-black/10 border-t-4 border-t-main-yellow bg-main-white p-6 text-main-black"
        >
          <h3 className="mb-4 text-2xl font-semibold">{member.name}</h3>
          <div className="space-y-3 text-lg leading-relaxed">
            {member.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default Team;
