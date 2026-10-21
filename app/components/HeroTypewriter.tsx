export default function HeroTypewriter() {
  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-cyber tracking-tight">
      <span className="text-cyber-white">Hi, I&apos;m </span>
      <span className="text-neon-blue">Ryan Kaelle</span>
      <span aria-hidden="true" className="inline-block w-[2px] h-[1em] ml-[2px] bg-neon-blue animate-pulse motion-reduce:animate-none align-middle" />
    </h1>
  );
}
