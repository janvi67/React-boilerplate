import React from 'react'
import {createStore} from 'redux'
// import { MyCreateStore } from './myredux';


const countElement=document.querySelector('.count-')
export default function Scriptt() {

const initialState={
  count:0,
  name:"janvi",
  age:23
}
const INCREMENT='count/increment';
const DECREMENT='count/decrement';
const INCREMENT_BY='count/incrementBy';
// let prevState=state
// console.log("prev state",prevState)
// console.log("state",state)
function reducer(state=initialState,action){

  //mutating
  // state.count=state.count+1

  //not mutating
  if(action.type==INCREMENT){
  return {...state,count:state.count+1}
  }
  else if (action.type==DECREMENT){
    return{...state,count:state.count-1}
  }
  else if(action.type==INCREMENT_BY){
    return{...state,count:state.count+action.payload}
  }
  return state
}
// const storee=MyCreateStore(reducer);
// console.log("my store",storee)

const store= createStore(reducer,__REDUX_DEVTOOLS_EXTENSION__());


store.subscribe(()=>{
  // console.log(store.getState())
  // countElement.innerText=store.getState().count
})

// countElement.innerText=store.getState().count
store.dispatch({type:INCREMENT})
store.dispatch({type:DECREMENT})
store.dispatch({type:INCREMENT_BY, payload:10})
setTimeout(()=>{
  store.dispatch({type:DECREMENT})
},2000)
// countElement.addEventListener('click',()=>{
//   store.dispatch({type:INCREMENT})
// })
// reduxstate=reducer(reduxstate,{type:'count/increment'})
// console.log(reduxstate)

// reduxstate=reducer(reduxstate,{type:'count/decrement'})
// console.log(reduxstate)


// reduxstate=reducer(reduxstate,{type:'count/incrementBy',payload:10})
// console.log(reduxstate)
// increment();
// console.log(state)
// increment();
// console.log(state)
// increment();
// console.log("state",state)
// console.log(prevState==state)

  return (
    <div>script
     
    <h2>count:<span className='count-'></span></h2>
    
    
    </div>
  )
}
