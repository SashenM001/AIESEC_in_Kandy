'use client'
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getNewsAndEvents } from "../lib/firestore";
import { BsCalendarEvent, BsNewspaper } from "react-icons/bs";

const categoryStyles = {
    News: {
        badge: "bg-aiesec-blue text-white",
        icon: <BsNewspaper className="inline mr-1" />,
    },
    Event: {
        badge: "bg-aiesec-green text-white",
        icon: <BsCalendarEvent className="inline mr-1" />,
    },
};

function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function NewsAndEvents() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getNewsAndEvents();
                setItems(data);
            } catch (err) {
                console.error("Error fetching news:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filtered =
        filter === "All" ? items : items.filter((item) => item.category === filter);

    return (
        <section id="news-events" className="w-full py-20 px-4 sm:px-6 bg-aiesec-light-grey">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
                    News & Events
                </h2>
                <p className="text-center text-aiesec-dark-grey mb-12 text-base sm:text-lg max-w-2xl mx-auto">
                    Stay updated with our latest news and upcoming events
                </p>

                {/* Filter Tabs */}
                <div className="flex justify-center gap-3 mb-12">
                    {["All", "News", "Event"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all text-sm sm:text-base ${filter === tab
                                    ? "bg-aiesec-blue text-white shadow-lg"
                                    : "bg-white text-aiesec-dark-grey hover:bg-aiesec-mid-grey"
                                }`}
                        >
                            {tab === "Event" ? "Events" : tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-aiesec-blue border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <BsCalendarEvent className="mx-auto text-5xl text-aiesec-mid-grey mb-4" />
                        <p className="text-aiesec-dark-grey text-lg">
                            No {filter === "All" ? "news or events" : filter.toLowerCase() + "s"} to display yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filtered.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                            >
                                {/* Optional Image */}
                                {item.imageUrl && (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Category Badge + Date */}
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className={`text-xs font-bold px-3 py-1 rounded-full ${categoryStyles[item.category]?.badge || "bg-aiesec-mid-grey text-black"
                                                }`}
                                        >
                                            {categoryStyles[item.category]?.icon}
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-aiesec-dark-grey">
                                            {formatDate(item.date)}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg sm:text-xl font-bold text-black mb-2 leading-tight">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-aiesec-dark-grey text-sm leading-relaxed line-clamp-3">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default NewsAndEvents;
