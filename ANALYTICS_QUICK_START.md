# Google Analytics Quick Start Guide

## Overview

Your portfolio now has comprehensive Google Analytics tracking with ID **G-R9JFMF7SC9**. This guide helps you get started monitoring your visitor data.

---

## Accessing Your Analytics Dashboard

### Step 1: Go to Google Analytics

1. Visit [analytics.google.com](https://analytics.google.com)
2. Log in with your Google account
3. Select your portfolio property

### Step 2: View Real-time Data

- Go to **Reports** > **Realtime**
- See live visitors on your site
- Watch interactions happen in real-time

### Step 3: Check Event Data

- Go to **Reports** > **Events**
- View all tracked events and their frequency
- See most popular sections and interactions

---

## Key Metrics to Monitor

### Essential Metrics

1. **Users** - Total unique visitors
2. **Sessions** - Total visits to your site
3. **Session Duration** - Average time spent
4. **Bounce Rate** - % of visitors who leave without interaction
5. **Conversion Rate** - % who take desired action

### Event Metrics (What We Track)

1. **section_view** - When users enter each section

   - Use: Track which sections interest visitors most
   - Target: Projects and skills should have high views

2. **link_click** - External links clicked

   - Use: See which GitHub/LinkedIn links get clicked
   - Target: Contact links should show engagement

3. **project_interaction** - Project clicks and opens

   - Use: Identify most interesting projects
   - Target: Use to prioritize project showcase

4. **contact_click** - Social media link clicks

   - Use: Track preferred contact method
   - Target: Monitor engagement with contact options

5. **button_click** - CTA button clicks

   - Use: Test button effectiveness
   - Target: Improve conversion with A/B testing

6. **scroll_depth** - How far users scroll
   - Use: Measure engagement with full page
   - Target: 75%+ users should scroll past hero

---

## Setting Up Your Dashboard

### Create Custom Dashboard (5 min setup)

1. Go to **Dashboards** in left menu
2. Click **Create Dashboard**
3. Add widgets:
   - User Summary
   - Events Over Time
   - Top Events
   - Page Views by Section

### Create Goals/Conversions

1. Go to **Conversions** > **Goals** (Admin section)
2. Create goals for:
   - GitHub clicks
   - LinkedIn clicks
   - Email clicks
   - Project views

---

## Monthly Analytics Checklist

### Week 1

- [ ] Review total visitors and trend
- [ ] Check bounce rate (should be <50%)
- [ ] Identify top traffic sources
- [ ] Review new vs returning visitors

### Week 2

- [ ] Analyze most viewed sections
- [ ] Check project interaction rates
- [ ] Review skill category interest
- [ ] Monitor contact clicks

### Week 3

- [ ] Analyze user flow/path
- [ ] Check mobile vs desktop engagement
- [ ] Review geographic breakdown
- [ ] Compare to previous month

### Week 4

- [ ] Set goals for next month
- [ ] Optimize low-performing sections
- [ ] Update GA annotations with changes
- [ ] Plan content updates

---

## Interpreting Your Data

### Good Signs ✅

- High section view events
- Low bounce rate (<60%)
- High project interaction
- Strong link click engagement
- Users scroll to 75%+ depth
- Average session > 2 minutes

### Red Flags 🚩

- High bounce rate (>70%)
- Low project views
- Few contact clicks
- Low scroll depth (<25%)
- Short session duration (<30 seconds)

---

## Advanced Tracking Tips

### Add Tracking to New Components

When adding new components, use these utilities:

```typescript
import { trackEvent, trackSectionView, trackLinkClick } from '@/lib/analytics';

// Track section entrance
<section onMouseEnter={() => trackSectionView('my_section')}>

// Track link clicks
<a onClick={() => trackLinkClick(url, 'label', true)}>

// Track custom events
<button onClick={() => trackEvent('custom_action', { data: 'value' })}>
```

### Verify Tracking is Working

1. Open your site in new tab
2. Open **Developer Tools** (F12)
3. Go to **Console**
4. Scroll around and interact
5. Check for any errors
6. Look for gtag events firing

---

## Troubleshooting

### No Data Showing?

1. Wait 24 hours - GA takes time to process
2. Check that you're in correct property
3. Verify environment variable is set correctly
4. Check console for errors (F12)
5. Ensure analytics.ts file is loading

### Events Not Tracking?

1. Verify `'use client'` directive in components
2. Check function calls are correct
3. Ensure gtag is available (window.gtag)
4. Verify event names in code match GA property
5. Check for TypeScript/JavaScript errors

### Performance Issues?

1. Analytics script is loaded asynchronously
2. Should have <50ms impact
3. If slower, check network tab
4. Verify GA is not blocking page load

---

## Data Privacy Notice

### What's Being Tracked

- ✅ General user behavior
- ✅ Device and browser info
- ✅ Approximate location (city level)
- ✅ Section/page interactions
- ❌ No personal data collected
- ❌ No sensitive information stored

### Privacy Considerations

1. Consider adding privacy policy
2. Disclose Google Analytics usage
3. Allow users to opt-out if needed
4. Review GA4 data retention (default: 14 months)

---

## Resources

### Official Documentation

- [Google Analytics 4 Help Center](https://support.google.com/analytics)
- [GA4 Events Documentation](https://support.google.com/analytics/answer/9322688)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

### Useful Tools

- [GA4 Event Builder](https://ga-dev-tools.web.app/event-builder/)
- [Analytics Snapshot](https://analytics.google.com) (Dashboard)
- [Google Search Console](https://search.google.com/search-console) (SEO data)

---

## Support

### Common Questions

**Q: Why is my data delayed?**
A: Google Analytics can take 24-48 hours to process data, especially on first day.

**Q: Can I track form submissions?**
A: Yes! Use `trackFormSubmission()` function when form is added.

**Q: How do I track outbound links?**
A: Already implemented! `trackLinkClick()` captures all external links.

**Q: How long is data kept?**
A: Default is 14 months. Adjustable in GA4 settings.

**Q: Can I combine with other tools?**
A: Yes! GA4 can work alongside heatmaps (Hotjar), session recording, etc.

---

## Next Actions

1. **Today**: Visit analytics.google.com and explore your data
2. **This Week**: Create a custom dashboard
3. **Next Week**: Review analytics with focus on conversion
4. **Monthly**: Use data to optimize your portfolio

---

## Metrics Definitions

**Session**: A group of interactions with your site within 30 minutes
**Bounce Rate**: % of single-page sessions (no interaction)
**Engagement Rate**: % of sessions with meaningful interactions
**Scroll Depth**: How far down page the user scrolled (25%, 50%, 75%, 100%)
**Time on Page**: Total duration user spent on page
**Events**: Specific user actions you're tracking (clicks, views, etc.)

---

**Happy analyzing! Your portfolio is now data-driven! 📊**
