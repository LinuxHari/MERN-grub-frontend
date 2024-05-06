const Footer = () => {
  return (
    <footer className="bg-red-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-y-4 items-center">
        <div className="space-y-2 text-white">
          <h2 className="text-3xl font-bold tracking-tight">MernGrub.com</h2>
          <p className="text-sm">9097 Olga Corner, Port Johnnie, LA 89912-9230</p>
        </div>
        <span className="text-white font-bold tracking-tight flex gap-4">
          Copyright &#169; 2024 - All rights reserved
        </span>
      </div>
    </footer>
  )
}

export default Footer
