import React, { useRef, useContext, useEffect } from "react";
import { CountryContext } from "../context/CountryContext";

const SearchBar = ({ isFocused, setIsFocused }) => {
  const modalRef = useRef(null);
  const {
    searchTerm,
    setSearchTerm,
    selectedContinents,
    setSelectedContinents,
  } = useContext(CountryContext);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleContinent = (continent) => {
    setSelectedContinents((prev) => {
      const updatedContinents = new Set(prev);
      updatedContinents.has(continent)
        ? updatedContinents.delete(continent)
        : updatedContinents.add(continent);
      return updatedContinents;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest(".search-container")
      ) {
        setIsFocused(false);
      }
    };

    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [setIsFocused]);

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedContinents(new Set());
    setIsFocused(false);
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 w-full max-w-[290px] md:max-w-[400px] lg:max-w-[600px] mb-6 search-container">
      <div className="flex justify-between items-center rounded-full py-1 pl-6 pr-4 w-full shadow-xl bg-white">
        <div className="flex flex-col flex-grow">
          <label className="text-gray-400 font-medium">País</label>
          <input
            type="text"
            placeholder="Escribe el país que deseas ver"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            className="focus:outline-none focus:ring-0 text-gray-400 placeholder:text-xs border-b-2 border-transparent focus:border-blue-400"
          />
        </div>
        <button
          onClick={() => setIsFocused(false)}
          className="w-28 h-8 bg-blue-500 text-white rounded-full px-4 py-2 ml-2 flex justify-center items-center"
          aria-label="Cerrar búsqueda"
        >
          <i className="fas fa-search mr-2 hidden md:inline"></i>
          <span className="md:inline hidden">Buscar</span>
          <i className="md:hidden fas fa-search"></i>
        </button>
      </div>

      {isFocused && (
        <div
          ref={modalRef}
          className="absolute top-full left-0 mt-2 w-3/4 bg-white p-4 rounded-lg shadow-lg z-10"
        >
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-gray-500">
              Filtrar por continentes
            </p>
            <button
              onClick={clearSearch} // Llama a la función clearSearch
              className="text-blue-500 font-bold px-4 py-2 rounded-md"
            >
              Limpiar
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 place-items-center">
            {[
              "Europe",
              "North America",
              "South America",
              "Asia",
              "Oceania",
              "Africa",
            ].map((continent) => (
              <div
                key={continent}
                className={`flex flex-col items-center justify-center border rounded-lg p-1 w-24 h-24 cursor-pointer transition-all duration-200 ${
                  selectedContinents.has(continent)
                    ? "border-blue-500 bg-blue-50"
                    : "border-transparent"
                }`}
                onClick={() => toggleContinent(continent)}
              >
                <img
                  src={`/${continent}.svg`}
                  alt={`Icono de ${continent}`}
                  className="w-10 h-10 mb-2" 
                />
                <p className="text-center text-xs">{continent}</p>{" "}
                
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
