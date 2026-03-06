import { useState } from 'react'
import { BsBookmarkPlus } from 'react-icons/bs'

const Toggler = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisiblity}
          className="flex flex-row gap-2 items-center"
        >
          <BsBookmarkPlus /> {buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible} className="flex flex-col gap-4">
        {children}
        <button
          onClick={toggleVisiblity}
          className="text-error border-2 border-error"
        >
          cancel
        </button>
      </div>
    </div>
  )
}

export default Toggler
