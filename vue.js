<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div class="relative p-4">
    <header class="flex relative h-14 gap-4 items-center justify-between px-2 text-sm lg:text-xl">
      <div class="flex items-center">
        <svg version="1.1" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 126.611 126.611">
<polygon fill="#F3BA2F" points="38.171,53.203 62.759,28.616 87.36,53.216 101.667,38.909 62.759,0 23.864,38.896 "/>
<rect x="3.644" y="53.188" transform="matrix(0.7071 0.7071 -0.7071 0.7071 48.7933 8.8106)" fill="#F3BA2F" width="20.233" height="20.234"/>
<polygon fill="#F3BA2F" points="38.171,73.408 62.759,97.995 87.359,73.396 101.674,87.695 101.667,87.703 62.759,126.611 
	23.863,87.716 23.843,87.696 "/>
<rect x="101.64" y="53.189" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 235.5457 29.0503)" fill="#F3BA2F" width="20.234" height="20.233"/>
<polygon fill="#F3BA2F" points="77.271,63.298 77.277,63.298 62.759,48.78 52.03,59.509 52.029,59.509 50.797,60.742 48.254,63.285 
	48.254,63.285 48.234,63.305 48.254,63.326 62.759,77.831 77.277,63.313 77.284,63.305 "/>
</svg>
        <div :class="[status === 0 ? 'red' : 'green']" class="status mx-3"> </div>
        <div class="clock">{{ digitalClock }}</div>
      </div>
      
      <Transition>
      <div v-if="!tickers[ticker]" class="flex flex-grow justify-center absolute w-full">
        <span class="animate-pulse">
          {{statusMsg}}
        </span>
      </div>
      </Transition>
     
      <Transition>
        <div v-if="tickers[ticker]" class="flex gap-2 flex-grow items-center justify-between delay-200">
          <div class="w-1/2">
            <div class="flex gap-2">
              <small>{{tickers[ticker]['pair']}}</small>
              <span :class="tickers[ticker]['style']">
                <span class="mr-1">{{tickers[ticker]['arrow']}}</span>
                <span>{{tickers[ticker]['percent'].toFixed(2)}}%</span>
              </span>
            </div>
            <div>
              <span :class="tickers[ticker]['style']">{{parseNumber(tickers[ticker]['close'], tickers[ticker]['asset'])}}</span>
            </div>
          </div>
          <div class="w-1/2">
            <small class="block">24H Highest</small>
            <span>{{parseNumber(tickers[ticker]['high'], tickers[ticker]['asset'])}}</span>
          </div>
          <div class="w-1/2">
            <small class="block">24H Lowest</small>
            <span>{{parseNumber(tickers[ticker]['low'], tickers[ticker]['asset'])}}</span>
          </div>
          <div class="w-1/2">
            <small class="block">24H Volume</small>
            <span>{{parseNumber(tickers[ticker]['tokenVolume'], tickers[ticker]['token'])}} {{tickers[ticker]['token']}}</span>
          </div>
          <div class="w-1/2">
            <small class="block">24H Value</small>
            <span>{{parseNumber(tickers[ticker]['assetVolume'], tickers[ticker]['asset'])}} {{tickers[ticker]['asset']}}</span>
          </div>
        </div>
      </Transition>
      <div @click="toggleSettings" class="relative z-10 silver cursor-pointer">
        <svg class="hover:fill-[--color-primary-blue]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/></svg>
      </div>
    </header>
    
    <div class="delimiter my-4"></div>
    
    <section class="mb-4">
      <div class="flex gap-4 flex-col lg:flex-row">
        <div class="tickers w-[500px]">
          <div class="mb-2">
            <h2 class="text-glow font-bold text-xl">Ticker List</h2>
            <div class="delimiter2 my-4"></div>
            <div class="cb flex items-center">
              <div class="h-5 w-5 ml-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"></path></svg>
              </div>
              <input v-model="inputSearch" class="w-full h-10 bg-transparent	focus:outline-none" name="query" placeholder="Search..." type="text">
            </div>
          </div>
          <div class="mb-2">
            <ul class="flex gap-2 justify-between h-10">
              <li @click="filterAsset( 'USDT' )" :class="[asset === 'USDT' ? 'active' : '']" class="cb2 flex flex-grow items-center justify-center cursor-pointer">USDT</li>
              <li @click="filterAsset( 'BTC' )" :class="[asset === 'BTC' ? 'active' : '']" class="cb2 flex flex-grow items-center justify-center cursor-pointer">BTC</li>
              <li @click="filterAsset( 'FAV' )" :class="[asset === 'FAV' ? 'active' : '']" class="cb2 flex flex-grow items-center justify-center cursor-pointer">FAV</li>
            </ul>
          </div>
          <div class="cb pr-4 pb-4">
          <div class="header flex items-center h-8 px-2 cursor-pointer">
            <div @click="sortBy( 'token', 'desc' )" :class="[sort === 'token' ? 'font-bold' : '']" class="w-1/4">Pair</div>
            <div @click="sortBy( 'close', 'desc' )" :class="[sort === 'close' ? 'font-bold' : '']" class="w-1/4 text-end">Price</div>
            <div @click="sortBy( 'percent', 'desc' )" :class="[sort === 'percent' ? 'font-bold' : '']" class="w-1/4 text-end">Change</div>
            <div @click="sortBy( 'assetVolume', 'desc' )" :class="[sort === 'assetVolume' ? 'font-bold' : '']" class="w-1/4 text-end pr-8">Volume</div>
          </div>

          <div class="body h-[454px] relative overflow-y-scroll px-2">
            <div v-if="Object.keys(tickers).length < 200" class="h-full flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="var(--color-primary-yellow)" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <div v-else>
              <div v-for="ticker in filterTickers" :key="ticker.symbol" class="flex hover:bg-[#eab30840]  cursor-pointer" style="font-family: 'Roboto Mono', monospace;">
                <div @click="changeTicker(ticker.symbol)" class="w-1/4 dotdotdot silver">
                  <!-- <img src="ticker.icon" /> -->{{ticker.pair}}
                </div>
                <div @click="changeTicker(ticker.symbol)" :class="ticker.style" class="w-1/4 dotdotdot text-end">{{ticker.close}}</div>
                <div @click="changeTicker(ticker.symbol)" :class="ticker.style" class="w-1/4 dotdotdot text-end">{{ticker.arrow}} {{ticker.percent.toFixed(2)}}</div>
                <div class="w-1/4 dotdotdot silver text-end flex gap-2 justify-end">
                  <span @click="changeTicker(ticker.symbol)" class="text-sm">{{ticker.assetVolume}}</span>
                  <span @click="setFavorite(ticker.symbol)">
                  <svg :class="favorites.includes(ticker.symbol) ? 'fill-[--color-primary-yellow]' : 'fill-gray-400'" class="hover:fill-[--color-primary-yellow]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                    </span>
                  </div>
              </div>
              </div>
            </div>
          </div>
          
        </div>
        <div class="chart flex-grow">
          <div class="flex items-center justify-between">
            <h2 class="text-glow font-bold text-xl">TradingView Chart</h2>
            <div @click="toggleSettings" class="relative z-10 silver cursor-pointer">
              <svg class="hover:fill-[--color-primary-blue]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/></svg>
            </div>
          </div>
          <div class="delimiter2 my-4"></div>
          <div class="cb relative ">
            <div :id="container_id"></div>
          </div>
        </div>
        <div class="w-[500px]">
          <h2 class="text-glow font-bold text-xl flex items-center">Make Order</h2>
            <div class="delimiter2 my-4"></div>
            <div class="flex gap-4 bg-[--color-bg--300] px-6 pb-5 pt-3 border border-[--color-primary--600]">
              <div class="w-1/2">
                <span class="text-[--color-primary-blue] font-bold text-xl">Price</span>
                <div class="cb mb-2">
                  <input class="bg-transparent h-10 w-full focus:outline-none pl-4 text-xl font-semibold">
                </div>
                <div class="cb-style3">
                    <div class="relative flex gap-2 items-center justify-center">
                        Buy
                    </div>
                </div>
              </div>

              <div class="w-1/2 ">
                <span class="text-[--color-primary-blue] font-bold text-xl text-end w-full block">Amount</span>
                <div class="cb cb-reverse mb-2">
                  <input class="bg-transparent h-10 focus:outline-none pr-4 text-xl text-end font-semibold">
                </div>
                <div class="cb-style3 cb-style3-left">
                    <div class="relative flex gap-2 items-center justify-center min-w-0	">Sell
                    </div>
                </div>
              </div>
              
            </div>
            <div class="delimiter2 my-4"></div>
          
          <div>
            <h2 class="text-glow font-bold text-xl flex items-center">Order Book</h2>
            <div class="delimiter2 my-4"></div>
            <div class="cb pr-4 pb-4">
              <div class="flex gap-2 items-center h-8 px-2">
                <div class="flex flex-1 text-[--color-primary-green]">
                  <div class="w-1/3">Total</div>
                  <div class="w-1/3 text-center">Size</div>
                  <div class="w-1/3 text-end">Price</div>
                </div>
                <div class="flex flex-1 ">
                  <div class="w-1/3">Price</div>
                  <div class="w-1/3 text-center">Size</div>
                  <div class="w-1/3 text-end">Total</div>
                </div>
              </div>
              <div class="h-[296px] relative overflow-y-scroll px-2">
                  <div class="flex gap-2 flex-row">
                    <div class="flex-1">
                      <div v-for="order in bids" class="flex gap-2" :style="`background: linear-gradient(to left, #00ff0030 0 ${(order[2] / maxAsk) * 100}%, #ffffff00 ${(order[2] / maxAsk) * 100}% 100%)`">
                        <div class="w-1/3 flex-1 text-[--color-primary-silver]">{{parseNumber((order[0] * order[1]), asset)}}</div>
                        <div class="w-1/3 flex-1 text-center text-[--color-primary-silver]">{{parseFloat((order[1]))}}</div>
                        <div class="w-1/3 flex-1 text-end text-[--color-primary-green]">{{parseFloat(order[0])}}</div>
                      </div>
                    </div>
                    <div class="flex-1">
                      <div v-for="order in asks" class="flex gap-2" :style="`background: linear-gradient(to right, #ff000030 0 ${(order[2] / maxAsk) * 100}%, #ffffff00 ${(order[2] / maxAsk) * 100}% 100%)`">
                        <div class="w-1/3 flex-1 text-left">{{parseFloat(order[0])}}</div>
                        <div class="w-1/3 flex-1 text-center text-[--color-primary-silver]">{{parseFloat((order[1]))}}</div>
                        <div class="w-1/3 flex-1 text-end text-[--color-primary-silver]">{{parseNumber((order[0] * order[1]), asset)}}</div>
                      </div>
                    </div>
                  </div>
                    

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="flex gap-4">
        <div class="orders flex-grow">
          <div class="flex gap-4">
          <div class="cb_tab active">
            <div>Current Orders</div>
          </div>
          <div class="cb_tab">
            <div>History Orders</div>
          </div>
          </div>
          <div class="delimiter2 my-4"></div>
            <div class="header flex gap-2 justify-between px-2 mb-4 font-semibold">
              <div>Time</div>
              <div class="text-center">Market</div>
              <div class="text-center">Side</div>
              <div class="text-end">Price</div>
              <div class="text-end">Amount</div>
              <div class="text-end">Executed</div>
              <div class="text-end">Options</div>
            </div>
            <div class="body flex gap-2 justify-between px-2 mb-1 silver cb h-6">
              <div>12.23.2023 12:22</div>
              <div class="text-center text-[--color-primary--500]">BTC/USDT</div>
              <div class="text-center text-[--color-primary--500]">Sell</div>
              <div class="text-end">22333</div>
              <div class="text-end">0.88</div>
              <div class="text-end">0</div>
              <div class="flex items-center justify-end cursor-pointer">
                <span class="mr-4 bg-[--color-primary-blue] rounded-full w-3 h-3 block border-1 border-[--color-primary-black] flex items-center justify-center">
                  <svg class="fill-[--color-primary-black]" xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg>
                </span>
              </div>
            </div>
          
            <div class="body flex gap-2 justify-between px-2 mb-1 silver cb h-6">
              <div>12.23.2023 12:22</div>
              <div class="text-center text-[--color-primary-green]">BTC/USDT</div>
              <div class="text-center text-[--color-primary-green]">Buy</div>
              <div class="text-end">22333</div>
              <div class="text-end">0.88</div>
              <div class="text-end">0</div>
              <div class="flex items-center justify-end cursor-pointer">
                <span class="mr-4 bg-[--color-primary-blue] rounded-full w-3 h-3 block border-1 border-[--color-primary-black] flex items-center justify-center">
                  <svg class="fill-[--color-primary-black]" xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg>
                </span>
              </div>
            </div>
 
        </div>
        <div class="tickers w-[500px] flex flex-col gap-4">
          <div class="w-full">
            <div class="flex justify-between items-center">
              <h2 class="text-glow font-bold text-xl h-[50px] flex items-center">Latest Trades</h2>
              <div @click="toggleLatestTrades" class="relative z-10 silver cursor-pointer">
                <svg :class="showLatestTrades ? 'fill-[--color-primary-green] hover:fill-[--color-primary-red]' : 'fill-[--color-primary-red] hover:fill-[--color-primary-green]'" class="w-6" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill-rule="nonzero"/></svg>
              </div>
            </div>
              
            <div class="delimiter2 my-4"></div>
            <div class="cb pb-4">
              <div class="header flex items-center h-8 px-2">
                <div class="w-1/3">Time</div>
                <div class="w-1/3 text-end">Price</div>
                <div class="w-1/3 text-end pr-4">Volume</div>
              </div>
              <div class="h-[250px] mr-4 relative overflow-y-scroll px-2">
                <div v-for="(trade, index) in latestTrades" class="flex" style="font-family: 'Roboto Mono', monospace;">
                  <div class="w-1/3 silver">{{timestampToDate(trade[0])}}</div>
                  <div :class="[trades[index+1] != undefined && trades[index+1][1] > trades[index][1] ? 'red' : 'green']" class="w-1/3 text-end">{{parseFloat(trade[1])}}</div>
                  <div class="w-1/3 silver text-end">{{parseFloat(trade[2])}}</div>
                </div>
              </div>
            </div>
          </div>
           
            
        </div>
      </div>
    </section>
    
    <!-- Settings modal -->
    <div v-if="showSettings" id="staticModal" class="bg-[#00000080] fixed flex items-center justify-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative">
              <div class="flex">
                <!-- Modal header -->
                <div class="cb-left mr-[1px] ">
                  <div></div>
                </div>
                <!-- Modal body -->
                <div class="cb !bg-[--color-primary-black] px-6 py-2 w-full">
                    <p class="uppercase text-xl border-b-[1px] border-[#441618] pb-1 mb-2">
                        Settings
                    </p>
                  <p class="uppercase text-xl text-[--color-primary-blue]">
                    Enable trading
  </p>
                    <p class="mb-2">Toggle ON or OFF the ability to trade on this terminal.</p>             
