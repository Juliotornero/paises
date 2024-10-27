const ContinentFilter = ({ selectedContinents, toggleContinent }) => {
    return (
      <div>  
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 place-items-center">
          {["Europe", "North America", "South America", "Asia", "Oceania", "Africa"].map((continent) => (
            <div
              key={continent}
              className={`flex flex-col items-center justify-center border rounded-lg p-2 w-32 h-32 cursor-pointer transition-all duration-200 ${selectedContinents.has(continent) ? "border-blue-500 bg-blue-50" : "border-transparent"}`}
              onClick={() => toggleContinent(continent)}
            >
              <img src={`/${continent}.svg`} alt={`Icono de ${continent}`} className="w-16 h-16 mb-2" />
              <p className="text-center">{continent}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default ContinentFilter