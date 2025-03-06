// app/Date.tsx
import React from 'react';
import DateM from '../components/date/date_day';
import DateD from '../components/date/date_month';

const DatePage = () => {
  return (
    <div className=' items-center'>
      <div className='flex items-center'>
              <h1 className=' font-bold text-2xl'>行事曆</h1>
      </div>
      <div className='flex items-center space-x-5 mt-4 mr-5'>
        <DateM />  
        <DateD />      
      </div>

    </div>
  );
};

export default DatePage;

  