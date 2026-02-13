'use client'
import React, { useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import {
    getNewsAndEvents,
    addNewsItem,
    updateNewsItem,
    deleteNewsItem,
    getExperienceStories,
    addExperienceStory,
    updateExperienceStory,
    deleteExperienceStory,
} from "../../lib/firestore";
import HtmlHead from "@components/HtmlHead";
import {
    BsTrash,
    BsPencil,
    BsPlus,
    BsBoxArrowRight,
    BsCalendarEvent,
    BsNewspaper,
    BsGoogle,
    BsEnvelope,
    BsShieldLock,
    BsImage,
    BsX,
    BsChatQuote,
} from "react-icons/bs";
import Image from "next/image";
import AiesecLogo from "../../public/assets/images/bluelogo.png";

const emptyNewsForm = {
    title: "",
    description: "",
    date: "",
    category: "Event",
    imageUrl: "",
};

const emptyStoryForm = {
    name: "",
    title: "",
    content: "",
    imageUrl: "",
};

const googleProvider = new GoogleAuthProvider();

function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function AdminNews() {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Tab state
    const [activeTab, setActiveTab] = useState("news");

    // Login state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);

    // News data state
    const [items, setItems] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    // News form state
    const [form, setForm] = useState(emptyNewsForm);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);

    // Stories data state
    const [stories, setStories] = useState([]);
    const [storiesLoading, setStoriesLoading] = useState(false);

    // Stories form state
    const [storyForm, setStoryForm] = useState(emptyStoryForm);
    const [editingStoryId, setEditingStoryId] = useState(null);
    const [showStoryForm, setShowStoryForm] = useState(false);
    const [savingStory, setSavingStory] = useState(false);

    // Toast state
    const [toast, setToast] = useState(null);

    function showToast(message, type = "success") {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    // Listen to auth state
    useEffect(() => {
        if (!auth) {
            setAuthLoading(false);
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Fetch data when logged in
    useEffect(() => {
        if (user) {
            fetchItems();
            fetchStories();
        }
    }, [user]);

    // ── News & Events ──────────────────────────────────────────────

    async function fetchItems() {
        setDataLoading(true);
        try {
            const data = await getNewsAndEvents();
            setItems(data);
        } catch (err) {
            console.error("Fetch error:", err);
            showToast("Failed to load items", "error");
        } finally {
            setDataLoading(false);
        }
    }

    async function handleSave(e) {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingId) {
                await updateNewsItem(editingId, form);
                showToast("Item updated successfully!");
            } else {
                await addNewsItem(form);
                showToast("New item added successfully!");
            }
            setForm(emptyNewsForm);
            setEditingId(null);
            setShowForm(false);
            await fetchItems();
        } catch (err) {
            console.error("Save error:", err);
            showToast("Failed to save. Please try again.", "error");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            await deleteNewsItem(id);
            showToast("Item deleted successfully!");
            await fetchItems();
        } catch (err) {
            console.error("Delete error:", err);
            showToast("Failed to delete.", "error");
        }
    }

    function handleEdit(item) {
        setForm({
            title: item.title || "",
            description: item.description || "",
            date: item.date || "",
            category: item.category || "Event",
            imageUrl: item.imageUrl || "",
        });
        setEditingId(item.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleCancel() {
        setForm(emptyNewsForm);
        setEditingId(null);
        setShowForm(false);
    }

    // ── Experience Stories ──────────────────────────────────────────

    async function fetchStories() {
        setStoriesLoading(true);
        try {
            const data = await getExperienceStories();
            setStories(data);
        } catch (err) {
            console.error("Fetch stories error:", err);
            showToast("Failed to load stories", "error");
        } finally {
            setStoriesLoading(false);
        }
    }

    async function handleSaveStory(e) {
        e.preventDefault();
        setSavingStory(true);
        try {
            if (editingStoryId) {
                await updateExperienceStory(editingStoryId, storyForm);
                showToast("Story updated successfully!");
            } else {
                await addExperienceStory(storyForm);
                showToast("New story added successfully!");
            }
            setStoryForm(emptyStoryForm);
            setEditingStoryId(null);
            setShowStoryForm(false);
            await fetchStories();
        } catch (err) {
            console.error("Save story error:", err);
            showToast("Failed to save story. Please try again.", "error");
        } finally {
            setSavingStory(false);
        }
    }

    async function handleDeleteStory(id) {
        if (!window.confirm("Are you sure you want to delete this story?")) return;
        try {
            await deleteExperienceStory(id);
            showToast("Story deleted successfully!");
            await fetchStories();
        } catch (err) {
            console.error("Delete story error:", err);
            showToast("Failed to delete story.", "error");
        }
    }

    function handleEditStory(story) {
        setStoryForm({
            name: story.name || "",
            title: story.title || "",
            content: story.content || "",
            imageUrl: story.imageUrl || "",
        });
        setEditingStoryId(story.id);
        setShowStoryForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleCancelStory() {
        setStoryForm(emptyStoryForm);
        setEditingStoryId(null);
        setShowStoryForm(false);
    }

    // ── Auth Handlers ──────────────────────────────────────────────

    async function handleEmailLogin(e) {
        e.preventDefault();
        setLoginError("");
        setLoggingIn(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setLoginError("Invalid email or password. Please try again.");
        } finally {
            setLoggingIn(false);
        }
    }

    async function handleGoogleLogin() {
        setLoginError("");
        setLoggingIn(true);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            if (err.code !== "auth/popup-closed-by-user") {
                setLoginError("Google sign-in failed. Please try again.");
            }
        } finally {
            setLoggingIn(false);
        }
    }

    async function handleLogout() {
        await signOut(auth);
        showToast("Logged out successfully");
    }

    // --- Not configured ---
    if (!auth) {
        return (
            <>
                <HtmlHead title="Admin — AIESEC" description="Admin panel for AIESEC." />
                <div className="min-h-screen bg-aiesec-light-grey flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
                        <BsShieldLock className="mx-auto text-5xl text-aiesec-blue mb-4" />
                        <h1 className="text-2xl font-bold text-black mb-2">Firebase Not Configured</h1>
                        <p className="text-aiesec-dark-grey text-sm">
                            Please add your Firebase config values to the <code className="bg-aiesec-light-grey px-2 py-0.5 rounded text-aiesec-blue">.env</code> file and restart the dev server.
                        </p>
                    </div>
                </div>
            </>
        );
    }

    // --- Loading ---
    if (authLoading) {
        return (
            <div className="min-h-screen bg-aiesec-light-grey flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-aiesec-blue border-t-transparent rounded-full animate-spin"></div>
                <p className="text-aiesec-dark-grey text-sm">Loading...</p>
            </div>
        );
    }

    // --- Login Screen ---
    if (!user) {
        return (
            <>
                <HtmlHead title="Admin Login — AIESEC" description="Admin login for managing News & Events." />
                <div className="min-h-screen flex items-center justify-center px-4" style={{
                    background: "linear-gradient(135deg, #037Ef3 0%, #00C16E 50%, #037Ef3 100%)",
                }}>
                    <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md">
                        {/* Logo & Header */}
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <Image src={AiesecLogo} alt="AIESEC Logo" width={160} height={40} />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">
                                Welcome Back
                            </h1>
                            <p className="text-aiesec-dark-grey text-sm">
                                Sign in to manage content
                            </p>
                        </div>

                        {/* Google Login Button */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loggingIn}
                            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-aiesec-mid-grey text-black py-3 rounded-xl font-semibold hover:bg-aiesec-light-grey hover:border-aiesec-dark-grey transition-all disabled:opacity-50 mb-4"
                        >
                            <BsGoogle className="text-lg" />
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-aiesec-mid-grey"></div>
                            <span className="text-xs text-aiesec-dark-grey font-semibold uppercase tracking-wider">or</span>
                            <div className="flex-1 h-px bg-aiesec-mid-grey"></div>
                        </div>

                        {/* Email Login Toggle or Form */}
                        {!showEmailForm ? (
                            <button
                                onClick={() => setShowEmailForm(true)}
                                className="w-full flex items-center justify-center gap-2 bg-aiesec-light-grey text-aiesec-dark-grey py-3 rounded-xl font-semibold hover:bg-aiesec-mid-grey transition-colors text-sm"
                            >
                                <BsEnvelope /> Sign in with Email
                            </button>
                        ) : (
                            <form onSubmit={handleEmailLogin} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-aiesec-dark-grey mb-1 uppercase tracking-wider">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-aiesec-mid-grey focus:border-aiesec-blue focus:outline-none text-black transition-colors text-sm"
                                        placeholder="admin@aiesec.net"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-aiesec-dark-grey mb-1 uppercase tracking-wider">Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-aiesec-mid-grey focus:border-aiesec-blue focus:outline-none text-black transition-colors text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loggingIn}
                                    className="w-full bg-aiesec-blue text-white py-3 rounded-xl font-semibold hover:bg-[#0266cc] transition-colors disabled:opacity-50"
                                >
                                    {loggingIn ? "Signing in..." : "Sign In"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setShowEmailForm(false); setLoginError(""); }}
                                    className="w-full text-aiesec-dark-grey text-sm hover:underline"
                                >
                                    Back to login options
                                </button>
                            </form>
                        )}

                        {loginError && (
                            <div className="mt-4 bg-[#FEE2E2] text-global-volunteer text-sm text-center py-2 px-4 rounded-xl">
                                {loginError}
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }

    // --- Admin Dashboard ---
    return (
        <>
            <HtmlHead title="Admin Panel — AIESEC" description="Admin panel for managing content." />

            {/* Toast */}
            {toast && (
                <div className={`fixed top-4 right-4 z-[100] px-5 py-3 rounded-xl shadow-xl text-white text-sm font-semibold transition-all ${toast.type === "error" ? "bg-global-volunteer" : "bg-aiesec-green"
                    }`}>
                    {toast.message}
                </div>
            )}

            <div className="min-h-screen bg-aiesec-light-grey">
                {/* Header */}
                <header className="bg-white shadow-lg px-4 sm:px-6 py-4 sticky top-0 z-50">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Image src={AiesecLogo} alt="AIESEC" width={100} height={25} />
                            <span className="hidden sm:inline text-aiesec-dark-grey text-sm">|</span>
                            <h1 className="hidden sm:inline text-sm font-bold text-black">
                                Admin Panel
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* User Avatar/Info */}
                            <div className="flex items-center gap-2">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-aiesec-blue text-white flex items-center justify-center text-xs font-bold">
                                        {(user.email || "A")[0].toUpperCase()}
                                    </div>
                                )}
                                <span className="text-sm text-aiesec-dark-grey hidden md:inline">{user.displayName || user.email}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 text-sm text-global-volunteer font-semibold hover:bg-aiesec-light-grey px-3 py-2 rounded-lg transition-colors"
                                title="Sign out"
                            >
                                <BsBoxArrowRight className="text-lg" />
                                <span className="hidden sm:inline">Sign out</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                    {/* Tab Navigation */}
                    <div className="flex gap-1 bg-white rounded-2xl shadow-lg p-1.5 mb-8">
                        <button
                            onClick={() => setActiveTab("news")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all text-sm ${activeTab === "news"
                                ? "bg-aiesec-blue text-white shadow-lg"
                                : "text-aiesec-dark-grey hover:bg-aiesec-light-grey"
                                }`}
                        >
                            <BsNewspaper /> News & Events
                        </button>
                        <button
                            onClick={() => setActiveTab("stories")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all text-sm ${activeTab === "stories"
                                ? "bg-aiesec-blue text-white shadow-lg"
                                : "text-aiesec-dark-grey hover:bg-aiesec-light-grey"
                                }`}
                        >
                            <BsChatQuote /> Experience Stories
                        </button>
                    </div>

                    {/* ═══════ NEWS & EVENTS TAB ═══════ */}
                    {activeTab === "news" && (
                        <>
                            {/* Stats Bar */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 text-center">
                                    <p className="text-2xl sm:text-3xl font-bold text-aiesec-blue">{items.length}</p>
                                    <p className="text-xs text-aiesec-dark-grey mt-1 font-semibold">Total Items</p>
                                </div>
                                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 text-center">
                                    <p className="text-2xl sm:text-3xl font-bold text-aiesec-green">{items.filter(i => i.category === "Event").length}</p>
                                    <p className="text-xs text-aiesec-dark-grey mt-1 font-semibold">Events</p>
                                </div>
                                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 text-center">
                                    <p className="text-2xl sm:text-3xl font-bold text-aiesec-blue">{items.filter(i => i.category === "News").length}</p>
                                    <p className="text-xs text-aiesec-dark-grey mt-1 font-semibold">News</p>
                                </div>
                            </div>

                            {/* Add Button */}
                            {!showForm && (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="mb-8 flex items-center gap-2 bg-aiesec-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0266cc] transition-all shadow-lg hover:shadow-xl active:scale-95"
                                >
                                    <BsPlus className="text-2xl" /> Add New Item
                                </button>
                            )}

                            {/* Add/Edit Form */}
                            {showForm && (
                                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border-l-4 border-aiesec-blue">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-black">
                                            {editingId ? "✏️ Edit Item" : "➕ Add New Item"}
                                        </h2>
                                        <button onClick={handleCancel} className="text-aiesec-dark-grey hover:text-black transition-colors">
                                            <BsX className="text-2xl" />
                                        </button>
                                    </div>
                                    <form onSubmit={handleSave} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-aiesec-dark-grey mb-1.5 uppercase tracking-wider">Title *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={form.title}
                                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-aiesec-mid-grey focus:border-aiesec-blue focus:outline-none text-black transition-colors"
                                                    placeholder="Event or news title"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-aiesec-dark-grey mb-1.5 uppercase tracking-wider">Category *</label>
                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setForm({ ...form, category: "Event" })}
                                                        className={`flex-1 py-3 rounded-xl font-semibold transition-all text-sm ${form.category === "Event"
                                                            ? "bg-aiesec-green text-white shadow-lg"
                                                            : "bg-aiesec-light-grey text-aiesec-dark-grey hover:bg-aiesec-mid-grey"
                                                            }`}
                                                    >
                                                        <BsCalendarEvent className="inline mr-1" /> Event
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setForm({ ...form, category: "News" })}
                                                        className={`flex-1 py-3 rounded-xl font-semibold transition-all text-sm ${form.category === "News"
                                                            ? "bg-aiesec-blue text-white shadow-lg"
                                                            : "bg-aiesec-light-grey text-aiesec-dark-grey hover:bg-aiesec-mid-grey"
                                                            }`}
                                                    >
                                                        <BsNewspaper className="inline mr-1" /> News
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-aiesec-dark-grey mb-1.5 uppercase tracking-wider">Description *</label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={form.description}
                                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-aiesec-mid-grey focus:border-aiesec-blue focus:outline-none text-black transition-colors resize-none"
                                                placeholder="A brief description about this event or news..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-aiesec-dark-grey mb-1.5 uppercase tracking-wider">Date *</label>
                                                <input
                                                    type="date"
                                                    required
                                                    value={form.date}
                                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-aiesec-mid-grey focus:border-aiesec-blue focus:outline-none text-black transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-aiesec-dark-grey mb-1.5 uppercase tracking-wider">
                                                    <BsImage className="inline mr-1" /> Image URL (optional)
                                                </label>
                                                <input
                                                    type="url"
                                                    value={form.imageUrl}
                                                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-aiesec-mid-grey focus:border-aiesec-blue focus:outline-none text-black transition-colors"
                                                    placeholder="https://example.com/image.jpg"
                                                />
                                            </div>
                                        </div>

                                        {/* Image Preview */}
                                        {form.imageUrl && (
                                            <div className="rounded-xl overflow-hidden border-2 border-aiesec-mid-grey h-40">
                                                <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                            </div>
                                        )}

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="bg-aiesec-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0266cc] transition-all disabled:opacity-50 active:scale-95"
                                            >
                                                {saving ? "Saving..." : editingId ? "✅ Update Item" : "✅ Add Item"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="bg-aiesec-light-grey text-aiesec-dark-grey px-8 py-3 rounded-xl font-semibold hover:bg-aiesec-mid-grey transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Items List */}
                            <h2 className="text-lg font-bold text-black mb-4">
                                {items.length > 0 ? "All Items" : ""}
                            </h2>

                            {dataLoading ? (
                                <div className="flex justify-center py-20">
                                    <div className="w-10 h-10 border-4 border-aiesec-blue border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : items.length === 0 ? (
                                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                                    <BsCalendarEvent className="mx-auto text-6xl text-aiesec-mid-grey mb-4" />
                                    <h3 className="text-xl font-bold text-black mb-2">No items yet</h3>
                                    <p className="text-aiesec-dark-grey text-sm mb-6">
                                        Click &quot;Add New Item&quot; to publish your first news or event!
                                    </p>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="bg-aiesec-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0266cc] transition-colors"
                                    >
                                        <BsPlus className="inline text-xl mr-1" /> Add Your First Item
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                                        >
                                            <div className="flex flex-col sm:flex-row">
                                                {/* Image Thumbnail */}
                                                {item.imageUrl && (
                                                    <div className="sm:w-32 h-24 sm:h-auto shrink-0">
                                                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div className="flex-1 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span
                                                                className={`text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${item.category === "News"
                                                                    ? "bg-aiesec-blue text-white"
                                                                    : "bg-aiesec-green text-white"
                                                                    }`}
                                                            >
                                                                {item.category === "News" ? <BsNewspaper /> : <BsCalendarEvent />}
                                                                {item.category}
                                                            </span>
                                                            <span className="text-xs text-aiesec-dark-grey font-semibold">
                                                                {formatDate(item.date)}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-base sm:text-lg font-bold text-black mb-0.5">{item.title}</h3>
                                                        <p className="text-sm text-aiesec-dark-grey line-clamp-1">{item.description}</p>
                                                    </div>
                                                    <div className="flex gap-1 shrink-0">
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="flex items-center gap-1.5 text-sm font-semibold text-aiesec-blue px-4 py-2 rounded-xl hover:bg-aiesec-light-grey transition-colors"
                                                        >
                                                            <BsPencil /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="flex items-center gap-1.5 text-sm font-semibold text-global-volunteer px-4 py-2 rounded-xl hover:bg-aiesec-light-grey transition-colors"
                                                        >
                                                            <BsTrash /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* ═══════ EXPERIENCE STORIES TAB ═══════ */}
                    {activeTab === "stories" && (
                        <>
                            {/* Stats Bar */}
                            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 text-center mb-8">
                                <p className="text-2xl sm:text-3xl font-bold text-aiesec-blue">{stories.length}</p>
                                <p className="text-xs text-aiesec-dark-grey mt-1 font-semibold">Total Stories</p>
                            </div>

                            {/* Add Button */}
                            {!showStoryForm && (
                                <button
                                    onClick={() => setShowStoryForm(true)}
                                    className="mb-8 flex items-center gap-2 bg-aiesec-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0266cc] transition-all shadow-lg hover:shadow-xl active:scale-95"
                                >
                                    <BsPlus className="text-2xl" /> Add New Story
                                </button>
                            )}

                            {/* Add/Edit Story Form */}
                            {showStoryForm && (
                                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border-l-4 border-aiesec-green">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-black">
                                            {editingStoryId ? "✏️ Edit Story" : "➕ Add New Story"}
                                        </h2>
                                        <button onClick={handleCancelStory} className="text-aiesec-dark-grey hover:text-black transition-colors">
                                            <BsX className="text-2xl" />
                                        </button>
                                    </div>
                                    <form onSubmit={handleSaveStory} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-aiesec-dark-grey mb-1.5 uppercase tracking-wider">Person Name *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={storyForm.name}
                                                    onChange={(e) => setStoryForm({ ...storyForm, name: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-aiesec-mid-grey focus:border-aiesec-blue focus:outline-none text-black transition-colors"
                                                    placeholder="e.g. Sudarshan Krishnan"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-aiesec-dark-grey mb-1.5 uppercase tracking-wider">Title *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={storyForm.title}
                                                    onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-aiesec-mid-grey focus:border-aiesec-blue focus:outline-none text-black transition-colors"
                                                    placeholder="e.g. Outgoing Global Talent"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-aiesec-dark-grey mb-1.5 uppercase tracking-wider">Story Content *</label>
                                            <textarea
                                                required
                                                rows={5}
                                                value={storyForm.content}
                                                onChange={(e) => setStoryForm({ ...storyForm, content: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-aiesec-mid-grey focus:border-aiesec-blue focus:outline-none text-black transition-colors resize-none"
                                                placeholder="Share their experience story..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-aiesec-dark-grey mb-1.5 uppercase tracking-wider">
                                                <BsImage className="inline mr-1" /> Image URL (optional)
                                            </label>
                                            <input
                                                type="url"
                                                value={storyForm.imageUrl}
                                                onChange={(e) => setStoryForm({ ...storyForm, imageUrl: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-aiesec-mid-grey focus:border-aiesec-blue focus:outline-none text-black transition-colors"
                                                placeholder="https://example.com/photo.jpg"
                                            />
                                        </div>

                                        {/* Image Preview */}
                                        {storyForm.imageUrl && (
                                            <div className="rounded-xl overflow-hidden border-2 border-aiesec-mid-grey h-40">
                                                <img src={storyForm.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                            </div>
                                        )}

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="submit"
                                                disabled={savingStory}
                                                className="bg-aiesec-green text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#00a85e] transition-all disabled:opacity-50 active:scale-95"
                                            >
                                                {savingStory ? "Saving..." : editingStoryId ? "✅ Update Story" : "✅ Add Story"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancelStory}
                                                className="bg-aiesec-light-grey text-aiesec-dark-grey px-8 py-3 rounded-xl font-semibold hover:bg-aiesec-mid-grey transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Stories List */}
                            <h2 className="text-lg font-bold text-black mb-4">
                                {stories.length > 0 ? "All Stories" : ""}
                            </h2>

                            {storiesLoading ? (
                                <div className="flex justify-center py-20">
                                    <div className="w-10 h-10 border-4 border-aiesec-blue border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : stories.length === 0 ? (
                                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                                    <BsChatQuote className="mx-auto text-6xl text-aiesec-mid-grey mb-4" />
                                    <h3 className="text-xl font-bold text-black mb-2">No stories yet</h3>
                                    <p className="text-aiesec-dark-grey text-sm mb-6">
                                        Add experience stories to display in the carousel on the homepage.
                                    </p>
                                    <button
                                        onClick={() => setShowStoryForm(true)}
                                        className="bg-aiesec-green text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#00a85e] transition-colors"
                                    >
                                        <BsPlus className="inline text-xl mr-1" /> Add Your First Story
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {stories.map((story) => (
                                        <div
                                            key={story.id}
                                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                                        >
                                            <div className="flex flex-col sm:flex-row">
                                                {/* Image Thumbnail */}
                                                {story.imageUrl && (
                                                    <div className="sm:w-32 h-24 sm:h-auto shrink-0">
                                                        <img src={story.imageUrl} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div className="flex-1 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-aiesec-green text-white inline-flex items-center gap-1 mb-1.5">
                                                            <BsChatQuote /> Story
                                                        </span>
                                                        <h3 className="text-base sm:text-lg font-bold text-black mb-0.5">{story.title}</h3>
                                                        <p className="text-sm text-aiesec-blue font-semibold">{story.name}</p>
                                                        <p className="text-sm text-aiesec-dark-grey line-clamp-1 mt-0.5">{story.content}</p>
                                                    </div>
                                                    <div className="flex gap-1 shrink-0">
                                                        <button
                                                            onClick={() => handleEditStory(story)}
                                                            className="flex items-center gap-1.5 text-sm font-semibold text-aiesec-blue px-4 py-2 rounded-xl hover:bg-aiesec-light-grey transition-colors"
                                                        >
                                                            <BsPencil /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteStory(story.id)}
                                                            className="flex items-center gap-1.5 text-sm font-semibold text-global-volunteer px-4 py-2 rounded-xl hover:bg-aiesec-light-grey transition-colors"
                                                        >
                                                            <BsTrash /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
