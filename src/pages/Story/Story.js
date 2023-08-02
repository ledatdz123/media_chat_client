import React from 'react'
import StoryViewer from '../../components/Story/StoryComponent/StoryViewer'

const Story = () => {

  const story=[
    {
      image: "https://cdn.pixabay.com/photo/2016/11/29/06/08/woman-1867715_1280.jpg"
    },
    {
      image: "https://cdn.pixabay.com/photo/2021/06/25/13/22/girl-6363743_1280.jpg"
    },
    {
      image: "https://cdn.pixabay.com/photo/2016/06/19/12/46/woman-1466628_1280.jpg"
    },
    {
      image: "https://cdn.pixabay.com/photo/2016/06/21/23/05/girl-1472185_1280.jpg"
    }
  ]
  return (
    <div>
      <StoryViewer stories={story}/>
    </div>
  )
}

export default Story