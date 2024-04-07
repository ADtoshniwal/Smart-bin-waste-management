import React from 'react';

export default function Community() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col space-y-4 max-w-screen-lg">
        <Card 
          title="Community 1" 
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at molestie justo. Vestibulum at velit condimentum."
          link="/community1"
        />
        <Card 
          title="Community 2" 
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at molestie justo. Vestibulum at velit condimentum."
          link="/community2"
        />
        <Card 
          title="Community 3" 
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at molestie justo. Vestibulum at velit condimentum."
          link="/community3"
        />
        <Card 
          title="Community 4" 
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at molestie justo. Vestibulum at velit condimentum."
          link="/community4"
        />
      </div>
    </div>
  );
}

function Card({ title, description, link }) {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white">
      {/* <img className="w-full" /> */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <a href={link} className="inline-block bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
          Visit Now
        </a>
      </div>
    </div>
  );
}
