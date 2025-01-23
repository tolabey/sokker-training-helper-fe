export default function PageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h2>Hello we are under the login path</h2>
      {children}
    </div>
  )
}
