const MainContainer = (props) => {
  return (
    <main
      style={{
        marginLeft: "100px",
        padding: "15px",
        minHeight: "100vh",
        // width: "calc(100vw - 100px)",
      }}
    >
      {props.children}
    </main>
  )
}

export default MainContainer
