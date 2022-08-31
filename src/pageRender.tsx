import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from './utils/Typescript'
import NotFound from './components/global/NotFound'
import { useDispatch } from 'react-redux'

const generatePage = (pageName: string) => {
   const component = () => require(`./pages/${pageName}`).default;
   try {
      return React.createElement(component())
   } catch(err: any) {
      return <NotFound />
   }
}
const PageRender = () => {
   const { page, slug}: IParams = useParams()
   let pageName = ''
      if(slug) {
         pageName = `${page}/[slug]`
      } else  {
         pageName = `${page}`
      }
   return generatePage(pageName)
}

export default PageRender