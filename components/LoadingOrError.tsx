import React from 'react'
import Layout from './Layout'

type LoadingOrErrorProps<T> = {
  title: T
  message: T
}

const LoadingOrError = (props: LoadingOrErrorProps<string>): JSX.Element => {
  return (
    <Layout title={props.title}>
      <p>{props.message}</p>
    </Layout>
  )
}

export default LoadingOrError
