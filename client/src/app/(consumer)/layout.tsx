export default async function ConsumerLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export function NavBar() {
  return <h1>hi</h1>;
}
