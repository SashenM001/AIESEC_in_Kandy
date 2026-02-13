import {
    ref,
    push,
    set,
    get,
    remove,
} from "firebase/database";
import { db } from "./firebase";

const COLLECTION_PATH = "newsAndEvents";

export async function getNewsAndEvents() {
    if (!db) return [];
    const dbRef = ref(db, COLLECTION_PATH);
    const snapshot = await get(dbRef);

    if (!snapshot.exists()) return [];

    const items = [];
    snapshot.forEach((child) => {
        items.push({ id: child.key, ...child.val() });
    });

    // Sort by date descending (newest first)
    items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return items;
}

export async function addNewsItem(data) {
    if (!db) return null;
    const dbRef = ref(db, COLLECTION_PATH);
    const newRef = push(dbRef);
    await set(newRef, {
        ...data,
        createdAt: Date.now(),
    });
    return newRef.key;
}

export async function updateNewsItem(id, data) {
    if (!db) return;
    const itemRef = ref(db, `${COLLECTION_PATH}/${id}`);
    await set(itemRef, {
        ...data,
        updatedAt: Date.now(),
    });
}

export async function deleteNewsItem(id) {
    if (!db) return;
    const itemRef = ref(db, `${COLLECTION_PATH}/${id}`);
    await remove(itemRef);
}

// ── Experience Stories ──────────────────────────────────────────────

const STORIES_PATH = "experienceStories";

export async function getExperienceStories() {
    if (!db) return [];
    const dbRef = ref(db, STORIES_PATH);
    const snapshot = await get(dbRef);

    if (!snapshot.exists()) return [];

    const items = [];
    snapshot.forEach((child) => {
        items.push({ id: child.key, ...child.val() });
    });

    items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    return items;
}

export async function addExperienceStory(data) {
    if (!db) return null;
    const dbRef = ref(db, STORIES_PATH);
    const newRef = push(dbRef);
    await set(newRef, {
        ...data,
        createdAt: Date.now(),
    });
    return newRef.key;
}

export async function updateExperienceStory(id, data) {
    if (!db) return;
    const itemRef = ref(db, `${STORIES_PATH}/${id}`);
    await set(itemRef, {
        ...data,
        updatedAt: Date.now(),
    });
}

export async function deleteExperienceStory(id) {
    if (!db) return;
    const itemRef = ref(db, `${STORIES_PATH}/${id}`);
    await remove(itemRef);
}
