import Card from "@/components/Card";
const TopGenaretions = async () => {

  const res = await fetch('https://pixgen-jet-mu.vercel.app/data.json');
  const data = await res.json();
  const TopPhotos = data.slice(0, 6);

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold mb-5 ">Top Generations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {TopPhotos.map((photo) => (
          <Card key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default TopGenaretions;