import React from "react";

function Header() {

    return(
        <header>
         <div class="wrap header--flex">
                <h1 class="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                    <ul class="header--signedin">
                        <li>Welcome, User!</li>
                        <li><a href="sign-out.html">Sign Out</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )

}
export default Header;