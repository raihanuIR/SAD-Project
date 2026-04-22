export default function Contact() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-slate-900 dark:text-white">Contact Us</h1>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                        <p className="text-slate-600 dark:text-gray-300 mb-8">We'd love to hear from you. Please fill out the form below or reach out to us using the contact details provided.</p>
                        
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <span className="text-2xl mr-4">📍</span>
                                <div>
                                    <h4 className="font-semibold">Our Location</h4>
                                    <p className="text-slate-600 dark:text-gray-400">4005 Silver Business Point, India</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-2xl mr-4">📞</span>
                                <div>
                                    <h4 className="font-semibold">Phone Number</h4>
                                    <p className="text-slate-600 dark:text-gray-400">123-456-789</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-2xl mr-4">✉️</span>
                                <div>
                                    <h4 className="font-semibold">Email Address</h4>
                                    <p className="text-slate-600 dark:text-gray-400">demoexample@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-slate-300 dark:border-gray-600 rounded-md focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-white" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Email</label>
                            <input type="email" className="w-full px-4 py-2 border border-slate-300 dark:border-gray-600 rounded-md focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-white" placeholder="Your Email" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Message</label>
                            <textarea rows="4" className="w-full px-4 py-2 border border-slate-300 dark:border-gray-600 rounded-md focus:ring-rose-500 focus:border-rose-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-white" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="button" className="w-full bg-slate-900 dark:bg-black text-white py-3 rounded-md font-semibold hover:bg-slate-800 dark:hover:bg-gray-900 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
