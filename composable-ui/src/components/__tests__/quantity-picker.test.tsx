import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { QuantityPicker } from '../quantity-picker'
import { render, screen } from 'utils/tests'

describe('Testing QuantityPicker', () => {
  const _default_label = 'Quantity'
  const _label = 'test_quantity_label'

  it('render the QuantityPicker properly', () => {
    render(<QuantityPicker />)
    expect(screen.getByText(_default_label)).toBeInTheDocument()
  })

  it('visually hide label if hideLabel is true', () => {
    render(<QuantityPicker label={_label} hideLabel={true} />)
    expect(screen.getByText(_label).parentElement?.tagName).toBe('P')
  })

  it('show label if hideLabel is false', () => {
    render(<QuantityPicker label={_label} hideLabel={false} />)
    expect(screen.getByText(_label).parentElement?.tagName).not.toBe('SPAN')
  })

  it('show correct aria-label', () => {
    const expected_aria_label = `${_default_label} selected is 99`
    render(<QuantityPicker label={_default_label} defaultValue={99} />)
    expect(screen.getByLabelText(expected_aria_label)).toBeInTheDocument()
  })

  it('show correct quantity value', () => {
    render(<QuantityPicker defaultValue={123456} />)
    expect(screen.getByText('123456')).toBeInTheDocument()
  })

  it('disable Decrement button when value is equal to minimum', () => {
    render(<QuantityPicker min={1} max={100} defaultValue={1} />)
    expect(screen.getByLabelText('Decrement')).toBeDisabled()
    expect(screen.getByLabelText('Increment')).not.toBeDisabled()
  })

  it('disable Increment button when value is equal to maximum', () => {
    render(<QuantityPicker min={1} max={100} defaultValue={100} />)
    expect(screen.getByLabelText('Decrement')).not.toBeDisabled()
    expect(screen.getByLabelText('Increment')).toBeDisabled()
  })

  it('disable both Increment and Decrement when isLoading equal to true', () => {
    render(<QuantityPicker isLoading={true} />)
    expect(screen.getByLabelText('Decrement')).toBeDisabled()
    expect(screen.getByLabelText('Increment')).toBeDisabled()
  })

  it('increase quantity correctly', () => {
    render(<QuantityPicker min={1} max={100} defaultValue={77} />)

    fireEvent.click(screen.getByLabelText('Increment'))
    expect(screen.getByText('78')).toBeInTheDocument()
  })

  it('decrease quantity correctly', () => {
    render(<QuantityPicker min={1} max={100} defaultValue={77} />)

    fireEvent.click(screen.getByLabelText('Decrement'))
    expect(screen.getByText('76')).toBeInTheDocument()
  })
})
