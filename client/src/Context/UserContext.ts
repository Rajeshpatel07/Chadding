import React, { useContext, createContext, ReactNode, useMemo } from 'react';

const userContext = createContext({
  userId: JSON.parse(localStorage.getItem("userId")),
  username: JSON.parse(localStorage.getItem("Username"))
})

export const UserContextProvider: React.FC<ReactNode> = ({ props }) => {
  const userId = (useMemo(() => JSON.parse(localStorage.getItem("userId")), []))
  return (
    <userContext.Provider value= { userId } >
    { props.children }
    < /userContext.Provider>
  )
}

export const useUser = () => {
  return useContext(userContext);
}
