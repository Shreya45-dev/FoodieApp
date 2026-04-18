import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import Home from '../pages/auth/general/Home'
import Oye from '../pages/auth/general/Oye'
import CreateFood from '../pages/food-partner/CreateFood'
import Prrofile from '../pages/food-partner/Prrofile'
import Shorts from '../pages/auth/general/Shorts'
import Createfoodwthrestaurant from '../pages/food-partner/Createfoodwthrestaurant'
import Dishprofile from '../pages/food-partner/Dishprofile'
import Dishpagesame from '../pages/auth/general/Dishpagesame'
import FoodPartnerpage from '../pages/food-partner/FoodPartnerpage'
import MainPage from '../pages/auth/MainPage'
import Alldish from '../pages/food-partner/Alldish'
import Editdishh from '../pages/food-partner/Editdishh'
import Searchdish from '../pages/auth/general/Searchdish'

const AppRoutes=()=>{

    return(
        <Router>
            <Routes>
                <Route path="/user/register" element={<UserRegister/>}/>
                <Route path="/user/login" element={<UserLogin/>} />
                <Route path="/shorts" element={<Shorts/>}/>
                <Route path="/food-partner/register" element={<FoodPartnerRegister/>}/>
                <Route path="/food-partner/login" element={<FoodPartnerLogin/>}/>
                <Route path="/food-partner/page/:id" element={<FoodPartnerpage/>}/>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/Home" element={<Home/>}/>
                  <Route path="/oyee" element={<Oye/>}/>
                    <Route path="/create-food" element={<CreateFood />}/>
                <Route path="/food-partner/:id" element={<Prrofile/>}/>
                <Route path="/restaurantcreatewithfood" element={<Createfoodwthrestaurant/>}/>
                <Route path="/food-partner/restaurantdish/:id" element={<Dishprofile/>}/>
                <Route path="/dish/:name" element={<Dishpagesame/>}/>
                <Route path="/alldish" element={<Alldish/>}/>
                <Route path="/edit/dish/:id" element={<Editdishh/>}/>
                <Route path="/searchdish" element={<Searchdish/>}/>

                
             
                
                
            </Routes>
        </Router>
        
    )

}
export default AppRoutes
