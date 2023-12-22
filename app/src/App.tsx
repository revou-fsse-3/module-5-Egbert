import { createContext, useContext, useState } from "react"
import SectionOne from "./components/SectionOne.js"
import SectionTwo from "./components/SectionTwo.js"
import SectionThree from "./components/SectionThree.js"

const AppContext = createContext({} as {
    setShowSection: (showSection: number) => void, showSection: number 
}) 

export const useAppContext = () => {
    return useContext(AppContext)
}

const App = () => {
const [showSection, setShowSection] = useState(1)

return (
    <AppContext.Provider value={{setShowSection, showSection}}> 
    {showSection == 1 && <SectionOne />}

    {showSection == 2 && <SectionTwo />}

    {showSection == 3 && <SectionThree />}
    </AppContext.Provider>
)
}

export default App