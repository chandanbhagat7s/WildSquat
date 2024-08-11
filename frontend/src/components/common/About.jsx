import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const About = () => {
  const founders = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5feh6-WBnJMJzunv-DXyYf3BUFU5Yexv08g&s",
      description:
        "With over 15 years in e-commerce, Sarah leads our company vision and strategy.",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      email: "sarah@ourcompany.com",
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5feh6-WBnJMJzunv-DXyYf3BUFU5Yexv08g&s",
      description: `Michael's innovative tech solutions drive our platform's cutting-edge performance.`,
      linkedin: "https://linkedin.com/in/michaelchen",
      twitter: "https://twitter.com/michaelchen",
      email: "michael@ourcompany.com",
    },
    {
      name: "Olivia Patel",
      role: "COO & Co-Founder",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5feh6-WBnJMJzunv-DXyYf3BUFU5Yexv08g&s",
      description:
        "Olivia ensures smooth operations and an unparalleled customer experience.",
      linkedin: "https://linkedin.com/in/oliviapatel",
      twitter: "https://twitter.com/oliviapatel",
      email: "olivia@ourcompany.com",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            Our Story
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Meet the Visionaries Behind Our Success
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Founded in 2020, our mission is to revolutionize online shopping
            with cutting-edge technology and unparalleled customer service.
          </p>
        </div>

        <div className="mt-20">
          <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
            {founders.map((founder) => (
              <li
                key={founder.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="space-y-4 p-6">
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      className="object-cover shadow-lg rounded-lg"
                      src={founder.image}
                      alt={founder.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>{founder.name}</h3>
                      <p className="text-indigo-600">{founder.role}</p>
                    </div>
                    <ul className="flex space-x-5">
                      <li>
                        <a
                          href={founder.linkedin}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={founder.twitter}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Twitter</span>
                          <FaTwitter className="w-5 h-5" />
                        </a>
                      </li>
                      <li>
                        <a
                          href={`mailto:${founder.email}`}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Email</span>
                          <FaEnvelope className="w-5 h-5" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>{founder.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
