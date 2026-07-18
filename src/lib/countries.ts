export interface CountryData {
  name: string;
  iso: string;
  dialCode: string;
  regex: RegExp;
  example: string;
}

export const COUNTRIES: CountryData[] = [
  { name: 'Switzerland', iso: 'CH', dialCode: '41', regex: /^\+41(7[0-9]|8[0-9]|9[0-9])[0-9]{7}$/, example: '+41 79 123 45 67' },
  { name: 'France', iso: 'FR', dialCode: '33', regex: /^\+33[1-9][0-9]{8}$/, example: '+33 6 12 34 56 78' },
  { name: 'Belgium', iso: 'BE', dialCode: '32', regex: /^\+32[4][0-9]{8}$/, example: '+32 470 12 34 56' },
  { name: 'Canada', iso: 'CA', dialCode: '1', regex: /^\+1[2-9][0-9]{2}[2-9][0-9]{6}$/, example: '+1 416 123 4567' },
  { name: 'USA', iso: 'US', dialCode: '1', regex: /^\+1[2-9][0-9]{2}[2-9][0-9]{6}$/, example: '+1 212 123 4567' },
  { name: 'UK', iso: 'GB', dialCode: '44', regex: /^\+44[7-9][0-9]{9}$/, example: '+44 7912 345678' },
  { name: 'Germany', iso: 'DE', dialCode: '49', regex: /^\+49[1-9][0-9]{9,10}$/, example: '+49 151 1234567' },
  { name: 'Spain', iso: 'ES', dialCode: '34', regex: /^\+34[67][0-9]{8}$/, example: '+34 612 34 56 78' },
  { name: 'Italy', iso: 'IT', dialCode: '39', regex: /^\+39[3][0-9]{8,9}$/, example: '+39 312 345 6789' },
  { name: 'Netherlands', iso: 'NL', dialCode: '31', regex: /^\+31[6][0-9]{8}$/, example: '+31 6 12345678' },
  { name: 'Sweden', iso: 'SE', dialCode: '46', regex: /^\+46[7][0-9]{8}$/, example: '+46 70 123 45 67' },
  { name: 'Australia', iso: 'AU', dialCode: '61', regex: /^\+61[4][0-9]{8}$/, example: '+61 412 345 678' },
  { name: 'India', iso: 'IN', dialCode: '91', regex: /^\+91[6-9][0-9]{9}$/, example: '+91 98765 43210' },
  { name: 'UAE', iso: 'AE', dialCode: '971', regex: /^\+971[5][0-9]{8}$/, example: '+971 50 123 4567' },
  { name: 'Singapore', iso: 'SG', dialCode: '65', regex: /^\+65[89][0-9]{7}$/, example: '+65 8123 4567' },
  { name: 'South Africa', iso: 'ZA', dialCode: '27', regex: /^\+27[6-8][0-9]{8}$/, example: '+27 82 123 4567' },
  { name: 'Brazil', iso: 'BR', dialCode: '55', regex: /^\+55[1-9]{2}[9][0-9]{8}$/, example: '+55 11 91234-5678' },
  { name: 'Mexico', iso: 'MX', dialCode: '52', regex: /^\+52[1-9][0-9]{9}$/, example: '+52 55 1234 5678' },
  { name: 'Japan', iso: 'JP', dialCode: '81', regex: /^\+81[7-9]0[0-9]{8}$/, example: '+81 90 1234 5678' },
  { name: 'Cyprus', iso: 'CY', dialCode: '357', regex: /^\+357[9][0-9]{7}$/, example: '+357 99 123456' },
];

export const getDefaultCountry = () => COUNTRIES.find(c => c.iso === 'CH') || COUNTRIES[0];
