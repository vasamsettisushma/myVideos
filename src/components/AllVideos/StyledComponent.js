/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'

const Container = styled.div`
  background-image: ${props => `url(${props.bgImage})`};
  background-size: cover;
`
export default Container
