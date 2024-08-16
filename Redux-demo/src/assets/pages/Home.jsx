import React from 'react'
import { useSelector } from '../../react-redux'
import Product from '../../components/product'


export default function Home  ()  {
    const ProductsList=useSelector((state)=>state.products)
  useSelector((state)=>{
    console.log(state)
   })
    return (
    <div className='products-container'>
    {
      ProductsList?.map(({id,title,rating,price,image}) => (
      <Product key={id} productId={id} title={title} rating={rating.rate} price={price} imageUrl={image}/>
     
      ))
    }
      <h1>hello</h1>
     {/* <Scriptt/> */}
  
    </div>

  )
}
