export default function About() {
    return (
        <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen py-16 transition-colors duration-200">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-zinc-900 dark:text-white uppercase tracking-widest">About Us</h1>
                    <div className="w-16 h-1 bg-[#C5A059] mx-auto mb-6"></div>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-light">
                        Discover the story behind our brand and our unwavering commitment to quality and elegance.
                    </p>
                </div>
                
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=500&fit=crop" 
                    alt="Our Team" 
                    className="w-full h-[400px] object-cover mix-blend-multiply dark:mix-blend-normal rounded-xl mb-20 shadow-2xl"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Our Mission</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg font-light">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. 
                            Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. 
                            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. 
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Our Story</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg font-light">
                            Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. 
                            Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. 
                            Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-10 md:p-16 shadow-lg border border-zinc-100 dark:border-zinc-700">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Our Core Values</h2>
                        <div className="w-12 h-1 bg-[#C5A059] mx-auto"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto bg-zinc-100 dark:bg-zinc-700 text-[#C5A059] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Quality</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">We never compromise on the quality of our products.</p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto bg-zinc-100 dark:bg-zinc-700 text-[#C5A059] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Integrity</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">Honesty and transparency are the foundations of our business.</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto bg-zinc-100 dark:bg-zinc-700 text-[#C5A059] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Customer First</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">Your absolute satisfaction is our top priority.</p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto bg-zinc-100 dark:bg-zinc-700 text-[#C5A059] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Innovation</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">We continuously strive to bring you the best and latest trends.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
