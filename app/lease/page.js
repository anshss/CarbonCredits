export default function Leases(){
    return(
        <div className="border-none">
            <h1 className="text-4xl mt-10 text-center font-sans font-semibold pb-10">Pending Leases</h1>
            <div className=" w-full h-screen ">
            
            <form>
            <div class="ml-40 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 mt-40 w-3/4 h-96">
       
            <div class="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
           <button type="submit" class="inline-flex ml-96 py-2.5 px-4 text-s font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800   mt-80 ">
               End lease
            </button>   
            </div>
            </div>
            </form>        
            </div>
        </div>
       
    );
}