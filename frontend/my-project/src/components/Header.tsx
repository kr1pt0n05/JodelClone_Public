

export default function Header(){
    return (
    <div className="flex justify-between bg-orange-500 flex items-center p-4 w-full"> 
        <div>
            <img src="https://dummyimage.com/100x50/fff/000" alt="Logo" className="h-8 w-auto"></img>
        </div>
        
        <div className="flex justify-center space-x-4">
            <a href="#" className="text-white font-bold hover:text-orange-500 transition-colors text-lg px-2">Home</a>
            <a href="#" className="text-white font-bold hover:text-orange-500 transition-colors text-lg px-2">About</a>
            <a href="#" className="text-white font-bold hover:text-orange-500 transition-colors text-lg px-2">Contact</a>
        </div>
        <div></div>
    </div>
     ) 
}