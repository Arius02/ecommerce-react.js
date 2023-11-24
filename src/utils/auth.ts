import useQueryHook from "../hooks/useCartQueryHook";
import decode from "./decode";

type Props = {
    
}

const auth = async() => {
  const token = localStorage.getItem('token')||""
 const {_id} = decode(token)

}

export default auth