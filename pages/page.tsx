import React from 'react'
import { useState, useEffect } from 'react';
import getListings from './actions/getListings'

function page(){

    const [listings, setListings] = useState([]);

    useEffect(() => {

      async function fetchData() {
        try {
          
          const response = await fetch('/api/listings/route');
          const data = await response.json();
          setListings(data);
          //also make a check for the response to be in array form not object

        } catch (error) {
          console.error(error);
        }
      }
  
      fetchData();
    }, []);

  return (
    <div>
        
        My future listings 
        
        {Array.isArray(listings) && listings.map((listing:any) => (
          <div key={listing.id}>
            <h2>{listing.title}</h2>
            {/* <p>{listing.description}</p>     */}
          </div>
        ))}
    </div>  
  )

}

export default page;