import './PortfolioContainer.scss';
import React from "react"
import FiltersHeader from "./FiltersHeader"
import PortfolioGrid from "./PortfolioGrid"

const PortfolioContainer = ({pageTitle}) => {
  return(
    <section className={"portfolio"}>
      <h1 className={"titleContainer"}>{pageTitle.toUpperCase()}</h1>
      <FiltersHeader />
      <PortfolioGrid />
    </section>
  );
}
export default PortfolioContainer;
