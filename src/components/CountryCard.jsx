import React from "react";

const CountryCard = ({ name, continent, imageUrl, flagUrl, onClick }) => {
  return (
    <div 
      className="w-[280px] h-64 flex flex-col border rounded-lg overflow-hidden shadow-lg cursor-pointer" 
      onClick={onClick}
    >
      <div className="flex-grow relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-center" 
        />
      </div>
      <div className="px-4 py-2 flex gap-4 items-center bg-white h-16">
        <img className="w-[50px] h-[30px] object-cover" src={flagUrl} alt={`Bandera de ${name}`} />
        <div className="text-lg mb-1">
          <p className="text-blue-500 text-sm font-bold">{name}</p>
          <p className="text-gray-600 text-sm">{continent}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
