// app/Date.tsx
import React from 'react';
import DateD from '../components/date/date_day';
import DateM from '../components/date/date_month';

const DatePage = () => {
  return (
    <div className=' flex flex-col h-full'>
      <div className='flex items-center'>
              <h1 className=' font-bold text-2xl'>行事曆</h1>
      </div>
      <div className='flex space-x-5 mt-3 mr-5 flex-1 overflow-hidden'>
        <DateM />  
        <DateD />      
      </div>

    </div>
  );
};

export default DatePage;

  