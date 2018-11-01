import React, { Component } from 'react'
import { Row, Column } from 'rebass'
import Styled, { css } from "styled-components"

const Structure = Styled.div`
  ${({size}) => css`font-size: ${size};`}
  color: #fff;
  font-weight: 300;
`

export default Structure
