import React from "react";

const projects = [
    {
        enkey: "1",
        bnkey: "১",
        bn: "সকল মানুষের মাঝে ইসলামের দাওয়াত পৌঁছানো",
        en: "Spreading the message of Islam to all people",
    },
    {
        enkey: "2",
        bnkey: "২",
        bn: "নওমুসলিমের শিক্ষা-সেবা ও পুনর্বাসন",
        en: "Education, service, and rehabilitation for new Muslims",
    },
    {
        enkey: "3",
        bnkey: "৩",
        bn: "ইসলামী শিক্ষায় অনগ্রসর এলাকায় মক্তব-মাদরাসা প্রতিষ্ঠা",
        en: "Establishing Maktab-Madrasa in underprivileged areas",
    },
    {
        enkey: "4",
        bnkey: "৪",
        bn: "দাওয়াহ এবং তুলনামুলক ধর্মতত্ত্ব সংক্রান্ত গবেষণা",
        en: "Research on Dawah and comparative religion",
    },
    {
        enkey: "5",
        bnkey: "৫",
        bn: "বিভিন্ন শ্রেণী ও পেশার মানুষকে দাওয়াহ প্রশিক্ষণ",
        en: "Dawah training for people of various classes and professions",
    },
    {
        enkey: "6",
        bnkey: "৬",
        bn: "দাওয়াহ সংক্রান্ত বই-পুস্তক-পুস্তিকা ইত্যাদি প্রকাশ",
        en: "Publishing Dawah-related books and booklets",
    },
];

interface ProjectsProps {
    locale?: "bn" | "en";
}

const Projects: React.FC<ProjectsProps> = ({ locale = "bn" }) => {
    return (
        <section className="py-16 bg-gray-50" id="projects">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-primary">
                    {locale === "bn" ? "আমাদের প্রকল্পসমূহ" : "Our Projects"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.enkey}
                            className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center min-h-[120px] hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            <div className="flex flex-col items-center w-full">
                                <span
                                    className="bg-green-700 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-2xl mb-2"
                                >
                                    {locale === "bn" ? project.bnkey : project.enkey}
                                </span>
                                <br />
                                <span className="text-lg font-semibold text-gray-800 text-center">
                                    {locale === "bn" ? project.bn : project.en}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
