'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackScrollDepth, trackTimeOnPage } from '@/lib/analytics';

/**
 * Hook to track scroll depth and time on page
 * @param pageName - Name of the page for tracking
 */
export const useAnalyticsTracking = (pageName: string) => {
    const lastScrollPercentageRef = useRef(0);
    const pageLoadTimeRef = useRef(Date.now());
    const scrollTrackedRef = useRef<Set<number>>(new Set());

    const handleScroll = useCallback(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;

        const scrollPercentage = (scrollTop + windowHeight) / documentHeight;

        // Track scroll depth at 25%, 50%, 75%, and 100%
        const thresholds = [0.25, 0.5, 0.75, 1];
        for (const threshold of thresholds) {
            if (scrollPercentage >= threshold && !scrollTrackedRef.current.has(threshold * 100)) {
                trackScrollDepth(threshold * 100);
                scrollTrackedRef.current.add(threshold * 100);
            }
        }

        lastScrollPercentageRef.current = scrollPercentage * 100;
    }, []);

    useEffect(() => {
        // Track time on page
        const handleBeforeUnload = () => {
            const timeSpent = (Date.now() - pageLoadTimeRef.current) / 1000;
            trackTimeOnPage(pageName, timeSpent);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [pageName, handleScroll]);
};

/**
 * Hook to track element visibility (IntersectionObserver)
 * @param elementRef - Reference to the element to track
 * @param eventName - Name of the event to track
 */
export const useElementVisibility = (
    elementRef: React.RefObject<HTMLElement>,
    eventName: string
) => {
    useEffect(() => {
        if (!elementRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    trackScrollDepth(entry.intersectionRatio * 100);
                }
            },
            { threshold: [0.25, 0.5, 0.75, 1] }
        );

        observer.observe(elementRef.current);

        return () => {
            observer.disconnect();
        };
    }, [elementRef, eventName]);
};
