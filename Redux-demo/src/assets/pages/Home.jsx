import React from 'react'
import { useSelector } from 'react-redux'
import Product from '../../components/product'
import { getAllProducts, getProductError, getProductLoadingState } from '../../store/slices/productSlice'
// import { getAllCartItems } from '../../store/slices/cartSlice'


export default function Home  ()  {
    const ProductsList=useSelector(getAllProducts)
    console.log("productlist",ProductsList)
    const isLoading=useSelector(getProductLoadingState)
    // const cartItems = useSelector(getAllCartItems)
    // console.log("cartitems",cartItems)
  const error=useSelector(getProductError)
  //   useSelector((state)=>{
  //   console.log(state)
  //  })
    return isLoading?(<h1 style={{textAlign:'center'}}>Loading....</h1>):error?(<h2 style={{textAlign:'center'}}>{error}</h2>):(
    
    <div className='products-container'>
    {
      ProductsList?.map(({id,title,rating,price,image}) => (
      <Product key={id} productId={id} title={title} rating={rating.rate} price={price} imageUrl={image}/>
     
      ))

    }
     
     {/* <Scriptt/> */}
  
    </div>

  )
}
