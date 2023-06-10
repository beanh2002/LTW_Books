import React from "react"
import { Header } from "../common/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Home } from "../home/Home"
import { Footer } from "../common/Footer"
import { Details } from "../home/details/Details"
import { ProductShop } from "../home/product/ProductShop"
import Login from "../Login/Login"
import Signup from "../SignUp/Signup"
import DetailPro from "../home/details/DetailPro"
import Admin from "../home/Admin/Admin"
import CategoryAdmin from "../home/Admin/CategoryAdmin"
import EditCategory from "../home/Admin/EditCategory"
import BookAdmin from "../home/Admin/BookAdmin"
import AddBook from "../home/Admin/AddBook"
import EditBook from "../home/Admin/EditBook"
import AddCategory from "../home/Admin/AddCategory"
import Account from "../home/Account/Account"

export const Pages = ({ cartItems }) => {
  return (
    <>
      <Router>
        <Header />
          <Switch>
            <Route exact path='/home'>
              <Home cartItems={cartItems} />
            </Route>
            <Route exact path='/cart/:id'>
              <Details />
            </Route>
            <Route exact path='/carts/:id'>
              <DetailPro />
            </Route>
            <Route exact path='/shop'>
              <ProductShop />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>
            <Route exact path='/admin'>
              <Admin />
            </Route>
            <Route exact path='/adminCategory'>
              <CategoryAdmin />
            </Route>
            <Route exact path='/adminAddCategory'>
              <AddCategory />
            </Route>
            <Route exact path='/adminEditCategory/:id'>
              <EditCategory />
            </Route>
            <Route exact path='/adminBook'>
              <BookAdmin />
            </Route>
            <Route exact path='/adminAddBook'>
              <AddBook />
            </Route>
            <Route exact path='/adminEditBook/:id'>
              <EditBook />
            </Route>
            <Route exact path='/account'>
              <Account />
            </Route>
          </Switch>
        <Footer />
      </Router>
    </>
  )
}
