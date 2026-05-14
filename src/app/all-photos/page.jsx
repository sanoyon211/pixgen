import Card from '@/components/Card'
import React from 'react';

const page = async () => {
  const res = await fetch('https://pixgen-jet-mu.vercel.app/data.json');
  const photo = await res.json();
  return (
    <div className='my-10'>
      <h1 className="text-3xl font-bold mb-5">All Photos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {photo.map(photo => (
          <Card key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default page;