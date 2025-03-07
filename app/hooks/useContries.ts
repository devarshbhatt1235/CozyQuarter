const gujaratCities = [
  { value: "AHM", label: "Ahmedabad", flag: "🇮🇳", latlng: [23.0225, 72.5714], region: "Gujarat" },
  { value: "SUR", label: "Surat", flag: "🇮🇳", latlng: [21.1702, 72.8311], region: "Gujarat" },
  { value: "VAD", label: "Vadodara", flag: "🇮🇳", latlng: [22.3072, 73.1812], region: "Gujarat" },
  { value: "RAJ", label: "Rajkot", flag: "🇮🇳", latlng: [22.3039, 70.8022], region: "Gujarat" },
  { value: "BHV", label: "Bhavnagar", flag: "🇮🇳", latlng: [21.7645, 72.1519], region: "Gujarat" },
  { value: "JUN", label: "Junagadh", flag: "🇮🇳", latlng: [21.5155, 70.4667], region: "Gujarat" },
  { value: "GND", label: "Gandhinagar", flag: "🇮🇳", latlng: [23.2156, 72.6369], region: "Gujarat" },
  { value: "ANL", label: "Anand", flag: "🇮🇳", latlng: [22.5645, 72.9289], region: "Gujarat" },
  { value: "BHR", label: "Bharuch", flag: "🇮🇳", latlng: [21.7051, 72.9959], region: "Gujarat" },
  { value: "MOR", label: "Morbi", flag: "🇮🇳", latlng: [22.8116, 70.8236], region: "Gujarat" },
  { value: "JAM", label: "Jamnagar", flag: "🇮🇳", latlng: [22.4707, 70.0577], region: "Gujarat" },
  { value: "MEH", label: "Mehsana", flag: "🇮🇳", latlng: [23.6005, 72.4009], region: "Gujarat" },
  { value: "NVS", label: "Navsari", flag: "🇮🇳", latlng: [20.9467, 72.9520], region: "Gujarat" },
  { value: "VRL", label: "Valsad", flag: "🇮🇳", latlng: [20.5992, 72.9342], region: "Gujarat" },
  { value: "PBR", label: "Porbandar", flag: "🇮🇳", latlng: [21.6417, 69.6293], region: "Gujarat" },
  { value: "GOD", label: "Godhra", flag: "🇮🇳", latlng: [22.7773, 73.6148], region: "Gujarat" },
  { value: "DAH", label: "Dahod", flag: "🇮🇳", latlng: [22.8351, 74.2551], region: "Gujarat" },
  { value: "PAT", label: "Patan", flag: "🇮🇳", latlng: [23.8500, 72.1167], region: "Gujarat" },
  { value: "PAL", label: "Palanpur", flag: "🇮🇳", latlng: [24.1725, 72.4382], region: "Gujarat" },
  { value: "SRT", label: "Surendranagar", flag: "🇮🇳", latlng: [22.7277, 71.6371], region: "Gujarat" },
  { value: "BKY", label: "Bhuj", flag: "🇮🇳", latlng: [23.2500, 69.6700], region: "Gujarat" },
  { value: "GNR", label: "Gandhidham", flag: "🇮🇳", latlng: [23.0752, 70.1331], region: "Gujarat" },
  { value: "LUN", label: "Lunawada", flag: "🇮🇳", latlng: [23.1300, 73.6109], region: "Gujarat" },
  { value: "BOR", label: "Borvai", flag: "🇮🇳", latlng: [23.396807, 73.648801], region: "Gujarat" },
];

const useCountries = () => {
  const getAll = () => gujaratCities;

  const getByValue = (value: string) => {
    return gujaratCities.find((city) => city.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
