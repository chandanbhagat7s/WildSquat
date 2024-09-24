import logo from "./../../../assets/logo.jpeg";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            {/* <h2 className="font-bold text-2xl mb-4 text-gray-900">WILDSQUAT</h2> */}
            <span className="font-bold  text-gray-800 font-serif first-letter:text-2xl first-letter:font-bold text-2xl ">
              WILD<span className="text-gray-500">SQUAT</span>{" "}
            </span>
            <div className="my-2">
              {" "}
              <img
                src={logo}
                alt="Wild Squat Logo"
                className="scale-125 h-20 "
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">Who we are?</h3>
            <p className="text-sm leading-relaxed">
              We are a dedicated team of enthusiasts passionate about creating
              high-quality athleisure wear that seamlessly blends style and
              performance. Our mission is to empower you to look and feel your
              best, whether you’re hitting the gym or simply lounging at home.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-900">
                  New Arrivals 🔥
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-900">
                  Offers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-900">
                  T-shirts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-900">
                  Stringers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-900">
                  Shorts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-900">
                  Innerwear
                </a>
              </li>
            </ul>
          </div>
          <div className="text-sm">
            <h3 className="font-semibold text-lg mb-4">Address</h3>
            <a
              target="_main"
              className="text-blue-900 hover:underline"
              href="https://www.google.com/maps/place/WILD+SQUAT/@17.4350137,78.4842811,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb917c40779015:0xbf52b4f4a724c8eb!8m2!3d17.4350137!4d78.4868614!16s%2Fg%2F11n983cz9h?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D"
            >
              Bearing No # 2-3-168, Shop No : 1 Ground Floor, Ramgopalpet,
              Landmark : Azam Hotel Lane, Masjid Road, Nallagutta, Secunderabad,
              Telangana 500003
            </a>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Help</h3>
            <p className="text-sm mb-2">
              Whatsapp Us:{" "}
              <a
                href="https://wa.me/7337265120"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-900 hover:underline"
              >
                +91 7337265120
              </a>
            </p>
            <p className="text-sm mb-4">
              Email Us:{" "}
              <a
                href="mailto:wildsquat.kk@gmail.com"
                className="text-blue-900 hover:underline"
              >
                wildsquat.kk@gmail.com
              </a>
            </p>
            <div className="flex space-x-4">
              <a
                target="_main"
                href="https://www.instagram.com/wildsquat.kk/"
                className="text-gray-600 hover:text-blue-900"
              >
                <FaInstagram size={24} />
              </a>
              <a
                target="_main"
                href="https://www.facebook.com/wildsquat.kk"
                className="text-gray-600 hover:text-blue-900"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                target="_main"
                href="https://www.youtube.com/@wildsquatactivewear1903"
                className="text-gray-600 hover:text-blue-900"
              >
                <FaYoutube size={24} />
              </a>

              <a
                target="_main"
                href="mailto:wildsquat.kk@gmail.com"
                className="text-gray-600 hover:text-blue-900"
              >
                <MdEmail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
