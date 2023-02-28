import {useEffect, useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import RecipeList from '../components/RecipeList'
import Request from '../helpers/request'
import RecipeContainer from './RecipeContainer'

const Maincontainer = () => {



  return (
    <>
{/* <Routes>
    <Route path='/recipes/*' element={<RecipeContainer />} />
</Routes> */}
<p>Maincontainer page</p>
      
    </>
    
  )
}

export default Maincontainer
