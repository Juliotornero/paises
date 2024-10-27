import { BrowserRouter, Routes, Route } from "react-router-dom"
import CountryView from "./views/CountryView"
import View2 from "./views/View2"
import View1 from "./views/View1"
import Layout from "./layouts/Layout";




const Router = () => {
  return (
    <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<CountryView/>} index/>
                    <Route path="/vista1" element={<View1/>}/>
                    <Route path="/vista2" element={<View2/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
  )
}

export default Router