import React from 'react'

function Btn({name}) {
  return (
    <div>
        <button className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 cursor-pointer`
                                    }>{name}</button>
    </div>
  )
}

export default Btn