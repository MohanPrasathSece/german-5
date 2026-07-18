import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { COUNTRIES, CountryData } from '@/lib/countries';
import { cn } from '@/lib/utils'; // assuming standard shadcn utils exist

interface CountryDropdownProps {
  value: string; // ISO code
  onChange: (iso: string) => void;
  className?: string;
}

export function CountryDropdown({ value, onChange, className }: CountryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = COUNTRIES.find(c => c.iso === value) || COUNTRIES[0];
  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.dialCode.includes(search)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate">
          <span>{selectedCountry.iso}</span>
          <span className="text-white/50">+{selectedCountry.dialCode}</span>
        </span>
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 border-b border-white/10 flex items-center gap-2 px-3">
            <Search className="w-4 h-4 text-white/50" />
            <input
              type="text"
              className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-white/30"
              placeholder="Search country..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClick={e => e.stopPropagation()}
            />
          </div>
          <ul className="max-h-60 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-white/10" role="listbox">
            {filteredCountries.length > 0 ? (
              filteredCountries.map(country => (
                <li
                  key={country.iso}
                  role="option"
                  aria-selected={value === country.iso}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors",
                    value === country.iso ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                  onClick={() => {
                    onChange(country.iso);
                    setIsOpen(false);
                    setSearch('');
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 font-medium text-white/90">{country.iso}</span>
                    <span>{country.name}</span>
                  </div>
                  <span className="text-white/50">+{country.dialCode}</span>
                </li>
              ))
            ) : (
              <li className="px-3 py-4 text-center text-sm text-white/50">
                No country found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
