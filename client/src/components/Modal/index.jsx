import "./style.css"

const Modal = ({ visible, closeHandler, content, size = [600, 500] }) => {
  return (
    <>
      {visible ? (
        <div className="modal">
          <div className="modal_bg" onClick={closeHandler}></div>
          <div
            className="modal_block"
            style={{
              width: size[0],
              height: size[1],
              left: `calc(50% - ${size[0] / 2}px`,
              top: `calc(50% - ${size[1] / 2}px`,
            }}
          >
            <button className="modal_close" onClick={closeHandler}>
              X
            </button>
            <div className="modal_content">{content}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default Modal
