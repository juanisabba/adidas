import React from 'react'

const ContentLoader = ({props}) => {
  return (
    <ContentLoader 
    speed={2}
    width={"100%"}
    height={"50vw"}
    backgroundColor="#d9d9d9"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="calc(4vw - 16px)" y="14%" rx="0" ry="0" width="calc(23vw - 2px)" height="23vw" /> 
    <rect x="calc(4vw - 3px)" y="calc(14% + 25vw)" rx="0" ry="0" width="17vw" height="1vw" /> 
    <rect x="calc(4vw - 3px)" y="calc(14% + 27vw)" rx="0" ry="0" width="10vw" height="1vw" /> 
  </ContentLoader>  )
}

export default ContentLoader