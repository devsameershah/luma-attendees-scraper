(async function() {
  // 1. Collect attendee links and deduplicate by profile URL
  const attendeeLinks = Array.from(document.querySelectorAll('a[href^="/user/"]'));
  const seen = new Set();
  const attendees = [];
  for (const link of attendeeLinks) {
    const url = link.href.startsWith('http') ? link.href : (location.origin + link.getAttribute('href'));
    if (seen.has(url)) continue;
    seen.add(url);
    attendees.push({
      name: link.textContent.trim(),
      profileUrl: url
    });
  }

  // 2. Helper to fetch and parse social links from a profile page
  async function getSocialLinks(profileUrl) {
    try {
      const res = await fetch(profileUrl, { credentials: 'include' });
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const socialLinks = Array.from(doc.querySelectorAll('.social-links a'));
      const result = {
        instagram: '',
        x: '',
        tiktok: '',
        linkedin: '',
        website: ''
      };
      for (const a of socialLinks) {
        const href = a.href;
        if (/instagram\.com/i.test(href)) result.instagram = href;
        else if (/twitter\.com|x\.com/i.test(href)) result.x = href;
        else if (/tiktok\.com/i.test(href)) result.tiktok = href;
        else if (/linkedin\.com/i.test(href)) result.linkedin = href;
        else if (!/lumacdn\.com|lu\.ma/i.test(href)) result.website = href; // fallback for personal website
      }
      return result;
    } catch (e) {
      return {
        instagram: '',
        x: '',
        tiktok: '',
        linkedin: '',
        website: ''
      };
    }
  }

  // 3. Process all attendees, one at a time to avoid rate limits
  const rows = [
    ['Name', 'Profile URL', 'Instagram', 'X', 'TikTok', 'LinkedIn', 'Website']
  ];
  for (const attendee of attendees) {
    const socials = await getSocialLinks(attendee.profileUrl);
    rows.push([
      attendee.name,
      attendee.profileUrl,
      socials.instagram,
      socials.x,
      socials.tiktok,
      socials.linkedin,
      socials.website
    ]);
    // Optional: show progress
    console.log(`Processed: ${attendee.name}`);
    await new Promise(r => setTimeout(r, 500)); // polite delay
  }

  // 4. Download as CSV
  const csv = rows.map(r => r.map(x => `"${(x||'').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type: 'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'luma_attendees_with_socials.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
})(); 
