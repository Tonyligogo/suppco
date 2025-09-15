import Link from 'next/link'
import React from 'react'

const SidebarItem = ({item, selected}) => {
  const IconComponent = item.icon;
  
  return (
    <li className="cursor-pointer my-1">
      <Link 
        href={item.href} 
        className={`flex items-center justify-between group rounded-lg hover:bg-muted ${selected ? 'bg-muted' : ''} `}
      >
        <div className="flex items-center gap-2 transition-all p-[8px] cursor-pointer">
          <IconComponent  className={`group-hover:text-black ${selected ? 'text-black' : 'text-muted-foreground'}`} size={18} />
          <span className={`group-hover:text-black transition-all truncate w-32 ${selected ? 'text-black' : 'text-muted-foreground'}`}>
            {item.title}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default SidebarItem