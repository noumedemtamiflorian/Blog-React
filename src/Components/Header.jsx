function Header() {
    return (
        <header className="d-flex justify-content-between">
            <h1>Mon titre</h1>
            <nav class="navbar navbar-expand navbar-light bg-light">
                <div class="nav navbar-nav">
                    <a class="nav-item nav-link">Lien</a>
                    <a class="nav-item nav-link">Home</a>
                </div>
            </nav>
        </header>
    );
}

export default Header;
