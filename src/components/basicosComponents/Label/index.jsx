export function Label({ children, htmlFor }) {
  return <label htmlFor={htmlFor} className="font-medium">{children}</label>;
}
