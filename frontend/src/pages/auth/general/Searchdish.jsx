import React from 'react'

const Searchdish = () => {
    
  return (
    <div>
        <div class="max-w-3xl mx-auto mt-10 p-4">

  <input 
    id="searchBox"
    type="text"
    placeholder="Search dishes, restaurants..."
    class="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-400"
  />

  <div id="results" class="mt-5 grid gap-4"></div>

</div>
      
    </div>
  )
}

export default Searchdish
