import { Timestamp } from "firebase/firestore";
// DailyInterface.ts

export interface UserDaily {
    claimedTime: Timestamp | Date | null;
    claimedDay: number;
  }
  
  export interface User {
    uid: string;
    daily?: UserDaily;
  }
  
  export interface DailyProps {
    user: User;
    dispatch: any; // Replace `any` with the appropriate Redux Dispatch type if possible.
  }
  