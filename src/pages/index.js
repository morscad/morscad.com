import React, { useContext, useEffect, useState } from "react"

import MainLayout from "../components/layouts/MainLayout"
import HomepageNav from "../components/home/HomepageNav"
import MainContext from "../context/MainContext"


const IndexPage = () => {
  const [state, setState] = useContext(MainContext);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      setState({ ...state, currentSection: 'home'});
      setInit(true);
    }
  }, [init]);
  return (
      <MainLayout>
        <HomepageNav />
      </MainLayout>
  )
}

export default IndexPage
