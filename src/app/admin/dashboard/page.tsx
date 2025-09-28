"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import RequestedAdmin from "../components/RequestedAdmin";
import OtherAdmin from "../components/OtherAdmin";
import VolunteersTable from "../components/VolunteersTable";
import DonatorsTable from "../components/DonatorsTable";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [section, setSection] = useState<string>("requested");

    useEffect(() => {
        const session = localStorage.getItem("admin_session");
        if (!session) router.push("/admin/login");
    }, [router]);

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
                <AdminSidebar current={section} onNavigate={(s: string) => setSection(s)} />
            </aside>
            <section className="lg:col-span-3 bg-white rounded-2xl p-6 shadow">
                {section === "requested" && <RequestedAdmin />}
                {section === "other" && <OtherAdmin />}
                {section === "volunteers" && <VolunteersTable />}
                {section === "monthly" && <DonatorsTable period="monthly" />}
                {section === "yearly" && <DonatorsTable period="yearly" />}
            </section>
        </div>
    );
}
