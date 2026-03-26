function Footer() {
  const linkedInUrl: string = "https://br.linkedin.com/in/rachel-pizane";

  return (
    <footer className="bg-indigo-400 p-4 text-center">
      <p className="text-indigo-950 font-semibold">
        Coded by{" "}
        <a className="underline hover:text-indigo-700 transition duration-200" href={linkedInUrl} target="_blank">
          Rachel Pizane
        </a>
      </p>
    </footer>
  );
}

export default Footer;