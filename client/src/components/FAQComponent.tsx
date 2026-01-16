
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQComponentProps {
    question:string;
    answer:string;
}



const FAQComponent : React.FC<FAQComponentProps> = ({question,answer}) => {
    const [answerHidden,setAnswerHidden] = useState(true)
  return (
    <div className='w-full px-6 py-4 rounded-xl flex flex-col bg-card border-1  border-border gap-1'>
        <div className='flex justify-between'>
            <p className="text-base font-semibold">{question}</p>
            <span onClick={()=>setAnswerHidden(!answerHidden)}>{answerHidden?<FaChevronDown/>:<FaChevronUp/>}</span>
        </div>
        <div>
            {answerHidden?null:<p className="text-muted text-sm">{answer}</p>}
        </div>
    </div>
  );
}

export default FAQComponent;
