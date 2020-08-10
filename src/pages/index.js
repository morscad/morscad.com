import React, { useContext, useEffect, useState } from "react"

import MainLayout from "../components/layouts/MainLayout"
import HomepageNav from "../components/home/HomepageNav"
import MainContext from "../context/MainContext"
import SEO from "../components/system/SEO"


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
        <SEO />
        <HomepageNav />
      </MainLayout>
  )
}

export default IndexPage
