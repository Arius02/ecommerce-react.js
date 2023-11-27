import {ReactNode, useContext} from 'react'
import  {AppContext} from '../../context/AppContext'
import {Navigate} from "react-router-dom"
type Props = {
    children: ReactNode
}
const NotAuthRouter = ({children}:Props) => {
    const {auth}= useContext(AppContext)
  return !auth._id?children: <Navigate to="/"/>
}
export default NotAuthRouter;