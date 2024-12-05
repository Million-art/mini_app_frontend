import { selectUser } from "@/store/slice/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const CalculateNums = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => selectUser(state));
    
  return (
    <div>CalculateNums</div>
  )
}

export default CalculateNums