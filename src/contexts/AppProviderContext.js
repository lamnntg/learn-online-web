import React, { useContext, useMemo, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { authService } from "../services/auth.service";
// import useFireStoreList from "../hooks/useFireStoreList";

export const AppContext = React.createContext();

export default function AppProviderContext({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteUsersVisible, setIsInviteUsersVisible] = useState(false);

  const [sellectedRoomId, setSellectedRoomId] = useState("");
  const user = authService.getCurrentUser();

  const roomCondition = useMemo(() => {
    return {
      fieldsName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user.id]);

  const rooms = useFirestore("rooms", roomCondition);
  const sellectedRoom = rooms.find(
    (room) => room.id == sellectedRoomId.toString()
  );


  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        sellectedRoomId,
        setSellectedRoomId,
        sellectedRoom,
        isInviteUsersVisible, 
        setIsInviteUsersVisible,

      }}
    >
      {children}
    </AppContext.Provider>
  );
}
