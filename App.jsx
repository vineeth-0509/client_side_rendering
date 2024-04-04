//Suspense API,asynchronous component fetching ,asynchronous data fetching
// import {Suspense,lazy} from "react";
// import {BrowserRouter, Routes,Route,useNavigate} from 'react-router-dom'
// import './App.css'
// //if we didnt use the default in the Dashboard and Landing we should write it in a curly braces.
// const Dashboard =lazy(()=> import('./components/Dashboard'))
// const Landing =lazy(()=>import('./components/Landing'))

// function App() {
  
// //basically we have to introduce the suspense API
//   return (
   
//     <div>
      
//     <BrowserRouter>

//     <Appbar/>
//     <Routes>
//     //here we can add multiple pages if we need those for our project
//       <Route path="/dashboard" element={<Suspense fallback={"loading..."}><Dashboard/></Suspense>}/>
//       <Route path="/" element={<Suspense fallback={"loading..."}><Landing/></Suspense>}/>
//     </Routes>
//     </BrowserRouter>
//     </div>
//   )
// }
// function Appbar(){
//   const navigate=useNavigate();
//   return <div >
//       <button style={{background:"black",color:"white"}} onClick={()=>{
//           navigate("/");
//       }}>landing Page</button>
//       <button style={{background:"black",color:"white"}} onClick={()=>{
//         navigate("/dashboard");
//       }}>Dashboard</button>
//       </div>
// }
// export default App

/**
 -If we are doing client side routing,if we change the page we get no html from the backend and no js from thr backend
 window.location.href is not the right way to routr from 1 page to another,if we are usign client side routing.
  window.location.href is just landing in another page and fetching html again
  -> use the useNavigate() hook exported from 'react-router-dom' library it makes sure it not makes hard reload of the page,it simply changing the route and keeping the same client bundle
  and changing the page because the route has changed
  ->    //to use the useNavigate hook put a component inside the BrowserRoute and write the block of code outsdie the BrowserRoute
  -> useNavigate() is the right way to switch from 1 page to another when we are doing the client side routing
  ->from the above code the navigate is the right way to use the useNavigation.so,that we dont fetch the html and index.js bundle from the bakend again and again.
  ->"useNavigate() hook can only  be invoked in a component,that is insde the BrowserRouter and not in a componenet that is outside the BrowserRouter. "

  lazyloading::
  mainly sometimes person only comes to the Landing page,they will never go into the dashboard and other pages in the webpage.
  so,at the once it loads all the bundle of code including the js and html which also related to the dashboard where the person at 
  present is at the landing page.
  ->it is good to give the small bundle of codes,when we landed into other pages,where the code only related to only that page instead of 
  getting the whole webpage bundle code.
  ->react-router-dom introduced lazy loading which basically states,you can change the code little bit and if you do,we will make sure the person is on
  page 1,they will only get the bundle,the main react bundle and the code for page1,if they go to page2 they will get the extra code for the page 2 and for page3 ,they will
  get extra code for the page3 so on and so forth,they will lazyly load more page code they.
  ->"whatever the component you have wrap it inside the react.lazy()",  react.lazy() which takes function as input which will lazily import the component when it needs it

synatx:

import React,{useCallback,useEffect,useRef,useState} from 'react'
import {BrowserRouter, Routes,Route,useNavigate} from 'react-router-dom'
import {Dashboard} from './components/Dashboard'
import {Landing} from './components/Landing'
const Dashboard=React.lazy(()=> import("./components/Dashboard"));

function App(){
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/dashboard" element={
      <Dashboard/>
    }/>
    <Route path="/*"element={<Landing/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App
 */


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

// import { useContext, useState } from "react"
// import { CountContext } from "./context";


// function App() {
//   const [count, setCount] = useState(0);
  
//   // wrap anyone that wants to use the teleported value inside a provider
//   return (
//     <div>
//       <CountContext.Provider value={count}>
//         <Count setCount={setCount} />
//       </CountContext.Provider>
//     </div>
//   )
// }

// function Count({setCount}) {
//   return <div>
//     <CountRenderer />
//     <Buttons setCount={setCount} />
//   </div>
// }

// function CountRenderer() {
//   const count = useContext(CountContext);

//   return <div>
//     {count}
//   </div>
// }

// function Buttons({setCount}) {
//   const count = useContext(CountContext);
//   return <div>
//     <button onClick={() => {
//       setCount(count + 1)
//     }}>Increase</button>

//     <button onClick={() => {
//       setCount(count - 1)
//     }}>Decrease</button>
//   </div>
// }

// export default App


// import { useContext, useMemo, useState } from "react"
// import { CountContext } from "./context";
// import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// import { countAtom, evenSelector } from "./store/atoms/count";

// function App() {
//   return (
//     <div>
//       <RecoilRoot>
//         <Count />
//       </RecoilRoot>
//     </div>
//   )
// }

// function Count() {
//   console.log("re-render");
//   return <div>
//     <CountRenderer />
//     <Buttons />
//   </div>
// }

// function CountRenderer() {
//   const count = useRecoilValue(countAtom);
  
//   return <div>
//     <b>
//       {count}
//     </b>
//     <EvenCountRenderer />
//   </div>
// }

// function EvenCountRenderer() {
//   const isEven = useRecoilValue(evenSelector);

//   return <div>
//     {isEven ? "It is even" : null}
//   </div>
// }

// function Buttons() {
//   const setCount = useSetRecoilState(countAtom);
//   console.log("buttons re-rendererd");

//   return <div>
//     <button onClick={() => {
//       setCount(count => count + 1)
//     }}>Increase</button>

//     <button onClick={() => {
//       setCount(count => count - 1)
//     }}>Decrease</button>
//   </div>
// }

// export default App

/**
 * Recoil:
 * A state management library for React written by some ex React folks(i think)
 * 
 * other popular ones-
 * 1.zustand
 * 2.Redux.
 
  Recoil:
  Has a concept of an atom to store the state.
  An atom can be defined outside the component
  Can be teleported to any component.
  ->90% of the recoil happens is creating atoms adn selectors.
  an atom similar to the usestate hook that we are using,where it also helps ind defining state variable. 
  we can update by using the update and get the state variable
  Things to learn-
  RecoilRoot
  atom
  useRecoilState
  useRecoilValue
  useSetRecoilState
  selector
 */