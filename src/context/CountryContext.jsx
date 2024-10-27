// CountryContext.js
import React, { createContext, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import axios from "axios";

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name(lang: "es")
      capital
      currency
      subdivisions {
        name
      }
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

const GIST_URL = "https://gist.githubusercontent.com/Juliotornero/3488b604d2ebc812cce9ef46b5f3149a/raw/05b1122e29d7ac42f699a85b0a6a3c712f597e88/paises.json";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinents, setSelectedContinents] = useState(new Set());
  const [countriesData, setCountriesData] = useState([]);
  const [countryImages, setCountryImages] = useState([]);
  
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  useEffect(() => {
    const fetchCountryImages = async () => {
      try {
        const response = await axios.get(GIST_URL);
        const countries = response.data.countries || [];
        setCountryImages(countries);
      } catch (error) {
        console.error("Imagenes no encontradas:", error);
      }
    };

    fetchCountryImages();
  }, []);

  useEffect(() => {
    const fetchPopulationData = async () => {
      if (!data) return;

      const countriesWithPopulation = await Promise.all(
        data.countries.map(async (country) => {
          try {
            const response = await axios.get(`https://restcountries.com/v3.1/alpha/${country.code}`);
            const countryImage = countryImages.find((img) => img.code === country.code);
            const imageUrl = countryImage ? countryImage.imageUrl : "";
            return {
              ...country,
              population: response.data[0].population || null,
              imageUrl,
            };
          } catch (error) {
            console.error(`Imagen no encontrada para:  ${country.name}:`, error);
            return { ...country, population: null, imageUrl: "" };
          }
        })
      );
      setCountriesData(countriesWithPopulation);
    };

    fetchPopulationData();
  }, [data, countryImages]);

  const filteredCountries = () => {
    return countriesData.filter((country) => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesContinent = selectedContinents.size > 0 ? selectedContinents.has(country.continent.name) : true;
      return matchesSearch && matchesContinent;
    });
  };

  return (
    <CountryContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedContinents,
        setSelectedContinents,
        countriesData,
        filteredCountries,
        loading,
        error,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};
