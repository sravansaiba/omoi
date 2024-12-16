import { useContext } from "react";
import myContext from "../../context/data/myContext";

export default function HeroSection() {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <>
      <section
      className="mb-20"
      // style={{ background: mode === 'dark' ? 'black' : 'white' }
      style={{backgroundImage:'url(blogpic.webp)',backgroundPosition:'center',width:'[100vw]',height:'[100vh]'}}
      >
        {/* Hero Section  */}
        <div className="w-full h-[50vh]">
          {/* Main Content  */}
        </div>
      </section>
      <main>
        <div className="text-center">
          <div>
            {/* Text  */}
            <h1 className={`text-3xl text-${mode==='dark'?'white':'black'} font-sans`}>Omoi</h1>
            {/* Paragraph  */}
            <p
              style={{ color: mode === "dark" ? "white" : "black" }}
              className="sm:text-3xl text-xl font-extralight sm:mx-auto mb-36 "
            >
              Share your knowledge and thoughts!!
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
