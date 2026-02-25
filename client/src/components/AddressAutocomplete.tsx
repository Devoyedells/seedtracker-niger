import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";

interface AddressAutocompleteProps {
  onSelect?: (address: {
    lat: string;
    lon: string;
    displayName: string;
  }) => void;
  isLoading?: boolean;
}

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}

export function AddressAutocomplete({
  onSelect,
  isLoading = false,
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState<NominatimResult | null>(
    null,
  );
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      setIsOpen(false);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        // Search scoped to Nigeria (countrycodes=ng)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query,
          )}&countrycodes=ng&limit=5`,
        );
        const data = await response.json();
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (result: NominatimResult) => {
    setQuery(result.display_name);
    setSelectedResult(result);
    setIsOpen(false);
    if (onSelect) {
      onSelect({
        lat: result.lat,
        lon: result.lon,
        displayName: result.display_name,
      });
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label
        htmlFor="Address"
        className="text-[12px] font-bold text-gray-700 mb-1.5 block uppercase tracking-wider"
      >
        Registered Business Address (Nearest Landmark)*
      </label>
      <div className="relative">
        <input
          id="Address"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Start typing your address..."
          className="w-full rounded-2xl border-2 border-brand-green/20 bg-gray-50 hover:bg-gray-100 hover:border-brand-green/40 focus:bg-white focus:border-brand-green focus:ring-4 focus:ring-brand-green/20 transition-all px-5 py-3.5 pl-12 text-[15px] font-medium outline-none"
          disabled={isLoading}
          required
          autoComplete="off"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {isSearching ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>
      </div>

      <input
        type="hidden"
        name="Address"
        value={selectedResult?.display_name || ""}
      />
      <input type="hidden" name="Lat" value={selectedResult?.lat || ""} />
      <input type="hidden" name="Lng" value={selectedResult?.lon || ""} />

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden max-h-60 overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.place_id}
              type="button"
              onClick={() => handleSelect(result)}
              className="w-full text-left px-5 py-3.5 hover:bg-brand-green/5 transition-colors border-b border-gray-50 last:border-0 flex items-start gap-3 group"
            >
              <MapPin className="w-5 h-5 text-gray-400 group-hover:text-brand-green shrink-0 mt-0.5" />
              <span className="text-[14px] text-gray-700 leading-snug group-hover:text-gray-900">
                {result.display_name}
              </span>
            </button>
          ))}
        </div>
      )}
      {isOpen && query.length >= 3 && results.length === 0 && !isSearching && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl border border-gray-100 shadow-xl p-4 text-center text-sm text-gray-500">
          No addresses found. Try typing more details.
        </div>
      )}
    </div>
  );
}
