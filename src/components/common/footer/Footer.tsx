function Footer() {
  const linkedInUrl: string = "https://br.linkedin.com/in/rachel-pizane"

  return (
    <footer
      data-testid="app-main-footer"
      className="bg-indigo-400 p-4 text-center"
    >
      <p className="font-semibold text-indigo-950">
        Coded by{" "}
        <a
          className="underline transition duration-200 hover:text-indigo-700"
          href={linkedInUrl}
          target="_blank"
        >
          Rachel Pizane
        </a>
      </p>
    </footer>
  )
}

export default Footer
