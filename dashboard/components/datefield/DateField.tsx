import React from 'react';
import { format } from 'date-fns';

const DateField: React.FC<{ selectedDate: Date; onChange: (date: Date) => void }> = ({
  selectedDate,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="date"
        value={format(selectedDate, 'yyyy-MM-dd')}
        onChange={(e) => onChange(new Date(e.target.value))}
      />
      <p className="text-xs text-center opacity-75 ml-2">
        {format(selectedDate, 'dd/MM/yyyy')}
      </p>
    </div>
  );
};

export default DateField;