import React, { useState } from "react"

const defaultState = {
  currentSection: ''
}
const MainContext = React.createContext(defaultState)

const MainContextProvider = ({children}) => {
  const [state, setState] = useState({ currentSection: '' });
  return <MainContext.Provider value={[state, setState]}>{children}</MainContext.Provider>
}

export default MainContext;
export { MainContextProvider }
