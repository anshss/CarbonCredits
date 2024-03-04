import { buyOrder, buyOption } from "../utils";
const card = ({ array }) => {
  console.log(array[9]);
  // for(let i = 0;i<array.length;i++){
  //   console.log(i)
  // }
  return (
    <div>
      <div class="w-full max-w-sm bg-white border-2 border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-300 mt-14 ml-12 pt-5">
        <span className="ml-5 mt-5">Seller</span>
        <div className="border m-2 ml-5 text-xl px-3">{array[0]}</div>
        <span className="ml-5">Price</span>
        <div className="border m-2 ml-5 text-xl px-3">{Number(array[3])}</div>
        <span className="ml-5">Option Duration</span>
        <div className="border m-2 ml-5 w-3/5 text-xl px-3">
          {Number(array[8])}
        </div>
        <span className="ml-5">Option Price</span>
        <div className="border m-2 mb-5 ml-5 w-3/5 text-xl px-3">
          {Number(array[7])}
        </div>
        <span className="ml-5">GW Tokens</span>
        <div className="border m-2 mb-5 ml-5 w-3/5 text-xl px-3">
          {Number(array[10])}
        </div>

        <div class="px-5 pb-5">
          <div class="mx-10 items-center justify-between">
            <button
              onClick={() => buyOrder(Number(array[2]))}
              className="text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-8 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800"
            >
              Buy
            </button>

            {(Number(array[8])>0)?
              (<button
                onClick={() => buyOption(Number(array[2]))}
                className="text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-8 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800 ml-20"
              >
                Buy OPtion
              </button>):<></>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default card;
