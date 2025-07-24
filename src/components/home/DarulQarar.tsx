import React from "react";
import Image from "next/image";
import mosqueImage from "@/lib/images/darulQarar.png";
import { Button } from "@headlessui/react";

interface DarulQararProps {
    locale?: "bn" | "en";
}

const bankDetails = {
    accountName: {
        en: "DARUL KARAR MOSJID AND MADRASHA COMPLEX",
        bn: "দারুল কারার মসজিদ এন্ড মাদরাসা কমপ্লেক্স"
    },
    accountNumber: "20501510202840110",
    bankName: {
        en: "Islami Bank Bangladesh PLC",
        bn: "ইসলামী ব্যাংক বাংলাদেশ পিএলসি"
    },
    branch: {
        en: "Aminbazar Branch, Dhaka",
        bn: "আমিনবাজার ব্রাঞ্চ, ঢাকা"
    },
    routingNumber: "125260138"
};

const DarulQarar: React.FC<DarulQararProps> = ({ locale = "bn" }) => {
    return (
        <section className="py-16 bg-white">
            <div className=" max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-primary">
                    {locale === "bn" ? "দারুল কারার মসজিদ এবং মাদরাসা কমপ্লেক্স" : "Darul Karar Mosque and Madrasa Complex"}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
                    {/* Bank Details Card */}
                    <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-semibold mb-6 text-primary">
                            {locale === "bn" ? "ব্যাংক বিবরণ" : "Bank Details"}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-600 font-medium">
                                    {locale === "bn" ? "অ্যাকাউন্ট নাম" : "Account Name"}:
                                </p>
                                <p className="text-xl font-semibold">
                                    {locale === "bn" ? bankDetails.accountName.bn : bankDetails.accountName.en}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-600 font-medium">
                                    {locale === "bn" ? "অ্যাকাউন্ট নাম্বার" : "Account Number"}:
                                </p>
                                <p className="text-xl font-semibold">
                                    {bankDetails.accountNumber}</p>
                            </div>

                            <div>
                                <p className="text-gray-600 font-medium">
                                    {locale === "bn" ? "ব্যাংকের নাম" : "Bank Name"}:
                                </p>
                                <p className="text-xl font-semibold">
                                    {locale === "bn" ? bankDetails.bankName.bn : bankDetails.bankName.en}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-600 font-medium">
                                    {locale === "bn" ? "শাখা" : "Branch"}:
                                </p>
                                <p className="text-xl font-semibold">
                                    {locale === "bn" ? bankDetails.branch.bn : bankDetails.branch.en}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-600 font-medium">
                                    {locale === "bn" ? "রাউটিং নাম্বার" : "Routing Number"}:
                                </p>
                                <p className="text-xl font-semibold">
                                    {bankDetails.routingNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Mosque Image */}
                    <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-lg">
                        <Image

                            src={mosqueImage}
                            alt={locale === "bn" ? "দারুল কারার মসজিদ" : "Darul Karar Mosque"}
                            fill
                            priority
                        />
                    </div>
                </div>

            </div>
            <div className="flex justify-center mt-10">
                <Button
                    className="px-8 py-3 bg-green-700 text-white rounded-lg font-semibold text-2xl  cursor-pointer"
                >
                    {locale === "bn" ? "বিস্তারিত" : "Details"}
                </Button>
            </div>
        </section>
    );
};

export default DarulQarar;
