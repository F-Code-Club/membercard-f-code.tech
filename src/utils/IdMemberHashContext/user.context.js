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
  hashId: null,
  user: null,
  eventId: null,
})

export const UserProvider = ({ children }) => {
  const [hashId, setHashId] = useState(null)
  const [user, setUser] = useState(null)
  const [eventId, setEventId] = useState(null)

  const value = { hashId, setHashId, user, setUser, eventId, setEventId }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
