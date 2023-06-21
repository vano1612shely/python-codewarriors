import React, { useState } from "react"
import "./style.css"

const Tabs = ({ tabs, handler, style = {} }) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index) => {
    setActiveTab(index)
  }

  return (
    <div className="tabs" style={style}>
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => {
              handleTabClick(index)
              handler(tab)
            }}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tabs
