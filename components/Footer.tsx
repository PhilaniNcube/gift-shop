import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";

const Footer = () => {

  const router = useRouter()

  const date = new Date();

  const year = date.getFullYear()

   const paymentMethods = [
    {
      name: 'Instant Eft',
      image: '/images/instantEFT.svg'
    },
    {
      name: 'Mobicred',
      image: '/images/mobicred.svg'
    },
    {
      name: 'Credit Card',
      image: '/images/credit-card.svg'
    },
    {
      name: 'Zapper',
      image: '/images/zapper.svg'
    },
   ]


    const navLinks = [
      { text: "Home", href: "/", active: router.asPath === "/" },

      {
        text: "Bundles",
        href: "/bundles",
        active: router.asPath === "/bundles",
      },
      {
        text: "Categories",
        href: "/categories",
        active: router.asPath === "/categories",
      },
    ];

    const socialLinks = [
      { href: "https://facebook.com", icon: <FaFacebookF /> },
      { href: "https://twitter.com", icon: <FaTwitter /> },
      { href: "https://instagram.com", icon: <FaInstagram /> },
    ];

  return (
    <footer className="bg-primary-main py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2">
          <div className="w-full col-span-2 md:col-span-1 pr-8">
            <h2 className="font-bold text-white text-3xl">gift-fairy</h2>
            {/* <p className="text-md text-gray-400 font-light tracking-wide leading-7 mt-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet
              perferendis rem ut earum, veniam est eligendi officia, inventore
              voluptates officiis molestiae autem rerum necessitatibus voluptas
              minima. Minus harum iusto distinctio eius reiciendis veniam
              recusandae necessitatibus.
            </p> */}

            <p className="font-medium text-gray-300 mt-5 text-md">
              Copyright {year}. All Rights Reserved. Developed by{" "}
              <Link className="text-white" href="https://athenamedia.co.za">
                Athena Media
              </Link>
            </p>
          </div>
          <div className="w-full flex flex-col justify-between items-end">
            <div className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-around col-span-2 md:col-span-1 py-4">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className={`text-xl uppercase ${
                    link.active ? "text-slate-200" : "text-white"
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="text-white hover:text-primary-main h-16 w-16"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4 px-3 py-2 bg-white">
              {paymentMethods.map((link, i) => (
                <div
                  key={i}
                  className="w-24 object-cover"
                >
                  <Image src={link.image} width={97} height={24} alt={link.name} className="w-full object-cover"  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
