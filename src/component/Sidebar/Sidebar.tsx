import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";


export default function Sisebar() {
    const [open,setOpen] = useState(false);
    const [submenuOpen,setSubmenuOpen] = useState(false);
    const Menus =[
        {title:"Dashboard"},
        {title:"Pages",icon:<IoDocumentTextOutline/>},
        {title:"Media",icon:<FaImage/>,spacing:true},
        {
            title:"Projects",
            icon:<GoProjectRoadmap/>,
        submenu:true,
        submenuItems:[
            {title:"Submenu 1"},
            {title:"Submenu 2"},
            {title:"Submenu 3"},
        ]
    },
        {title:"Profile",icon:<IoPersonSharp/>,spacing:true},
        {title:"Setting",icon:<IoSettings/>},
        {title:"Logout",icon:<IoIosLogOut/>},

    ]
    return (
        <div className="flex">
            <div className={`bg-dark-pruple min-h-screen p-5 pt-8 duration-300 ${open? "w-72" : "w-20"} relative z-50`}>
                <BsArrowRight className={`bg-white text-3xl rounded-full absolute -left-3 top-9 border border-dark-pruple
                cursor-pointer ${!open && "rotate-180"}`} onClick={()=>{setOpen(!open)}}/>

            <div className="inline-flex">
                <FaLocationDot className={`bg-amber-500 text-4xl rounded cursor-pointer
                    block float-left ml-2 duration-500 p-1 ${open && 'rotate-[360deg]'}`}/>
            <div className={`text-white origin-left font-medium text-2xl ${!open && 'scale-0'}`}>
            وزارة الصحة
            </div>
            </div>
            <ul className="pt-2">
            {Menus.map((menu,index)=>
            <div key={index}>
                <li key={`menu-${index}`} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2
                hover:bg-light-white rounded-md ${menu.spacing?"mt-9" : "mt-2"}`}>
                    <span className="text-2xl block float-left">
                    {menu.icon? menu.icon : <MdDashboard/>}
                </span>
                <span className={`text-base font-medium duration-200 ${!open && "hidden"}`}>
                    {menu.title}
                    </span>
                    {menu.submenu && open && (
                        <BsChevronDown onClick={()=>{setSubmenuOpen(!submenuOpen)}} className={`${submenuOpen && 'rotate-180'} flex-1`}/>
                    )}
                </li>
                {menu.submenu && submenuOpen && open && (
                    <ul key={`submenu-${index}`}>
                        {menu.submenuItems.map((submenuItem,index2)=>(

                            <li key={`submenu-${index}-${index2}`} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer
                             p-2 px-5 hover:bg-light-white rounded-md duration-300">
                                {submenuItem.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            )}
            </ul>
            </div>
        </div>
    )
}