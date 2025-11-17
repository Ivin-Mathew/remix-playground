import React from 'react'

type Props = {}

/* Something with scrolltrigger since i didnt use that across the website. try to make this section longer than the others, and transition to the next screen when end of section reached rather than on motion */
const Screen4 = (props: Props) => {
  return (
    <div className={`absolute screen4 h-screen w-screen bg-blue-600`}>
      This is screen 4.
    </div>
  )
}

export default Screen4