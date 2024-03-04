import { buyOrder, buyOption } from "../utils";
const card = ({ array }) => {
  console.log(array[9]);
  // for(let i = 0;i<array.length;i++){
  //   console.log(i)
  // }
  return (
    <div className="flex flex-row pb-10">
      <div class="w-full bg-white border-2 border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-300 mt-14 ml-80 mr-80 backdrop-blur-lg pt-5">
        <span className="ml-5 mt-5 text-xl">Seller</span>
        <div className="border rounded-full m-2 ml-5 text-2xl w-3/4 px-3">
          {array[0]}
        </div>

        <span className="ml-5 text-xl">Price</span>
        <div className="border rounded-full m-2 ml-5 w-4/12 text-2xl px-3">
          {Number(array[3] / BigInt("1000000000000000")) / 1000}
        </div>
        {Number(array[8]) > 0 ? (
          <>
            <span className="ml-5 text-xl">Option Duration</span>
            <div className="border rounded-full m-2 ml-5 w-1/3 text-2xl px-3">
              {Number(array[8])}
            </div>
            <span className="ml-5 text-xl">Option Price</span>
            <div className="border rounded-full m-2 mb-5 ml-5 w-1/3 text-2xl px-3">
              {Number(array[7] / BigInt("1000000000000000")) / 1000}
            </div>
          </>
        ) : (
          <></>
        )}

        <span className="ml-5 text-xl">GW Tokens</span>
        <div className="border rounded-full m-2 mb-5 ml-5 w-1/3 text-2xl px-3">
          {Number(array[10])}
        </div>

        <div class="px-5 pb-5">
          <div class=" items-center justify-between">
            <button
              onClick={() => buyOrder(Number(array[2]), array[3].toString())}
              className="text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-8 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800"
            >
              Buy
            </button>

            {Number(array[8]) > 0 ? (
              <button
                onClick={() => buyOption(Number(array[2]), array[7].toString())}
                className="text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-8 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800 ml-20"
              >
                Buy OPtion
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default card;
