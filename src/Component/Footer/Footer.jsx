import logo from "../../assets/logo.png"

const Footer = () => {
  const date = new Date()
  const currentYear = date.getFullYear()

  return (
    <div className="mt-20">
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
          <div
            to="/"
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              className="w-10 h-10"
            />
            <span className="text-3xl font-ostt font-bold uppercase">
              Taj Apart
            </span>
          </div>
          <p className="w-full md:w-96 text-base mt-2">
            Welcome to Taj Apart, your premier building management system
            designed to streamline and enhance the management of residential and
            commercial properties.
          </p>
        </div>
        <div>
          <h6 className="footer-title">Contact us</h6>
          <a className="link link-hover">123 Main St</a>
          <a className="link link-hover"> +01-7458292</a>
          <a className="link link-hover">taj@apart.com</a>
        </div>
        <nav>
          <h6 className="footer-title">Home</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="bg-primary text-white py-3 px-6 join-item">
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </footer>
      <footer className="footer footer-center p-4 bg-secondary text-primary border-t border-black">
        <aside>
          <p>Copyright © {currentYear} - All right reserved by Taj Apart</p>
        </aside>
      </footer>
    </div>
  )
}

export default Footer
