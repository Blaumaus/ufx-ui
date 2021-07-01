/* eslint-disable consistent-return */
import _get from 'lodash/get'
import { useEffect, useRef, useState } from 'react'

export default () => {
  const [size, setSize] = useState({})
  const ref = useRef(null)
  useEffect(() => {
    const DOMnode = ref.current
    if (!DOMnode) {
      return
    }
    const resizeObserver = new ResizeObserver((entries) => {
      setSize({
        width: _get(entries, '0.contentRect.width', 0),
        height: _get(entries, '0.contentRect.height', 0),
      })
    })
    resizeObserver.observe(DOMnode)
    return () => {
      resizeObserver.unobserve(DOMnode)
    }
  }, [])
  return [ref, size]
}