<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer">
  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable trading</span>
</label>
                    <p class="uppercase text-xl text-[--color-primary-blue]">API KEY</p>
                    <p class="mb-2">Enter your API KEY from Binance Test and allow IP address <span class="text-[--color-primary-yellow]">127.0.0.1</span>.</p>
                    <div class="cb w-96">
                      <input class="h-10 w-full px-4 bg-transparent focus:outline-none" placeholder="Do not enter any live API KEY!">
                    </div>
                  
                    <div class="delimiter-blue my-4"></div>
                    <p class="uppercase text-xl text-[--color-primary-blue]">Show latest trades</p>
                    <p class="mb-2">Toggle ON or OFF the visibility for the latest trades.</p>             
                    <div  @click="toggleLatestTrades" class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" :checked="showLatestTrades ? true :false"  class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show latest trades</span>
                    </div>                  
                  
                  </div>
                </div>
                <!-- Modal footer -->
                <div class="mt-10 flex gap-1 justify-center">
                  <div class="cb-style3">
                      <div data-modal-hide="staticModal" type="button" class="relative flex gap-2 items-center justify-center">
                        <span class="bg-[--color-primary-blue] rounded-full w-5 h-5 block border-1 border-[--color-primary-black]">
                          <svg class="scale-75 fill-[--color-primary-black]" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path d="m9.831 16.198.002-.003-1.113-.996-.004.004-2.468-2.202c-.144-.128-.322-.191-.5-.191-.417 0-.749.337-.749.75 0 .206.084.412.249.56l2.478 2.21-.767.873-4.71-4.202c-.144-.128-.322-.191-.5-.191-.416 0-.749.337-.749.75 0 .206.084.412.25.56l5.268 4.7c.143.128.321.191.499.191.206 0 .41-.084.559-.25l1.264-1.437 1.677 1.496c.143.128.321.191.499.191.206 0 .409-.084.558-.25l11.234-12.499c.129-.143.192-.322.192-.501 0-.419-.338-.75-.748-.75-.206 0-.411.084-.559.249l-10.735 11.943zm-.451-1.75 1.114.996 8.316-9.182c.128-.143.191-.322.191-.501 0-.419-.337-.75-.748-.75-.206 0-.411.084-.559.249z" fill-rule="nonzero"/></svg>
                        </span>
                        <span class="font-semibold">Confirm</span>
                      </div>
                    </div>
                  <div @click="toggleSettings" class="cb-style3">
                    <div data-modal-hide="staticModal" type="button" class="relative flex gap-2 items-center justify-center">
                          <span class="bg-[--color-primary-blue] rounded-full w-5 h-5 block border-1 border-[--color-primary-black] flex items-center justify-center">
                            <svg class="fill-[--color-primary-black]" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"><path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg>
                              
                            </span>
                        <span class="font-semibold">Cancel</span>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
