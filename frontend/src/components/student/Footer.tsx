import { assets } from "../../assets/assets";

export default function Footer() {
  const inputStyles =
    "border border-gray-500/30 bg-gray-800 text-gray-300 placeholder-gray-500 outline-none h-10 rounded px-2 text-sm";

  return (
    <footer className="bg-gray-900 md:px-20 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-20 py-10 border-b border-white/20">
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo} alt="logo" className="w-10" />
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            deleniti, beatae dolorum facilis fugit voluptatem assumenda
            obcaecati veritatis dolore ab tenetur, quibusdam qui animi deserunt
            iusto molestiae! Fuga, provident ad. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Id laudantium, unde enim ipsum,
            exercitationem optio iusto facilis laborum doloremque odio eligendi.
            Minima, fugiat autem cupiditate quae earum hic nemo totam!
          </p>
        </div>

        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>

          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            {["Home", "About us", "Contact us", "Privacy policy"].map(
              (el, i) => (
                <li key={i} className="hover:text-white w-fit">
                  <a href="#">{el}</a>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Get in touch</h2>
          <p className="text-sm text-white/80">
            Tell us more and we'll find the best solution for you
          </p>

          <div className="flex flex-col w-full gap-3 pt-4">
            <input
              type="text"
              placeholder="Your name"
              className={inputStyles}
            />
            <input type="email" placeholder="Email" className={inputStyles} />
            <textarea
              placeholder="How can we help?*"
              className="border border-gray-500/30 bg-gray-800 text-gray-300 placeholder-gray-500 outline-none rounded text-sm w-full h-20 px-2 resize-none"
            ></textarea>
            <button className="bg-purple-700 w-24 h-9 text-white font-medium rounded cursor-pointer">
              Submit
            </button>
          </div>
        </div>
      </div>

      <p className="py-4 text-center text-xs md:text-sm text-white/60">
        Copyright 2026 &copy; Ascend. All Right Reserved.
      </p>
    </footer>
  );
}
