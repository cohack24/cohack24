'use client'

import localforage from 'localforage'

declare global {
    export interface Window {
        db: {
            journals: LocalForage
            completedJournals: LocalForage
        }
    }
}

export function jewelLocalDb() {
    if (!window.db?.journals) {
        localforage.config({
            driver: localforage.INDEXEDDB,
            name: 'Jewel',
            version: 1.0,
            storeName: 'jewel',
            description: 'the local database for jewel'
        })
        window.db = { ...(window.db ?? {}), journals: localforage }
    }
    return window.db.journals
}

export function completedEntriesDb() {
    if (!window.db?.completedJournals) {
        const completedJournalsStore = localforage.createInstance({
            name: 'Jewel',
            storeName: 'completed_entries',
            version: 1.0,
        })
        window.db = { ...(window.db ?? {}), completedJournals: completedJournalsStore }
    }
    return window.db.completedJournals
}