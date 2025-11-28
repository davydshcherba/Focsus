
import Header from "../../components/header/header";

export default function TrackersList(){
    
    return (
        <div className="bg-[#0d0d0d] text-white font-black h-screen w-screen">
         <Header/>

         <div className="m-15"> 
            <a href="/trackers/time" className="bg-blue-300 rounded-2xl p-4">Time tracker</a>
         </div>
        </div>
       
    );
}