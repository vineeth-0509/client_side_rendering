/*
popdrilling :
Before we begin,how do you think one should one manage state?
1.keep everything in the top level component(c1)
2.Keep everything as low as possible(at the LCA of children that need a state)
-The ideal answer is you keep at some low level component,always push down te state as much as possible

-Either way,you will need to drill props down through the Component tree.
This gets very hard to maintain and highly verbose makes code highly unreadable.
Prop drilling doesn't mean that parent re-renders children it just means the syntacyic uneasiness when writing code.

CONTEXT API:it makes very easy to pass state variable between components without drilling them down,,it lets you teleports state components
1)This guy lets you fix anf get drill of proper drilling
RESOURCE: https://react.dev/learn/passing-data-deeply-with-context
2)if you use the context api,you're pushing your state management outside the core react components,
it lets u keep all state logic ouside of your core react comp.


*/

// import react from 'react'
// import{useState} from 'react'
// function App(){
// const [count,setCount]=useState(0);
//   return (
//     <div>
//       <Count count={count} setCount={setCount}/>
    
//     </div>
//   )
  
// }
// function Count({count}){
//   return <div>
//     {count}
//     <Buttons count={count} setCount={setCount}/>
//   </div>
// }

// function Buttons(count,setCount){
// return <div>
//   <button onClick={()=>{
//     setCount(count+1)
//   }}>Increase</button>

//   <button onClick={()=>{
//     setCount(count-1)
//   }}>Decrease</button>

  
//   </div>
  
// }

// export default App

// let's create a simple Counter application,first without the context api and then with it
// Things to learn: createContext,provider,useContext hook
//Goal of the ContextApi:it let you teleport props from 1 component to another without passing down the chain,it is the goal of the contextapi.

import { useContext, useState } from "react"
import { CountContext } from "./context";


function App() {
  const [count, setCount] = useState(0);
  
  // wrap anyone that wants to use the teleported value inside a provider
  return (
    <div>
      <CountContext.Provider value={count}>
        <Count setCount={setCount} />
      </CountContext.Provider>
    </div>
  )
}

function Count({setCount}) {
  return <div>
    <CountRenderer />
    <Buttons setCount={setCount} />
  </div>
}

function CountRenderer() {
  const count = useContext(CountContext);

  return <div>
    {count}
  </div>
}

function Buttons({setCount}) {
  const count = useContext(CountContext);
  return <div>
    <button onClick={() => {
      setCount(count + 1)
    }}>Increase</button>

    <button onClick={() => {
      setCount(count - 1)
    }}>Decrease</button>
  </div>
}

export default App