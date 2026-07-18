export const formatPhoneForCRM = (phone: string, dialCode: string): string => {
  let cleaned = phone.replace(/\D/g, '');
  
  // If the user already typed the dial code, don't duplicate it.
  // Actually, we prepend +dialCode in validation and formatting for frontend, 
  // but for CRM it wants 00 instead of +.
  
  // If the cleaned phone starts with the dial code, it might be duplicated,
  // but let's assume the frontend provides it in a standard format: +[dialCode][number]
  // We just need to convert + to 00.
  if (phone.startsWith('+')) {
    return '00' + phone.substring(1).replace(/\D/g, '');
  }

  // fallback
  if (cleaned.startsWith(dialCode)) {
    return '00' + cleaned;
  }

  return '00' + dialCode + cleaned;
};

export const formatPhoneForFrontend = (phone: string, dialCode: string): string => {
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  if (cleaned.startsWith('+')) {
    // Check if it already has the dial code right after +
    if (cleaned.startsWith('+' + dialCode)) {
      return cleaned; // It's fine
    }
    // It has a + but different dial code, just return it as is or replace?
    // Let's replace the dial code to enforce the selected country.
    // Actually, usually we just prefix if it doesn't have it.
  }
  
  // Clean it entirely for prefixing
  cleaned = phone.replace(/\D/g, '');
  
  // If user typed dial code manually
  if (cleaned.startsWith(dialCode)) {
    return '+' + cleaned;
  }
  
  // Default prefix
  return '+' + dialCode + cleaned;
};
