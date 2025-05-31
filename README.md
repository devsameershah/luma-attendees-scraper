# Luma Attendee Scraper

This script allows you to extract attendee names, profile URLs, and their social media links (Instagram, X/Twitter, TikTok, LinkedIn, and personal website) from a Luma event page. The results are downloaded as a CSV file for easy use.

## How to Use

1. **Visit the Luma Event Page**
   - Go to the Luma event page where the attendee list is visible.

2. **Click on the Attendee List**
   - Make sure the attendee list is open and visible.

3. **Scroll to the Bottom**
   - Scroll all the way down to ensure the full list of attendees is loaded (Luma loads more attendees as you scroll).

4. **Open Developer Tools**
   - Right-click anywhere on the page and select `Inspect` or press `Cmd+Option+I` (Mac) or `Ctrl+Shift+I` (Windows/Linux).
   - Go to the `Console` tab.

5. **Enable Pasting in the Console**
   - For security, Chrome disables pasting code directly into the console. To enable it, type `allow pasting` and press Enter.

6. **Paste and Run the Script**
   - Copy the contents of `luma_attendee_scraper.js` and paste it into the console.
   - Press Enter to run the script.

7. **Download the CSV**
   - The script will process each attendee, fetch their social links, and automatically download a CSV file named `luma_attendees_with_socials.csv` when done.

---

**Don't forget to star ⭐ and comment if you found this useful or have suggestions!**

Cheers! 
