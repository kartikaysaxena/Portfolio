
export default function Header() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Kartikay</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#skills">My Skills</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#work">Work</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
          </ul>
          <a href="https://drive.google.com/file/d/1qzKX0GiugU8MeR63Wt0DX0SuI-g1PvHS/view?usp=drivesdk">
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Resume</button>
          </a>

        </div>
      </nav>
    </div>
  )
}
