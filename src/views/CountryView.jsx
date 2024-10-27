import React, { useState, useContext } from "react";
import { CountryContext } from "../context/CountryContext";
import CountryCard from "../components/CountryCard";
import CountryDetailModal from "../components/CountryDetailModal";
import SearchBar from "../components/SearchBar";

const CountryView = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { filteredCountries, loading, searchTerm } = useContext(CountryContext);

  const openModal = (country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  const countriesToShow = filteredCountries();

  return (
    <div className="w-full h-full p-5 flex flex-col justify-start items-center overflow-x-hidden">
      {/* Condiciona la renderización de SearchBar */}
      {!isModalOpen && (
        <SearchBar isFocused={isFocused} setIsFocused={setIsFocused} />
      )}
      <div className="w-full flex flex-wrap justify-center gap-4 mt-6">
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : searchTerm && countriesToShow.length === 0 ? (
          <div className="flex items-center justify-center h-24">
            <p className="text-gray-500">Sin resultados</p>
          </div>
        ) : (
          countriesToShow.map((country) => (
            <CountryCard
              key={country.name}
              name={country.name}
              continent={country.continent.name}
              population={country.population}
              capital={country.capital}
              currency={country.currency}
              imageUrl={country.imageUrl}
              subdivisions={country.subdivisions.map((sub) => sub.name).join(", ")}
              languages={country.languages.map((lang) => lang.name).join(", ")}
              flagUrl={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
              onClick={() => openModal(country)}
            />
          ))
        )}
      </div>

      {isModalOpen && selectedCountry && (
        <CountryDetailModal
          country={selectedCountry}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CountryView;
