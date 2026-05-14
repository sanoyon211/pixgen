import Image from 'next/image';

const PhotoDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`https://pixgen-jet-mu.vercel.app/data.json`);
  const photos = await res.json();
  const photo = photos.find(p => p.id == id);

  if (!photo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-zinc-400 text-lg">Photo not found.</p>
      </div>
    );
  }

  const formattedDate = new Date(photo.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white text-zinc-900 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <a
          href="/all-photos"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors text-sm mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Gallery
        </a>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — Image */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-zinc-200">
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Category Badge */}
            <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/20">
              {photo.category}
            </span>
          </div>

          {/* Right — Details */}
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
                {photo.title}
              </h1>
              <p className="text-zinc-500 text-sm mt-2">{formattedDate}</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard label="Likes" value={photo.likes} icon="♥" />
              <StatCard label="Downloads" value={photo.downloads} icon="↓" />
              <StatCard
                label="Resolution"
                value={photo.resolution}
                icon="⊞"
                small
              />
            </div>

            {/* Prompt */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5">
              <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2 font-medium">
                Prompt
              </p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                {photo.prompt}
              </p>
            </div>

            {/* Meta Info */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 grid grid-cols-2 gap-4">
              <MetaItem label="Model" value={photo.model} />
              <MetaItem label="Category" value={photo.category} />
              <MetaItem label="Resolution" value={photo.resolution} />
              <MetaItem label="Published" value={formattedDate} />
            </div>

            {/* Tags */}
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-medium">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {photo.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-600 text-xs px-3 py-1.5 rounded-full border border-zinc-200 cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Sub Components ---------- */

const StatCard = ({ label, value, icon, small }) => (
  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col gap-1 text-center">
    <span className="text-lg">{icon}</span>
    <span
      className={`font-bold text-zinc-900 ${small ? 'text-sm' : 'text-xl'}`}
    >
      {value}
    </span>
    <span className="text-zinc-400 text-xs">{label}</span>
  </div>
);

const MetaItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-zinc-400 mb-0.5">{label}</p>
    <p className="text-zinc-900 text-sm font-medium">{value}</p>
  </div>
);

export default PhotoDetailsPage;
