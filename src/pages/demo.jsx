import React from 'react'
import { useGetCrmDataQuery } from '../redux/RTK_Query/crmApi'
const Demo = () => {
  const likuData = 'latitude=51.5085&longitude=-0.1257'
  const {data,isLoading,error}=useGetCrmDataQuery(likuData)
  console.log(data,isLoading,error);
  
  return (
    <div>hello</div>
  )
}

export default Demo