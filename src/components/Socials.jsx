import React from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";

const Socials = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/in/priyanshubarman",
      color: "#0077B5",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: "https://github.com/PriyanshuBarman",
      color: "#171515",
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane />,
      url: "https://t.me/PriyanshuWB",
      color: "#2CA5E0",
    },

    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://x.com/Priyanshuwb",
      color: "#1DA1F2",
    },
  ];

  return (
    <>
      <h2 className="ml-6 w-full py-3 text-sm">Contact me / Socials</h2>

      <div className="relative right-4 flex w-full items-center justify-center gap-4 text-black">
        {socialLinks.map((social) => (
          <div key={social.name} className="group relative">
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative flex items-center justify-center rounded-full bg-white p-2 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-white/10`}
              aria-label={`Visit my ${social.name} profile`}
            >
              <span className="transition-colors duration-300 dark:text-white">
                {social.icon}
              </span>
            </a>

            <div className="absolute bottom-0 left-1/2 mb-4 -translate-x-1/2 scale-0 opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-y-10 group-hover:scale-100 group-hover:opacity-100">
              <div className="relative">
                <div
                  className="whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-sm text-white shadow dark:bg-gray-200 dark:text-gray-800"
                  style={{ backgroundColor: social.color, color: "white" }}
                >
                  {social.name}
                </div>
                <div
                  className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-800 dark:border-t-gray-200"
                  style={{ borderTopColor: social.color }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Socials;
