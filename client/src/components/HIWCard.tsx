import type { IconType } from "react-icons";


interface HIWCardProps{
    icon:IconType;
    title:string;
    description:string;
    id:Number;
}

const HIWCard : React.FC<HIWCardProps> = ({id,icon,title,description}) => {
    const Icon =icon
  return (
    <div className="w-full card flex gap-2">
        <Icon size={36} className="px-1 text-accent"/>
        <div className="flex flex-col">
            <p className="font-bold">{title}</p>
            <p className="text-muted">{description}</p>
        </div>
    </div>
  );
}

export default HIWCard;
