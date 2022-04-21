import React, { useContext, useMemo, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { authService } from "../services/auth.service";
import { useParams } from "react-router-dom";
// import useFireStoreList from "../hooks/useFireStoreList";

export const AppContext = React.createContext();

export default function AppProviderContext({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteUsersVisible, setIsInviteUsersVisible] = useState(false);

  const user = authService.getCurrentUser();

  const roomCondition = useMemo(() => {
    return {
      fieldsName: "members",
      operator: "array-contains",
      compareValue: user.id,
    };
  }, [user.id]);

  const rooms = useFirestore("rooms", roomCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        isInviteUsersVisible, 
        setIsInviteUsersVisible,

      }}
    >
      {children}
    </AppContext.Provider>
  );
}
