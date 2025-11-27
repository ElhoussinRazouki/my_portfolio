/**
 * Analytics utility functions for tracking user interactions and events
 */

// Track a custom event
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, eventData);
    }
};

// Track page view (Next.js automatically tracks on route changes, but this is for manual tracking)
export const trackPageView = (pagePath: string, pageTitle: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', {
            page_path: pagePath,
            page_title: pageTitle,
        });
    }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, buttonCategory?: string) => {
    trackEvent('button_click', {
        button_name: buttonName,
        button_category: buttonCategory || 'general',
    });
};

// Track form submissions
export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
    trackEvent('form_submission', {
        form_name: formName,
        ...formData,
    });
};

// Track link clicks
export const trackLinkClick = (linkUrl: string, linkText?: string, isExternal?: boolean) => {
    trackEvent('link_click', {
        link_url: linkUrl,
        link_text: linkText,
        is_external: isExternal || false,
    });
};

// Track section views
export const trackSectionView = (sectionName: string) => {
    trackEvent('section_view', {
        section_name: sectionName,
    });
};

// Track project interaction
export const trackProjectInteraction = (projectName: string, interactionType: 'view' | 'click' | 'open') => {
    trackEvent('project_interaction', {
        project_name: projectName,
        interaction_type: interactionType,
    });
};

// Track skill interaction
export const trackSkillInteraction = (skillName: string) => {
    trackEvent('skill_interaction', {
        skill_name: skillName,
    });
};

// Track experience interaction
export const trackExperienceInteraction = (companyName: string, interactionType: 'view' | 'expand') => {
    trackEvent('experience_interaction', {
        company_name: companyName,
        interaction_type: interactionType,
    });
};

// Track contact method click
export const trackContactClick = (contactMethod: string, contactValue?: string) => {
    trackEvent('contact_click', {
        contact_method: contactMethod,
        contact_value: contactValue,
    });
};

// Track scroll depth
export const trackScrollDepth = (scrollPercentage: number) => {
    trackEvent('scroll_depth', {
        scroll_percentage: Math.round(scrollPercentage),
    });
};

// Track time on page (in seconds)
export const trackTimeOnPage = (pageName: string, timeSpent: number) => {
    trackEvent('time_on_page', {
        page_name: pageName,
        time_spent_seconds: Math.round(timeSpent),
    });
};

// Track document download
export const trackDownload = (fileName: string, fileType?: string) => {
    trackEvent('download', {
        file_name: fileName,
        file_type: fileType,
    });
};

// Declare gtag on window object for TypeScript
declare global {
    interface Window {
        gtag?: (command: string, action: string, data?: Record<string, any>) => void;
    }
}
