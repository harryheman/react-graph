import { forwardRef, type CSSProperties, type PropsWithChildren } from 'react'

export const Flex = forwardRef<
  HTMLDivElement,
  PropsWithChildren<CSSProperties>
>(({ children, ...styles }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        ...styles,
      }}
    >
      {children}
    </div>
  )
})
