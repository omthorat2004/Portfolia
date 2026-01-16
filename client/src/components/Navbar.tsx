
import { useState } from "react";
import { FiLayers } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [menuHidden, setMenuHidden] = useState(false)
    const [darkMode, setDarkMode] = useState(false)

    const navigate = useNavigate()

    const toggleTheme = () => {
        setDarkMode(prev => {
            const newMode = !prev;

            if (newMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }

            return newMode;
        });
    };

    return (
        <div className='bg-background/10 w-screen backdrop-blur-sm fixed px-4 py-4  top-0 '>
            <div className='flex flex-col w-full justify-between max-w-5xl md:mx-auto gap-2'>
                <div className="w-full flex justify-between items-center">
                    <div className='heading flex justify-center items-center cursor-pointer gap-2 text-accent hover:text-accent-hover text-2xl font-bold'>
                        <FiLayers style={{ strokeWidth: 3 }} className="font-extrabold" />
                        <h1 className="">Portfolia</h1>
                    </div>
                    <div className="hidden nav-menu md:flex gap-3 text-base font-semibold">
                        <button className="cursor-pointer text-link hover:text-link-hover">How it works</button>
                        <button className="cursor-pointer text-link hover:text-link-hover">Projects</button>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center text-xl cursor-pointer" onClick={toggleTheme}>
                            {darkMode ? <MdLightMode /> : <MdDarkMode />}
                        </div>
                        <div className="hidden md:flex justify-center items-center gap-3">
                            <button onClick={()=>navigate('/login')} className="nav-btn">Login</button>
                            <button onClick={()=>navigate('/signup')} className="nav-btn">Signup</button>
                        </div>
                        <div className="flex justify-center items-center md:hidden">
                            <MdMenu onClick={() => setMenuHidden(!menuHidden)} className="text-accent" size={24} />
                        </div>
                    </div>

                </div>
                {menuHidden ?
                    <div
                        className={`
    md:hidden overflow-hidden transform transition-all duration-300 ease-in-out
    ${menuHidden
                                ? "max-h-[300px] opacity-100 translate-y-0"
                                : "max-h-0 opacity-0 -translate-y-3"}
  `}
                    >
                        <div className="flex text-base flex-col gap-2 items-center pt-3">
                            <button className="cursor-pointer text-link hover:text-link-hover">
                                How it Works
                            </button>
                            <button className="cursor-pointer text-link hover:text-link-hover">
                                Projects
                            </button>
                            <button onClick={()=>navigate('/login')} className="nav-btn">Login</button>
                            <button onClick={()=>navigate('/signup')} className="nav-btn">Signup</button>
                        </div>
                    </div>

                    : null}
            </div>
        </div>
    );
}

export default Navbar;