const SCRIPT_ID = 'tradingview-widget-script';
const CONTAINER_ID = 'vue-trading-view';
  
export default {
  data() {
    return {
      sock: null,
      status: 0,
      tickers: {},
      cache: [],
      trades: [],
      favorites: ['BTCUSDT'],
      interval: '1d',
      digitalClock: null,
      asks: [],
      bids: [],
      maxAsk: 0,
      bgImageUrl: null,
      showSettings: false,
      showLatestTrades: true,
      inputSearch: '',
      asset: 'USDT',
      sort: 'assetVolume',
      order: 'desc', 
      //chart
      ticker: 'BTCUSDT',
      container_id: CONTAINER_ID,
      change: 'change',
      options: {
        autosize: true,
        symbol: 'BINANCE:BTCUSDT',
        interval: '5',
        timezone: 'Asia/Jerusalem',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        save_image: true,
        // watchlist: [
        //   'BITMEX:XBTUSD.P',
        //   'BINANCE:XMRBTC',
        // ],
        details: false,
        hotlist: false,
        studies: [
          // 'IchimokuCloud@tv-basicstudies',
          {
            id: 'VWAP@tv-basicstudies',
          },
          {
            id: 'MAExp@tv-basicstudies',
            inputs: {
              length: 200
            },
            styles: {
            }
          }
        ],
      }

    };
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    toggleLatestTrades() {
      this.showLatestTrades = !this.showLatestTrades;
    },
    startClock() {
      this.digitalClock = new Date(Date.now()).toLocaleTimeString("en-GB");
      setTimeout(() => { this.startClock() }, 250);
    },
    changeTicker(symbol) {
      this.unsubscribeTicker();
      this.ticker = symbol;
      this.setSymbol(symbol);
      this.subscribeTicker();
    },
    setSymbol(symbol) {
      var elIframeWidget = document.querySelectorAll("iframe[id*=tradingview_]")[0]

			if (
				!elIframeWidget ||
				!elIframeWidget.contentWindow
			) {
				return;
			}
     
			elIframeWidget.contentWindow.postMessage(
				{
					name: 'set-symbol',
					data: {
						symbol: symbol,
					},
				},
				'*'
			);
		},
    canUseDOM() {
      return typeof window !== 'undefined' && window.document && window.document.createElement;
    },
    getScriptElement() {
      return document.getElementById(SCRIPT_ID);
    },
    updateOnloadListener(onload) {
      const script = this.getScriptElement();
      const oldOnload = script.onload;
      return script.onload = () => {
        oldOnload();
        onload();
      };
    },
    scriptExists() {
      return this.getScriptElement() !== null;
    },
    appendScript(onload) {
      if (!this.canUseDOM()) {
        onload();
        return;
      }

      if (this.scriptExists()) {
        if (typeof TradingView === 'undefined') {
          this.updateOnloadListener(onload);
          return;
        }
        onload();
        return;
      }
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://s3.tradingview.com/tv.js';
      script.onload = onload;
      document.getElementsByTagName('head')[0].appendChild(script);
    },
    initWidget() {
      if (typeof TradingView === 'undefined') { return; }
      const widget = new window.TradingView.widget(
        Object.assign({ container_id: this.container_id }, this.options)
      );
    },
    sockInit() {
      if ( this.status > 0 ) return;
      try {
        this.status = 0;
        
        this.sock = new WebSocket( 'wss://stream.binance.com:9443/ws/!ticker@arr' );
        this.sock.addEventListener( 'open', this.onSockOpen );
        this.sock.addEventListener( 'close', this.onSockClose );
        this.sock.addEventListener( 'error', this.onSockError );
        this.sock.addEventListener( 'message', this.onSockData );
      }
      catch( err ) {
        console.error( 'WebSocketError:', err.message || err );
        this.status = -1; // error
        this.sock = null;
      }
    },
    onSockData( e ) {
      let list = JSON.parse( e.data ) || [];
      if ( list['error'] ) { console.error(e); }
      if (list.id > 0) { return; }
      
      if (list.e === 'aggTrade') {
        this.trades.unshift([list.E, list.p, list.q, list.m]);
        if (this.trades.length >= 200) {
          this.trades = this.trades.slice(0, 150);
        }
        return;
      }
      if (list.e === 'depthUpdate') {
        // this.asks = list.a;
        // this.bids = list.b;
      }
        
      if (list.e === undefined) {
        for (let item of list) {
          let coin = this.getCoinData(item);
          this.tickers[coin.symbol] = coin;
          if ( coin.symbol === this.ticker) {
            this.status = 2;
          }
        }
        this.cache = Object.keys( this.tickers ).map( s => this.tickers[ s ] );

      }
      
    },
    onSockOpen() {
      this.status = 1; // open
      console.info( 'WebSocketInfo:', 'Connection open.' );
      this.subscribeTicker();
    },
    onSockError( err ) {
      this.status = 0; // error
      console.error( 'WebSocketError:', err.message || err );
      setTimeout(() => { this.sockInit() }, 10000); // try again
    },
    onSockClose() {
      this.status = 0; // closed
      console.info( 'WebSocketInfo:', 'Connection closed.' );
      setTimeout(() => { this.sockInit() }, 10000); // try again
    },
    sockClose() {
      if ( this.sock ) {
        this.sock.close();
      }
    },
    subscribeTicker() {
      let streams = {
        "method": "SUBSCRIBE",
        "params": [
          this.ticker.toLowerCase() + "@aggTrade",
          this.ticker.toLowerCase() + "@depth",
          // this.ticker.toLowerCase() + "@kline_"+this.interval
        ],
        "id": 1
      }
      
      this.sock.send(JSON.stringify(streams));
    },
    unsubscribeTicker() {
      this.trades = [];
      this.depth = [];
      let streams = {
        "method": "UNSUBSCRIBE",
        "params": [
          this.ticker.toLowerCase() + "@aggTrade",
          this.ticker.toLowerCase() + "@depth",
          // this.ticker.toLowerCase() + "@kline_"+this.interval
        ],
        "id": 2
      }
      this.sock.send(JSON.stringify(streams));
    },
    getCoinData(item) {
         let reg = /^([A-Z]+)(BTC|ETH|BNB|USDT|TUSD)$/;
         let symbol = String(item.s).replace(/[^\w\-]+/g, "").toUpperCase();
         let token = symbol.replace(reg, "$1");
         let asset = symbol.replace(reg, "$2");
         let name = token;
         let pair = token + "/" + asset;
         let icon = "/" + token.toLowerCase() + "_.png";
         let open = parseFloat(item.o);
         let high = parseFloat(item.h);
         let low = parseFloat(item.l);
         let close = parseFloat(item.c);
         let change = parseFloat(item.p);
         let percent = parseFloat(item.P);
         let trades = parseInt(item.n);
         let tokenVolume = Math.round(item.v);
         let assetVolume = Math.round(item.q);
         let sign = percent >= 0 ? "+" : "";
         let arrow = percent >= 0 ? "▲" : "▼";
         let info = [
            pair,
            close.toFixed(8),
            "(",
            arrow,
            sign + percent.toFixed(2) + "%",
            "|",
            sign + change.toFixed(8),
            ")"
         ].join(" ");
         let style = "";

         if (percent > 0) style = "green";
         if (percent < 0) style = "red";

         return {
            symbol,
            token,
            asset,
            name,
            pair,
            icon,
            open,
            high,
            low,
            close,
            change,
            percent,
            trades,
            tokenVolume,
            assetVolume,
            sign,
            arrow,
            style,
            info
         };
      },
    parseNumber(number, currency = '') {
    // const formatters = {
    //     default: new Intl.NumberFormat(),
    //     currency: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    //     whole: new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    //     oneDecimal: new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    //     twoDecimal: new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
    // };
      if ( currency.includes(['USDT'])) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' , trailingZeroDisplay: 'stripIfInteger'}).format(number);
      }
      return new Intl.NumberFormat('en-US', { minimumFractionDigits: 10, trailingZeroDisplay: 'stripIfInteger' }).format(number);
    },
    timestampToDate(timestamp) {
      var options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "Asia/Jerusalem",
      };
      return new Intl.DateTimeFormat("en-GB", options).format(timestamp);
    },
    setFavorite(symbol) {
      var index = this.favorites.indexOf(symbol);
      if (index >= 0) {
        delete this.favorites[index];
      } else {
        this.favorites.push(symbol);
      }
    },
    filterAsset( asset ) {
      this.asset = String( asset || this.asset );
    },
    quickSort(arr, key, order) {
      if (arr.length <= 1) {
        return arr;
      }

      const pivotIndex = Math.floor(arr.length / 2);
      const pivot = arr[pivotIndex];
      const left = [];
      const right = [];

      for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) {
          continue;
        }

        if (order === 'asc') {
          arr[i][key] < pivot[key] ? left.push(arr[i]) : right.push(arr[i]);
        } else {
          arr[i][key] > pivot[key] ? left.push(arr[i]) : right.push(arr[i]);
        }
      }

      return [...this.quickSort(left, key, order), pivot, ...this.quickSort(right, key, order)];
    },
    sortBy( key, order ) {
      if ( this.sort !== key ) { this.order = order || 'asc'; }
      else { this.order = ( this.order === 'asc' ) ? 'desc' : 'asc'; }
      this.sort = key;
    },
    async prepareOrderBook() {
      await fetch('https://api.binance.com/api/v3/depth?symbol=' + this.ticker + '&limit=100')
      .then(response => response.text())
      .then(data => {
        let depth = JSON.parse(data);
        this.asks = depth.asks;
        this.bids = depth.bids;
        
        for (let i = 0; i < this.asks.length; i++) {
          var arr = this.asks.map(x => {
            return Number(x[1]);
          });
          this.asks[i].push(arr.slice(0, i+1).reduce((a,b)=>a+b))
        }
        for (let i = 0; i < this.bids.length; i++) {
          var arr = this.bids.map(x => {
            return Number(x[1]);
          });
          this.bids[i].push(arr.slice(0, i+1).reduce((a,b)=>a+b))
        }
      });
      
      this.maxAsk = Math.max(...this.asks.map(x => { return x[2] }));
      setTimeout(async () => { await this.prepareOrderBook() }, 500);
    },
  },
  mounted() {
    this.sockInit();
    this.startClock();
    this.appendScript(this.initWidget);
    this.prepareOrderBook();
  },
  unmounted() {
    this.sockClose();
  },
  computed: {
    statusMsg() {
      let msg = '';
      if (this.status == 0) {
        msg = 'Connecting...';
      }
      if (this.status == 1) {
        msg = 'Loading...';
      }
      if (this.status == 2) {
        msg = 'Done';
      }
      return msg;
    },
    latestTrades() {
      if (!this.showLatestTrades) {return;}
      return this.trades;
    },
    filterTickers() {
      let tickers = this.cache;
      // filter by search
      tickers = this.cache.filter(x => x.symbol.startsWith(this.inputSearch.toUpperCase()));
      // filter by asset
      if ( this.asset == 'FAV') {
          tickers = tickers.filter( i => this.favorites.includes(i.symbol) );
        } else {
          tickers = tickers.filter( i => i.asset === this.asset );
        }
      // sort
      tickers = this.quickSort( tickers, this.sort, this.order );

      return tickers;
    },
  }
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200;300;400;700&display=swap');


  body {
    --color-bg--300: #1e181ef0;
    --color-bg--500: #191a1e;
    --color-primary--500: #e8615a;
    --color-primary--600: #9c3230;
    --color-primary-black: #0e0e18;
    --color-primary-red: #710000;
    --color-primary-yellow: #FDF500;
    --color-primary-green: #1AC5B0;
    --color-primary-blue: #37EBF3;
    --color-primary-purple: #930DB;
    --color-primary-pink1: #E455AE;
    --color-primary-pink2: #CB1DCD;
    --color-primary-silver: #D1C5C0;
    --color-secondary-blue: #37EBF360;
    --font-primary: "Rajdhani", sans-serif;
    --font-secondary: "VT323", monospace;
    --color-green: #1AC5B0;
    --ui-glow: 0 0 5px var(--color-primary--500);
    --ui-glow-borders--500: 0 0 3px var(--color-primary--500);
    --ui-glow-color: currentcolor;
    --ui-glow-text: -9px -6px 40px var(--ui-glow-color);
    --ui-glow-text--dimmed: -9px -6px 40px var(--ui-glow-color);
    --ui-elevation--1: 2px 2px 0 rgba(0, 0, 0, 0.8);
    --ui-notch-amount: 1rem;
    --ui-notch-hypotenuse: 22.627416px; /* hypothenuse of --ui-notch-amount */
    --ui-notch-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - var(--ui-notch-amount) + 2px),
      calc(100% - var(--ui-notch-amount) + 2px) 100%,
      0 100%
    );
    --ui-notch-path-r: polygon(
      100% 0,
      100% 100%, 
      calc(var(--ui-notch-amount) - 2px) 100%, 
      0 calc(100% - var(--ui-notch-amount) + 2px), 
      0 0
    );
    font-family: var(--font-primary);
    color: var(--color-primary--500);
    background-color: var(--color-bg--500);
    background-image: radial-gradient(
      ellipse at 33% 10%,
      #461616 0%,
      transparent 75%
    );
    background-repeat: no-repeat;
    margin: 0;
  }
  body:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  background-image: url('https://images.unsplash.com/photo-1519608487953-e999c86e7455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80');
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
    
  }
  #app {
  }
  .green {
    color: var(--color-primary-green);
  }
  .red {
    color: var(--color-primary--500);
  }
  svg {
    fill: currentcolor;
  }
  .text-glow {
    font-family: var(--font-secondary);
    color: var(--color-primary--500);
    letter-spacing: 0.035rem;
    text-shadow: var(--ui-glow-text);
    text-transform: uppercase;
  }
  header {
    font-family: var(--font-secondary);
    color: var(--color-primary-yellow);
    letter-spacing: 0.035rem;
    text-shadow: var(--ui-glow-text);
    text-transform: uppercase;
  }
  h3 {
  }
  header small {
    color: var(--color-primary-silver);
  }
  .delimiter {
    background-color: var(--color-primary--500);
    box-shadow: var(--ui-glow);
    bottom: 0;
    content: "";
    height: 2px;
    left: 0;
    width: 100%;
  }
  .delimiter2 {
    background-color: var(--color-primary--500);
    box-shadow: var(--ui-glow);
    bottom: 0;
    content: "";
    height: 1px;
    left: 0;
    width: 100%;
  }
  .delimiter-blue {
    background-color: var(--color-primary-blue);
    box-shadow: var(--ui-glow);
    bottom: 0;
    content: "";
    height: 1px;
    left: 0;
    width: 100%;
  }
  .status {
    height: 8px;
    width: 8px;
    background-color: var(--color-primary-silver);
    border-radius: 50%;
    display: inline-block;
  }
  .status.green {
    background-color: var(--color-primary-green);
  }
  .status.red {
    background-color: var(--color-primary--500);
  }
  .silver {
    color: var(--color-primary-silver);
  }
  .clock {
    color: var(--color-primary-silver);
  }
  #vue-trading-view {
    height: 600px;
}
  .cb {
    position: relative;
    background-color: var(--color-bg--300);
    border: 1px solid var(--color-primary--600);
    -webkit-clip-path: var(--ui-notch-path);
    clip-path: var(--ui-notch-path);
  }
  .cb::before {
    background-color: var(--color-primary--600);
    bottom: 5px;
    content: "";
    display: block;
    height: 3px;
    position: absolute;
    right: -6px;
    top: auto;
    transform: rotate(-45deg);
    width: var(--ui-notch-hypotenuse);
    z-index: 100;
  }
  .cb-reverse {
    clip-path: var(--ui-notch-path-r);
  }
  .cb-reverse::before {
    transform: rotate(45deg);
    left: -6px;
  }
  .cb2 {
    position: relative;
    background-color: var(--color-bg--300);
    border: 1px solid var(--color-primary--600);
    -webkit-clip-path: var(--ui-notch-path);
    clip-path: var(--ui-notch-path);
    padding-right: 0.5rem;
  }
  .cb2:hover, .cb2:hover::before, .cb2.active, .cb2.active::before {
    border: 1px solid var(--color-primary-blue);
    color: var(--color-primary-blue);
    background-color: var(--color-secondary-blue);
  }
  .cb2::before {
    background-color: var(--color-primary--600);
    bottom: 5px;
    content: "";
    display: block;
    height: 3px;
    position: absolute;
    right: -6px;
    top: auto;
    transform: rotate(-45deg);
    width: var(--ui-notch-hypotenuse);
    z-index: 100;
  }
  .cb_tab {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  height: 50px; 
  min-width: 250px;
  text-transform: uppercase;
  letter-spacing: 0.035rem;
  text-shadow: var(--ui-glow-text);
  color: var(--color-primary--500);
  background-color: var(--color-primary--600);
  cursor: pointer;
  border: 0;
  outline: none;
  clip-path: polygon(
      4rem 0, 
      4.5rem 0.25rem, 
      100% 0.25rem, 
      100% calc(100% - var(--ui-notch-amount) + 2px),
      calc(100% - var(--ui-notch-amount) + 2px) 100%, 
      0 100%, 
      0 0
    );
  }
  .cb_tab:hover,
  .cb_tab.active {
  color: var(--color-primary-blue);
  }
  .cb_tab div {
    position: absolute;
    padding-top:5px;
    top: 0.1rem;
    left: 0.1rem;
    right: 0.1rem;
    bottom: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg--300);
    clip-path: polygon(
        4rem 0, 
        4.5rem 0.25rem, 
        100% 0.25rem, 
        100% calc(100% - var(--ui-notch-amount) + 2px),
        calc(100% - var(--ui-notch-amount) + 2px) 100%, 
        0 100%, 
        0 0
    );
  }
  .cb-left {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    min-width: 35px;
    text-transform: uppercase;
    letter-spacing: 0.035rem;
    background-color: #8921259c;
    cursor: pointer;
    border: 0;
    outline: none;
    clip-path: polygon(
        20px 5px,
        25px 0, 
        100% 0, 
        100% 50px,
        calc(100% - 3px) 50px,
        calc(100% - 3px) calc(100% - 50px),
        100% calc(100% - 50px),
        100% 100%,
        1rem 100%, 
        0 calc(100% - var(--ui-notch-amount) + 2px), 
        0 5px
      );
  }
  .cb-left div {
    position: absolute;
    padding-top:5px;
    top: 0.1rem;
    left: 0.1rem;
    right: 0.1rem;
    bottom: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #441618;
    clip-path: polygon(
        20px 5px, 
        25px 0, 
        100% 0,
        100% 50px,
        calc(100% - 3px) 50px,
        calc(100% - 3px) calc(100% - 50px),
        100% calc(100% - 50px),
        100% 100%,
        1rem 100%, 
        0 calc(100% - var(--ui-notch-amount) + 2px), 
        0 5px
    );
  }
  
  .cb-left div:after {
    content: "";
    display:block;
    width: 20px;
    height: 5px;
    position: absolute;
    z-index: 99;
    left:0px;
    background-color: transparent;
    border: 1px solid #892125;
    
  }
  .cb-style3 {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    /*min-width: 250px;*/
    height: 50px;
    text-transform: uppercase;
    letter-spacing: 0.035rem;
    background-color: #892125;
    cursor: pointer;
    border: 0;
    outline: none;
    clip-path: var(--ui-notch-path);
    
  }
  .cb-style3::before {
    content: "";
    display:block;
    position: absolute;
    z-inde: -1;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #441618;
    clip-path: var(--ui-notch-path);
  }
  .cb-style3::after {
    content: "";
    display:block;
    width: 20px;
    height: 5px;
    position: absolute;
    left:2px;
    background-color: transparent;
    border: 1px solid #892125;
  }
  .cb-style3:hover {
    border: 1px solid var(--color-primary-blue);
    color: var(--color-primary-blue);
    background-color: var(--color-primary-blue);
    z-index:10;
  }
  .cb-style3-left {
    clip-path: var(--ui-notch-path-r);
  }
  .cb-style3-left::before {
    clip-path: var(--ui-notch-path-r);
  }
  .cb-style3-left::after {
    right:0;
    transform: translateX(227px)
  }
  .cb-style3-left:hover::after {
    border: 1px solid var(--color-primary-blue);
  }
  
  .tickers .header,
  .trades .header,
  .orders .header {
    color:  var(--color-primary-blue);
  }

  .dotdotdot {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  
  .orders .header > div,
  .orders .body > div {
     flex: 1; 
  }
.overflow-y-scroll::-webkit-scrollbar {
  background: transparent;
  width: 5px;
}
 
.overflow-y-scroll::-webkit-scrollbar-thumb {
  background-color: var(--color-primary--500);
}
  
  /* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  opacity: 0;  
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transition: opacity 0.5s ease;
}

</style>
