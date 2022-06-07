import { useState, useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { get } from '../../utils/ApiCaller'
import LocalStorageUtils from './../../utils/LocalStorageUtils'
import { Content } from './style'

const Home = () => {
  const [data, setData] = useState([])
  const getData = async () => {
    const user = LocalStorageUtils.getUser()
    const token = LocalStorageUtils.getToken()
    let response
    await get('/api/user/' + user.id, {}, { token: token })
      .then((res) => (response = res))
      .catch((err) => {
        LocalStorageUtils.removeItem('token')
        return <Navigate to="/login" replace />
      })
    setData(response)
  }
  useEffect(() => {
    getData()
  }, [])
  console.log(data)
  if (data.data?.status === 403) {
    LocalStorageUtils.removeItem('token')
    return <Navigate to="/login" replace />
  }
  return <Content>Hello</Content>
}

export default Home
