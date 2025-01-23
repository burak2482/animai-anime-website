import { useContext } from "react"
import { AuthContext } from "./authContext"

export const useAuthContext = () => {
  try {
   const context = useContext(AuthContext)

   if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
   }
   
   return context;
  } catch (err) {
    console.log(err)
  }
}