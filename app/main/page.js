import Navbar from "../../components/Navbar"
export default function Main(){
    return(
        <div class=" pb-5  w-full flex flex-row m-10 -ml-3">
            <Navbar />
            <div class="  m-5 p-10">
               <label for="default-input" class="block mb-2 font-roboto font-medium text-gray-900 dark:text-white    mt-20 ml-20 text-2xl">Sales</label>

               <div class="mt-0 ml-20 border-2 p-4 w-full flex flex-row rounded-md ">
               <input type="number" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/8 p-2.5 dark:bg-gray-700    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500    dark:focus:border-blue-500" />
               <button className="ml-36 border-2 px-10 rounded-full hover:bg-white hover:border-black    hover:text-black font-roboto">sale</button>
                </div>

               <label for="default-input" class="block mb-2 font-roboto font-medium text-gray-900 dark:text-white    mt-20 ml-20 text-2xl">Lending</label>
            
               <div class="mt-0 ml-20 border-2 p-4 w-full flex flex-row rounded-md ">
               <input type="number" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/8 p-2.5 dark:bg-gray-700    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500    dark:focus:border-blue-500" />
               <button className="ml-36 border-2 px-10 rounded-full hover:bg-white hover:border-black    hover:text-black font-roboto">Lend</button>
                </div>
            </div>

            <div class=" m-5 p-10">
            
            <label for="default-input" class="block mb-2 font-roboto font-medium text-gray-900 dark:text-white mt-20 ml-20 text-2xl">Borrow</label>

            <div class="mt-0 ml-20 border-2 p-4 w-full flex flex-row rounded-md ">
            <input type="number" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/8 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <button className="ml-32 border-2 px-10 rounded-full hover:bg-white hover:border-black hover:text-black font-roboto">Borrow</button>
            </div>

            <label for="default-input" class="block mb-2 font-roboto font-medium text-gray-900 dark:text-white mt-20 ml-20 text-2xl">Buy Tokens</label>

            <div class="mt-0 ml-20 border-2 p-4 w-full flex flex-row rounded-md ">
            <input type="number" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/8 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <button className="ml-36 border-2 px-10 rounded-full hover:bg-white hover:border-black hover:text-black font-roboto">Buy</button>
            </div>

            </div>
        </div>
    )
}
