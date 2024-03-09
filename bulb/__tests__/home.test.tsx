import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/page'
 
describe('Page', () => {
  it('Render heading', () => {
    render(<Page />)
 
    const heading = screen.getByText("Get started by editing")
 
    expect(heading).toBeInTheDocument()
  })
})