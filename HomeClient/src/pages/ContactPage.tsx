import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            We'd love to hear from you. Whether you have a question about features,
            pricing, or anything else—our team is ready to answer all your questions.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Our Office</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Jl. Inovasi Digital No. 123, Jakarta, Indonesia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400">+62 812 3456 7890</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">support@lumino.id</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell us how we can help..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;