export default function Modal({ open, children }) { return open ? <div role="dialog" aria-modal="true">{children}</div> : null; }
