import React, { useContext, useEffect } from "react"
import { has, cloneDeep, isEqual } from "lodash"
import "./FiltersHeader.scss"
import MainContext from "../../context/MainContext"

const FiltersHeader = () => {
  const [state, setState] = useContext(MainContext)

  useEffect(() => {
    if (has(state, "categories") && state.categories.length !== 0) {
      const categories = cloneDeep(state.categories)
      categories.forEach(cat => {
        cat.highlight = false
        if (
          has(state, "hoveredProject.categories") &&
          state.hoveredProject.categories.length > 0
        ) {
          const matchingCats = state.hoveredProject.categories.filter(
            selectedCat => selectedCat.id === cat.id
          )
          cat.highlight = matchingCats.length > 0
        }
      })
      if (!isEqual(categories, state.categories)) {
        setState({ ...state, categories: categories })
      }
    }
  }, [state])

  const toggleCatSelection = catID => {
    const categories = state.categories
    categories.forEach(newCat => {
      if (newCat.id === catID) {
        newCat.selected = !newCat.selected
      }
    })
    setState({ ...state, categories: categories })
  }

  return (
    <div className={"filterContainer"}>
      <div className={"categoryTitle"}>Categories:</div>
      {state.categories.map(cat => (
        <>
          {cat.name !== "Uncategorized" && cat.name !== "Portfolio" && (
            <div
              data-selected={cat.selected}
              className={`categoryItem ${
                cat.highlight
                  ? "highlighted"
                  : state.hoveredProject &&
                    state.hoveredProject.categories.length > 0
                  ? "shadow"
                  : "normal"
              }`}
              onClick={() => {
                toggleCatSelection(cat.id)
              }}
            >
              {cat.name}
            </div>
          )}
        </>
      ))}
    </div>
  )
}

export default FiltersHeader
