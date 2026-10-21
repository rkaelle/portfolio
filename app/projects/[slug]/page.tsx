import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectPages } from '../../lib/projects';
import { pageMetadata } from '../../lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projectPages.map((project) => ({ slug: project.id }));
}

function getProject(slug: string) {
  const project = projectPages.find((item) => item.id === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const project = getProject(params.slug);
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.id}`,
  });
}

export default async function ProjectPage(props: Props) {
  const params = await props.params;
  const project = getProject(params.slug);
  const links = [
    { label: 'View demo', href: project.links?.demo },
    { label: 'View code', href: project.links?.code },
    { label: 'Read discussion', href: project.links?.thread },
  ];

  return (
    <main className="min-h-screen bg-[#111319] text-cyber-white px-6 py-10 md:px-10 md:py-16">
      <article className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 font-tech text-sm text-cyber-white/60 mb-12">
          <Link href="/" className="hover:text-neon-blue">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/projects" className="text-neon-blue hover:underline">Projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <header className="space-y-6 mb-10">
          <p className="font-tech text-matrix-green text-sm">/ {project.tag}{project.year ? ` · ${project.year}` : ''}</p>
          <h1 className="font-cyber text-4xl md:text-6xl text-neon-blue leading-tight">{project.title}</h1>
          <p className="text-lg md:text-xl text-cyber-white/80 leading-relaxed">{project.summary}</p>
          <div className="flex flex-wrap gap-3">
            {links.map(({ label, href }) => href ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-neon-blue/30 rounded-sm text-neon-blue font-tech text-sm hover:bg-neon-blue/10">
                {label} <span aria-hidden="true">↗</span>
              </a>
            ) : null)}
          </div>
        </header>

        {project.image && (
          <div className="relative aspect-video mb-12 border border-neon-blue/20 rounded-lg overflow-hidden bg-tech-gray/30">
            <Image src={project.image} alt={project.title} fill priority sizes="(max-width: 960px) 100vw, 896px" className="object-contain" />
          </div>
        )}

        <div className="space-y-10 leading-relaxed">
          <section aria-labelledby="overview">
            <h2 id="overview" className="font-cyber text-2xl text-matrix-green mb-4">Overview</h2>
            <p className="text-cyber-white/80">{project.description}</p>
          </section>
          {project.features && project.features.length > 0 && (
            <section aria-labelledby="features">
              <h2 id="features" className="font-cyber text-2xl text-matrix-green mb-4">Key Features</h2>
              <ul className="list-disc pl-6 space-y-3 text-cyber-white/80 marker:text-neon-blue">
                {project.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </section>
          )}
          {project.challenges && (
            <section aria-labelledby="challenges">
              <h2 id="challenges" className="font-cyber text-2xl text-matrix-green mb-4">Technical Challenges</h2>
              <p className="text-cyber-white/80">{project.challenges}</p>
            </section>
          )}
          {project.outcome && (
            <section aria-labelledby="outcome">
              <h2 id="outcome" className="font-cyber text-2xl text-matrix-green mb-4">Outcome</h2>
              <p className="text-cyber-white/80">{project.outcome}</p>
            </section>
          )}
          <section aria-labelledby="technologies">
            <h2 id="technologies" className="font-cyber text-2xl text-matrix-green mb-4">Technologies</h2>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((tech) => <li key={tech} className="px-3 py-1 text-sm font-tech border border-neon-blue/30 rounded-sm text-cyber-white/80">{tech}</li>)}
            </ul>
          </section>
        </div>

        <footer className="mt-16 pt-8 border-t border-neon-blue/20 flex flex-wrap justify-between gap-4 font-tech text-sm text-neon-blue">
          <Link href="/projects" className="hover:underline">← All projects</Link>
          <Link href="/socials" className="hover:underline">Get in touch →</Link>
        </footer>
      </article>
    </main>
  );
}
