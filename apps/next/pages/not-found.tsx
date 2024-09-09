import { Gutter } from '../../../packages/_components/Gutter'
import { VerticalPadding } from '../../../packages/_components/VerticalPadding'
import { Button } from '../../../packages/_components/Button'

export default function NotFound() {
  return (
    <Gutter>
      <VerticalPadding top="none" bottom="large">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p>This page could not be found.</p>
        <Button href="/" label="Go Home" appearance="primary" />
      </VerticalPadding>
    </Gutter>
  )
}
