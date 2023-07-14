import React ,{useState} from 'react';
import { Inter } from 'next/font/google';

import styles from './NavBar.module.css'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

type NavBarProps = {}


const NavBar: React.FC<NavBarProps> = () => {

   const [active, setActive] = useState("search");
  

  return (
    <nav className={[styles.navbar, inter.className].join(" ")}>
      <Link href="/">
        <div className={styles.logo}>
          OM<span>DB</span>
        </div>
      </Link>

      <ul className={styles.navLinks}>
        <div className={styles.menu}>
          <Link type="submit" href="/">
            <div
              className={active === "search" ? styles.active : ""}
              onClick={() => {
                setActive("search");
              }}
            >
              <li className={styles.navBarItems}>Search</li>
            </div>
          </Link>
          <Link href="/recommend">
            <div
              className={active === "recommend" ? styles.active : ""}
              onClick={() => {
                setActive("recommend");
              }}
            >
              <li className={styles.navBarItems}>Recommendations</li>
            </div>
          </Link>
        </div>
      </ul>
    </nav>
  );
  }

export default NavBar;
