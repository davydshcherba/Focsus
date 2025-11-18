export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
        <h1 className="text-white text-4xl font-bold">Hello World</h1>
        <nav className="flex gap-4">
          <a href="/" className="text-white hover:text-gray-300">Home</a>
          <a href="/login" className="text-white hover:text-gray-300">Login</a>
          <a href="/register" className="text-white hover:text-gray-300">Register</a>
        </nav>
      </header>
  )
}