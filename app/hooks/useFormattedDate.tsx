import { useState, useEffect } from 'react';

const useFormattedDate = (initialDate: string): string => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    if (initialDate) {
      const date = new Date(initialDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');

      setFormattedDate(`${year}-${month}-${day}`);
    }
  }, [initialDate]);

  return formattedDate;
};

export default useFormattedDate;