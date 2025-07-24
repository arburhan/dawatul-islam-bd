import React from "react";
import Image from "next/image";
import complexImage from "@/lib/images/complexImage.png"

interface MarkazActivityProps {
    locale?: "bn" | "en";
}

const activities = {
    title: {
        bn: "মারকাজের কার্যক্রমসমূহ",
        en: "Activities of the Markaz"
    },
    description: {
        bn: "দারুল কারার মাসজিদ ও মাদরাসা কমপ্লেক্স একটি বহুমুখী দ্বীনী কার্যক্রমের মারকাজ। যা উলামায়ে কেরাম ও দ্বীন দরদী মুসলমান ভাইদের সমন্বয়ে একটি কমিটি দ্বারাপরিচালিত।এ মারকাজের তত্ত্বাবধানে রয়েছে নিম্নোক্ত প্রতিষ্ঠানসমূহঃ",
        en: "Darul Karar Mosque and Madrasa Complex is a center for multifaceted religious activities. It is managed by a committee consisting of respected scholars and devout Muslim brothers. The following institutions are supervised by this Markaz:"
    },
    list: [
        {
            bn: "মসজিদ",
            en: "Mosque"
        },
        {
            bn: "উচ্চতর দাওয়াহ ও গবেষণামূলক মাদরাসা",
            en: "Higher Dawah and Research Madrasa"
        },
        {
            bn: "তাফহিমুল কুরআন মাদরাসা",
            en: "Tafhimul Quran Madrasa"
        },
        {
            bn: "গ্রন্থাগার ও লাইব্রেরী",
            en: "Library"
        },
        {
            bn: "দাওয়াহ সেন্টার",
            en: "Dawah Center"
        },
        {
            bn: "নওমুসলিম সেন্টার",
            en: "New Muslim Center"
        },
        {
            bn: "দাওয়াহ গবেষণা ও প্রশিক্ষণ সেন্টার",
            en: "Dawah Research and Training Center"
        },
        {
            bn: "মাদরিসুল কুরআনের অফিস \n(মক্তব-মাদরাসা প্রতিষ্ঠায় নিয়োজিত সংস্থা)",
            en: "Office of Madarisul Quran\n(Organization for Establishing Maktab-Madrasa)"
        },
        {
            bn: "প্রকাশনা",
            en: "Publications"
        },
        {
            bn: "মেহমানখানা",
            en: "Guest House"
        },
        {
            bn: "অন্যান্য",
            en: "Others"
        }
    ]
};

const MarkazActivity: React.FC<MarkazActivityProps> = ({ locale = "bn" }) => {
    return (
        <section className="py-16 bg-white">
            <div className=" mx-auto px-8 md:px-24">
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        {activities.title[locale]}
                    </h2>
                    <p className="text-gray-600 text-xl md:text-2xl">
                        {activities.description[locale]}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Building Image */}
                    <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={complexImage}
                            alt={locale === "bn" ? "মারকাজ ভবন" : "Markaz Building"}
                            fill
                            priority
                        />
                    </div>

                    {/* Activities List */}
                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {activities.list.map((activity, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                >
                                    <p className="text-xl font-medium text-gray-800">
                                        {activity[locale]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-center"></div>
            </div>

            {/* Donate Section */}
            <div className="max-w-6xl mx-auto mt-12 mb-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                    {/* Donate Icon */}
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 8.25.22-.22a.75.75 0 0 1 1.28.53v6.441c0 .472.214.934.64 1.137a3.75 3.75 0 0 0 4.994-1.77c.205-.428-.152-.868-.627-.868h-.507m-6-2.25h7.5M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>

                    </span>
                    <h3 className="text-2xl font-semibold text-primary">
                        {locale === "bn" ? "দান করুন" : "Donate"}
                    </h3>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-lg md:text-xl text-gray-800 leading-relaxed shadow text-center">
                    {locale === "bn" ? (
                        <>
                            বর্তমানে কমপ্লেক্সের নামে দানপত্রমূলে দলীলকৃত ৫ (পাঁচ) শতাংশ (এবং প্রস্তাবিত ২.৫ শতাংশ) জমির উপর ১০ (দশ) তলা বিশিষ্ট ভবন নির্মাণের পদক্ষেপ প্রহণ করা হয়েছে। <br />
                            ভবনের ১ম ও ২য় তলা মসজিদের জন্য এবং ৩য় থেকে ১০ম তলা অন্যান্য প্রতিষ্ঠানের জন্য নির্ধারিত থাকবে। <br />
                            এ প্রকল্প বাস্তবায়ন করতে প্রায় ৭,০০,৮০,৩৮২/- (সাত কোটি আশি হাজার তিনশত বিরাশি) টাকা ব্যয় হবে। দ্বীন-দরদী সকল ভাই-বোনের নিকট উক্ত মহতি কাজে অর্থিক অনুদান দিয়ে অংশগ্রহণ করার বিনীত অনুরোধ করছি।  আল্লাহ রব্বুল আলামীন আমাদের সকলের দান ও প্রচেষ্টা কবুল করুন।   আমীন !
                        </>
                    ) : (
                        <>
                            Currently, steps have been taken to construct a 10-storey building on 5 (five) percent of land registered in the name of the complex by deed of donation (and proposed 2.5 percent). <br /><br />
                            The 1st and 2nd floors of the building will be designated for the mosque, and the 3rd to 10th floors will be allocated for other institutions. <br /><br />
                            To implement this project, approximately 70,080,382 BDT (seventy million eighty thousand three hundred eighty-two taka) will be required. We humbly request all devout brothers and sisters to participate in this noble cause by providing financial donations. May Allah, Lord of the Worlds, accept all our donations and efforts. Ameen!
                        </>
                    )}
                </div>
                {/* Hadith */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 text-lg md:text-xl text-gray-800 shadow text-center">
                    <h4 className="text-xl font-semibold text-blue-700 mb-2">
                        {locale === "bn" ? "হাদিস" : "Hadith"}
                    </h4>
                    <p>
                        {locale === "bn"
                            ? (
                                <>
                                    “বান্দা বলে: আমার সম্পদ ! আমার সম্পদ ! অথচ সে মাত্র তিনটি বস্তুর মালিক:<br />
                                    - যা খেয়ে হজম করেছে<br />
                                    - অথবা যা পরিধান করে পুরান করেছে<br />
                                    - অথবা যা সদকা করে সঞ্চয় করেছে।<br />
                                    (অর্থাৎ সদকা করে কিয়ামতের দিনের জন্য নিজের নেকি উপার্জন করেছে)।  এ ছাড়া বাকিসব ধ্বংস হবে ও তা মানুষের জন্য রেখে যাবে”। (মুসলিম; হাদীস নং ৩৯৫৯)
                                </>
                            )
                            : (
                                <>
                                    ‘The servant says: My wealth! My wealth! Yet he is only the owner of three things: <br />
                                    - What he has eaten and digested, <br />
                                    - Or what he has worn out, <br />
                                    - Or what he has given in charity and saved. (i.e., earned his good deeds for the Day of Judgment by giving charity). Everything else will perish, and he will leave it for others.’ (Muslim; Hadith No. 3959)
                                </>
                            )
                        }
                    </p>
                </div>
            </div>

        </section>
    );
};

export default MarkazActivity;
