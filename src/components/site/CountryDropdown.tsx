import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { COUNTRIES } from '@/lib/countries';
import { cn } from '@/lib/utils';

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
    c.iso.toLowerCase().includes(search.toLowerCase()) ||
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
    <div className={cn("relative w-[110px] sm:w-[120px] shrink-0", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-full px-3 sm:px-4 py-3 sm:py-4 bg-black/60 border border-white/10 rounded-xl sm:rounded-2xl text-white hover:bg-white/5 transition-colors focus:outline-none focus:border-gold/50"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <span className="text-white">{selectedCountry.iso}</span>
          <span className="text-white/40">+{selectedCountry.dialCode}</span>
        </span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-white/40 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[200]" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute z-[201] w-[280px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              top: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().bottom + 6 : 0,
              left: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().left : 0,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-3 border-b border-white/10 flex items-center gap-2">
              <Search className="w-4 h-4 text-white/40 shrink-0" />
              <input
                type="text"
                className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-white/30"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoFocus
              />
            </div>
            <ul className="max-h-[240px] overflow-y-auto p-1.5" role="listbox">
              {filteredCountries.length > 0 ? (
                filteredCountries.map(country => (
                  <li
                    key={country.iso}
                    role="option"
                    aria-selected={value === country.iso}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 text-sm rounded-xl cursor-pointer transition-colors",
                      value === country.iso ? "bg-gold/10 text-gold" : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                    onClick={() => {
                      onChange(country.iso);
                      setIsOpen(false);
                      setSearch('');
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 font-mono font-bold text-sm text-white">{country.iso}</span>
                      <span className="text-white/60 text-xs">{country.name}</span>
                    </div>
                    <span className="text-white/40 font-mono text-xs">+{country.dialCode}</span>
                  </li>
                ))
              ) : (
                <li className="px-3 py-4 text-center text-sm text-white/50">
                  No country found
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
