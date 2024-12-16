import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";


export default function Layout({children}) {
  return (
    <div>
      <Navbar/>
      <div className="content min-h-screen">
          {children}
      </div>
      <Footer/>
    </div>
  )
}
