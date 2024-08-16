// export function MyCreateStore(reducer){

//     let state
//     const listeners=[]
//      const store={
//         getState(){
//             return state
//         },
//         dispatch(action){
//            state= reducer(state,action)
//            listeners.forEach((listener)=>{
//             listener()

//            })
//         },
//         subscribe(listener){
//             listeners.push(listener)

//         }
//     }
//     state.dispatch({type:'@@INIT'})
//     return store
// }