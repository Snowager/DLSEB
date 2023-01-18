import React, { useEffect, useState } from 'react'

const citiesList = () => {
    


    return 
    <div>
      {filteredData.map((city, index) => (

        <div key={index} className="box">{city}</div>))}
    </div>
}