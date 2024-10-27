import React, { useState, useEffect } from "react";

const CountryDetailModal = ({ country, onClose }) => {
  const [selectedSubdivision, setSelectedSubdivision] = useState("");

  useEffect(() => {
    if (country.subdivisions.length > 0) {
      setSelectedSubdivision(country.subdivisions[0].name);
    } else {
      setSelectedSubdivision("");
    }
  }, [country]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-gray-600 text-sm">
      <div className="bg-white rounded-lg py-12 px-6 max-w-[290px] flex flex-col relative">
    
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 text-3xl"
        >
          &times;
        </button>

        <img
          src={country.imageUrl}
          alt={`Imagen de ${country.name}`}
          className="w-full h-auto mb-4 rounded-xl"
        />

        <div className="py-2 flex gap-4 items-center justify-start">
          <img
            className="w-[50px] h-[30px] object-cover"
            src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
            alt={`Bandera de ${country.name}`}
          />
          <div className="text-lg mb-1">
            <p className="text-blue-500 text-sm font-bold">{country.name}</p>
            <p className="text-gray-600 text-sm">{country.continent.name}</p>
          </div>
        </div>

  
        <div className="flex flex-col gap-2">
          <p>
            <strong className="text-blue-500 text-sm font-bold">Capital:</strong>{" "}
            {country.capital}
          </p>
          <p>
            <strong className="text-blue-500 text-sm font-bold">Población:</strong>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <strong className="text-blue-500 text-sm font-bold">Moneda:</strong>{" "}
            {country.currency}
          </p>
          <p>
            <strong className="text-blue-500 text-sm font-bold">Idiomas:</strong>{" "}
            {country.languages.map((lang) => lang.name).join(", ")}
          </p>

          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="subdivisions" className="block">
              <strong className="text-blue-500 text-sm font-bold">Regiones:</strong>
            </label>
         
            <div className="relative w-full max-h-32 overflow-y-auto border rounded border-gray-300">
              {country.subdivisions.length > 0 ? (
                country.subdivisions.map((sub, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedSubdivision(sub.name);
                    }}
                    className={`p-2 hover:bg-gray-100 cursor-pointer ${
                      selectedSubdivision === sub.name ? "bg-gray-200" : ""
                    }`}
                  >
                    {sub.name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">Sin información</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailModal;
