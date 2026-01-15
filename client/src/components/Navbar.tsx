
import { FiLayers } from "react-icons/fi";

const Navbar = () => {
    return (
        <div className='bg-background/10 w-screen backdrop-blur-sm fixed px-4 py-6  top-0 '>
            <div className='flex flex-col w-full justify-between max-w-5xl md:mx-auto'>
                <div className="w-full flex justify-between items-center">
                    <div className='heading flex justify-center items-center cursor-pointer gap-2 text-accent hover:text-accent-hover text-2xl font-bold'>
                        <FiLayers style={{ strokeWidth: 3 }} className="font-extrabold" />
                        <h1 className="">Portfolia</h1>
                    </div>
                    <div className="hidden nav-menu md:flex gap-3 text-base">
                        <button className="cursor-pointer text-link hover:text-link-hover">How it works</button>
                        <button className="cursor-pointer text-link hover:text-link-hover">Projects</button>
                    </div>
                    <div className="hidden md:flex justify-center items-center gap-3">
                        <button className="cursor-pointer bg-accent text-accent-text hover:bg-accent-hover px-3 py-1 rounded-md">Login</button>
                        <button className="cursor-pointer bg-accent text-accent-text hover:bg-accent-hover px-3 py-1 rounded-md">Signup</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
