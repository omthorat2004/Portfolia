import React from 'react';
import { faqs } from '../utils/data';
import FAQComponent from './FAQComponent';
const FAQs = () => {
  return (
    <div className='px-6 mx-auto max-w-5xl w-full mt-15 flex flex-col gap-10'>
        <h2 className='text-5xl max-w-2xl font-bold mx-auto text-center'>Frequently Asked Questions</h2>
        <div className='flex flex-col gap-3'>
            {faqs.map((faq)=>{
                return  <FAQComponent question={faq.question} answer={faq.answer}/>
            })}
        </div>
    </div>
  );
}

export default FAQs;
