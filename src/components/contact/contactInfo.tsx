import { MailOpen, MapPinned, Phone } from "lucide-react";

const ContactInfo = () => {
  const cardStyles =
    "bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center space-y-4 transition-all duration-500 shadow-md shadow-[#FF3C48] transition transform hover:-translate-y-2 cursor-pointer  ";

  const textStyle = "text-gray-600 dark:text-gray-300  ";

  return (
    <div className="  py-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className={cardStyles}>
          <MapPinned className="text-[#FF3C48] text-4xl mx-auto" />
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Office Address
          </h3>
          <p className={textStyle}>
            4517 Washington Ave. Chester,<br />
            Kentucky 39495
          </p>
        </div>


        <div className={cardStyles}>
          <Phone className="text-[#FF3C48] text-4xl mx-auto" />
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Call to us
          </h3>
          <p className={textStyle}>Telephone: (603) 555-0123</p>
          <p className={textStyle}>Mobile: (316) 555-0116</p>
        </div>


        <div className={cardStyles}>
          <MailOpen className="text-[#FF3C48] text-4xl mx-auto" />
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Email Address
          </h3>
          <p className={textStyle}>directorylisting@example.com</p>
          <p className={textStyle}>cllisting2220@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
