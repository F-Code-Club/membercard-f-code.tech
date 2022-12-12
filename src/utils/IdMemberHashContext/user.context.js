import { createContext, useState } from 'react'

// import { createContext, useContext, useState } from 'react'
// export const UserContext = createContext({
//   setHashId: () => null,
//   hashId: null,
// })
// export const UserProvider = ({ children }) => {
//   const [hashId, setHashId] = useState(null)
//   const value = {
//     setHashId,
//     hashId,
//   }
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>
// }
// export const UseUserContext = () => {
//   return useContext(UserContext)
// }

export const UserContext = createContext({
  setHashId: () => null,
  setUser: () => null,
  setEventId: () => null,
  setGetAllMembers: () => null,
  hashId: null,
  user: null,
  eventId: null,
  isLoading: false,
  getAllMembers: null,
})

export const UserProvider = ({ children }) => {
  const [hashId, setHashId] = useState(null)
  const [user, setUser] = useState(null)
  const [getAllMembers, setGetAllMembers] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const value = {
    hashId,
    setHashId,
    user,
    setUser,
    getAllMembers,
    setGetAllMembers,
    isLoading,
    setIsLoading,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
