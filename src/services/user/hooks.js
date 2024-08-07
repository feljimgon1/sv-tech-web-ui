import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchToken } from './'
import { FETCH_TOKEN } from './action-types'
// import {
//   getIsRequestDone,
//   getHasRequestError,
//   getIsRequestPending
// } from '../communication'
// import { getApis } from 'services/config'

export const useFetchToken = () => {
  const dispatch = useDispatch()
  // const isDone = useSelector(getIsRequestDone(FETCH_TOKEN))
  // const isPending = useSelector(getIsRequestPending(FETCH_TOKEN))
  // const hasError = useSelector(getHasRequestError(FETCH_TOKEN))

  useEffect(() => {
    // if (!(isDone || isPending)) {
    //   dispatch(fetchToken())
    // }
  }, [dispatch])

  return [isDone, hasError]
}
