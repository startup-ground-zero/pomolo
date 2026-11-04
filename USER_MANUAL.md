# Pomolo Mykonos Website User Manual

## Welcome

The Pomolo Mykonos website presents the showroom, its interior and exterior collections, partner brands, Cyclades work, and ways to contact the showroom team.

The website can be opened on a computer, tablet, or mobile phone. The navigation adapts to the screen size.

## Main Navigation

### Home

Select **Home** or the Pomolo logo to return to the homepage.

The homepage includes:

- A hero section with the Pomolo introduction.
- The main collection categories.
- Services and showroom information.
- About Pomolo and the owner.
- Contact details and the general contact form.

### Collections

Open **Collections** to browse the catalogue categories:

- Furniture (Indoor, Outdoor)
- Tiles
- Bathroom (Taps, Sanitary Ware, Accessories)
- Curtains (Blinds, Fabric)
- Parasols
- Lighting
- View All Catalogues

Select a category to open its catalogue page. On the catalogue page, select a collection card to open its catalogue viewer.

#### Catalogue viewer

The viewer lists the catalogues available for the selected collection. Each item shows its brand name, its title and, for files with a known size, the size, for example `Artemide - Outdoor 2026 (6.2 GB)`.

#### Managing catalogues (Google Drive)

The lists are read automatically from the Google Drive folder `POMOLO WEBSITE CATALOGUES`. Each collection has its own subfolder (`01_FURNITURE-INDOOR` to `10_LIGHTING`). No website update is needed when files change.

- **Add**: upload a PDF to the subfolder of the collection.
- **Name**: the file name must be `Brand - Catalogue title.pdf`, with spaces around the dash. The text before the dash is the brand; the text after it is the title. A file name without the dash is shown entirely as the brand.
- **Replace**: in Drive, right-click the file, select **Manage versions**, then **Upload new version**. Alternatively delete the old file and upload the new one.
- **Rename or remove**: rename or delete the file in Drive.
- Only PDF files are shown, sorted by file name.
- The main folder must stay shared as "Anyone with the link" (Viewer). If Drive cannot be reached, the viewer shows the last built-in list.

- **View** opens the catalogue in a new tab, so it can be read online. This button is not shown for very large files (100 MB or more), because they cannot be previewed in the browser.
- **Download** saves the PDF to the device.
- Large catalogues can take several minutes to download, depending on the connection. When a size is shown, a note says: "Large files. Download time depends on your connection."
- Catalogues are hosted on Google Drive. No Google account is needed to view or download them. For very large files, Google may show a message that it cannot scan the file for viruses; select **Download anyway** to continue.
- **Ask for a Quote** opens the quote form for the selected collection.

### Explore

Open **Explore** to access:

- **Brands & Partners**: Partner brand logos, filterable by category, each linking to the brand's own website, plus the architecture office partnership section.
- **Cyclades**: An introduction to Pomolo's work across the Cyclades islands.

### Services

Select **Services** on the homepage to see the available showroom and project support information.

### About Us

Select **About Us** to read about Pomolo, its approach, and the owner.

### Gallery

Select **Gallery** to view the live Instagram feed and open the Pomolo Instagram profile.

The Instagram feed is provided by Elfsight. The feed may take a moment to load and requires an internet connection.

### Contact

Select **Contact** to jump to the contact area on the homepage. The page includes the showroom address, email address, phone number, Instagram profile, and a contact form.

## Language

Use the **EN / EL** button in the header to switch the site between English and Greek. The choice is remembered on the device for the next visit.

## Requesting a Quote

There are two ways to request a quote:

1. Open **Collections**, select **View All Catalogues**, then select **Ask for a Quote** under the notice about new catalogues.
2. Open a specific catalogue collection and select **Ask for a Quote** in the catalogue viewer.

### General Catalogue Quote

The general quote link opens the quote form with the subject:

`Catalogue quote request - General`

### Specific Catalogue Quote

When a specific collection is selected, the quote form subject is filled with the collection name, for example:

`Catalogue quote request - Bathroom`

## Booking a Consultation

Select **Book a Consultation** from the navigation or from a consultation button on the site.

The consultation form asks for:

- Full name
- Email address
- Phone number
- Subject
- Project details or preferred visit date
- Privacy-policy consent

The subject is pre-filled as:

`Consultation request`

After completing the form, select **Request Consultation**.

## Using a Contact Form

The general contact form asks for:

- Full name
- Email address
- Phone number
- Subject
- Message
- Privacy-policy consent

To send a message:

1. Enter your full name.
2. Enter a valid email address.
3. Enter a phone number if the showroom should call you.
4. Enter a subject.
5. Describe your enquiry or project in the message box.
6. Read and accept the Privacy Policy.
7. Select **Send Enquiry**.

The quote form follows the same process and uses **Send Quote Request**. The consultation form uses **Request Consultation**.

Website forms are submitted through Web3Forms and delivered to the showroom email address. After sending, the visitor is taken to a thank-you page.

Do not enter payment-card details, passwords, identity documents, or other highly sensitive information into a website message.

## Phone and Email Contact

The site displays the showroom phone number, the email address `info@pomolo-mykonos.com` and the opening hours (shown in the footer of every page).

- Select the email address to open an email application.
- Select the phone number on a compatible device to start a call.
- Select the showroom address to open its location in Google Maps.
- Select the Instagram profile to open Instagram.

## Brands & Partners

The **Brands & Partners** page contains:

- A partner-brand logo area showing the brands working with Pomolo, filterable by category. Select a logo to open that brand's website in a new tab.
- An **Architecture Office Partnership** section for describing a professional collaboration and showing the partner office logo.
- A button to begin a collaboration enquiry through the consultation form.

The architecture office logo area is still a placeholder and should be replaced with the approved logo before publishing the final content.

## Mobile Use

On smaller screens, the full navigation is replaced by a menu button. Select the menu button to open the navigation, then select it again or select a page link to close it.

Forms stack into a single-column layout on smaller screens, so all fields remain easy to complete.

## If Something Does Not Load

- Refresh the page.
- Check that the device has an internet connection.
- Disable browser extensions that block external widgets if the Instagram feed is missing.
- Check that JavaScript is enabled for the catalogue viewer, mobile menu, and Elfsight feed.
- For a form problem, contact the showroom directly using the published phone number or email address.

## Privacy and Website Terms

The **Privacy Policy** explains how information submitted through the forms is handled.

The **Website Terms** explain the status of catalogue information, quotes, external links, and website content.

---

# Owner and Administrator Guide

This part is for the owner and whoever maintains the website. It explains where each piece of content lives and how to change it.

## How the website is published

- The website is a set of static files kept in a GitHub repository. There is no admin panel: to change something, edit the file and upload it to GitHub.
- To upload: open the repository on github.com, select **Add file > Upload files**, drag in the changed files from the `pomolo` folder on the computer, and select **Commit changes**. A file with the same name replaces the old one.
- The site updates about one to two minutes later. Check the repository's **Actions** tab for a green tick, then press **Ctrl + F5** on the live site.
- When `script.js` or `styles.css` changes, the version number in each page (`script.js?v=...`, `styles.css?v=...`) must also change, so visitors' browsers load the new file. Update it in every HTML file.
- Do not upload the `_original_images` backup folder.

## Contact details and opening hours

- **Homepage contact area** (address, email, phone, Instagram): `index.html`, section "Contact".
- **Footer on every page** (address, email, phone, opening hours, Instagram, Facebook): the shared footer in `script.js`, search for `footer-contact`. Opening hours are currently `09:00 - 18:00`. Add days or seasonal hours there.
- **Search-engine data** (name, phone, address, opening hours, map position): the `application/ld+json` block at the top of `index.html`. Keep it in line with the footer.
- The privacy and terms pages also contain the email address.

## Forms

- The homepage contact form, the consultation form and the quote form are sent by **Web3Forms** (web3forms.com), a free service with a limit of 250 messages per month. Web3Forms emails a warning at 90% and at 100% of the limit.
- Messages arrive at the email address registered in the Web3Forms account. To change that address or to see recent messages (kept for 30 days), sign in at app.web3forms.com. The address does not appear in the website files.
- The access key is in each form (`name="access_key"`) in `index.html`, `consultation.html` and `quote.html`. It is a public key, designed to be in the page.
- After sending, visitors go to `thank-you.html`. The address is in the `redirect` field of each form and must point to the final domain.
- Test all three forms after any change, and check that the message reaches the inbox (also the spam folder).

## Catalogues

- Catalogue PDFs are stored in Google Drive, in a folder shared as **Anyone with the link, Viewer**. Use a company-controlled account, turn on 2-step verification, and give a second person edit access.
- Keep one subfolder per catalogue card: Furniture - Indoor, Furniture - Outdoor, Tiles, Bathroom - Taps, Bathroom - Sanitary Ware, Bathroom - Accessories, Curtains - Blinds, Curtains - Fabric, Parasols, Lighting.
- Keep a spreadsheet with: card, title, brand, file name, Drive link, size, year.
- Exact steps for adding a new catalogue and for replacing an existing one are in the two sections that follow this list.
- To show catalogues on the website, edit `catalogueItems` in `script.js`, one entry per card, with the card's category name (`indoor`, `outdoor`, `tiles`, `taps`, `sanitary-ware`, `accessories`, `blinds`, `fabric`, `parasols`, `lighting`):

```js
const catalogueItems = {
  lighting: [
    { title: 'Artemide Outdoor 2026', url: 'https://drive.google.com/file/d/FILE_ID/view', size: '6.2 GB' }
  ]
};
```

- The Drive link is the normal share link. The **Download** button is built from it automatically.
- Cards without an entry keep showing placeholder items. Remove the placeholder behaviour only when every card has real catalogues.
- Check each link in a private browser window before publishing. Very popular large files can be blocked by Google for up to 24 hours ("download quota exceeded"); the block lifts by itself.
- Make sure the brand allows its catalogue to be redistributed.

### Adding a new catalogue to Google Drive (step by step)

**A. Prepare the file**

1. Check that the brand allows its catalogue to be shared.
2. Rename the PDF clearly, for example `Artemide_Outdoor-Lighting_2026.pdf`. Use no accents and avoid spaces where possible.
3. Open the PDF once to check that it opens and the pages are in order.
4. Note the file size (right-click the file in Windows, select **Properties**). The site shows it, for example `6.2 GB`.

**B. Upload the file**

Use the browser for files up to a few hundred MB:

1. Go to drive.google.com and sign in with the company account.
2. Open **My Drive > Pomolo Website Catalogues** and then the subfolder for the right card (for example **Lighting**).
3. Select **New > File upload** and choose the PDF. Or drag the file from Windows Explorer into the Drive page.
4. A progress box appears at the bottom right. Keep the browser tab open until it says the upload is complete.

For files of 1 GB or more, use Google Drive for desktop, which resumes if the connection drops:

1. Install Google Drive for desktop (google.com/drive/download) and sign in with the company account. A drive called **Google Drive** appears in Windows Explorer.
2. In Explorer open **Google Drive > My Drive > Pomolo Website Catalogues** and the correct subfolder.
3. Copy the PDF into that folder.
4. Click the Drive icon in the system tray (bottom right of the screen) and wait until it says syncing is complete. Keep the computer on and connected until then. A 6 GB file can take hours.
5. Open drive.google.com and check that the file appears in the folder.

**C. Check the sharing**

1. In drive.google.com, right-click the **Pomolo Website Catalogues** folder and select **Share**.
2. **General access** must say **Anyone with the link**, with the role **Viewer**. New files in the folder inherit this.
3. If it says **Restricted**, change it and select **Done**.

**D. Copy the link**

1. Right-click the new PDF in Drive and select **Share > Copy link**.
2. The link looks like `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`. Paste it into the catalogue spreadsheet next to the title, file name, size and year.

**E. Test the link**

1. Open a private (incognito) browser window, so you are not signed in to Google.
2. Paste the link. The file page must open without asking you to sign in.
3. Select **Download**. For very large files select **Download anyway** if Google shows a virus-scan message. Check that the download starts.

**F. Add it to the website**

1. Open `script.js` and find `catalogueItems`.
2. Add a line for the card, using the exact link and size:

```js
lighting: [
  { title: 'Artemide Outdoor 2026', url: 'https://drive.google.com/file/d/FILE_ID/view', size: '6.2 GB' }
]
```

3. Save and upload `script.js` to GitHub (see "How the website is published").
4. Open the live site (press **Ctrl + F5**), open the catalogue card, and check the title, the size, the **Download** button and, in Greek mode, the buttons.

### Updating (replacing) a catalogue in Google Drive (step by step)

Use this when a brand sends a newer version of a catalogue. Do **not** delete the old file and upload a new one, because that creates a new link and the website would point to a deleted file. Instead, replace the content of the existing file. The link stays the same, so nothing on the website needs to change (except the size, if it changed).

**A. Prepare the new file**

1. Name it clearly. The name does not have to match the old one, but keep the same style, for example `Artemide_Outdoor-Lighting_2027.pdf`.
2. Open it once and check that it is correct and complete.
3. Note the new file size.

**B. Upload it as a new version**

1. Go to drive.google.com and sign in with the company account.
2. Open **My Drive > Pomolo Website Catalogues** and the subfolder that holds the old catalogue.
3. Right-click the old PDF and select **File information > Manage versions**. (In some views it is listed directly as **Manage versions**.)
4. In the window that opens, select **Upload new version**.
5. Choose the new PDF from the computer.
6. Wait until the upload finishes. For large files keep the tab open and use a stable connection. The list now shows the new version as the current one.
7. Optional: in the same window, open the menu of the old version (three dots) and select **Keep forever** if you want to keep it. Otherwise Google keeps previous versions for a limited time and then removes them.
8. Close the window.

**C. Check that it worked**

1. Right-click the file again and select **File information > Manage versions**. The new version must be at the top.
2. Open the file's link in a private (incognito) window and download it. Check that it is the new catalogue and that it opens correctly.
3. Confirm the sharing is still **Anyone with the link, Viewer**. Replacing a version does not change it.

**D. Update the website only if something else changed**

- If the **file size** changed noticeably, update `size` for that item in `catalogueItems` in `script.js`, then upload `script.js` to GitHub.
- If the **title or year** should change (for example from 2026 to 2027), update `title` in the same place.
- If only the content changed, nothing on the website needs to be uploaded.

**Removing a catalogue**

1. Delete its line from `catalogueItems` in `script.js` and upload `script.js` to GitHub.
2. Only then move the file in Drive to the trash. If you delete it in Drive first, the website link shows an error until the website is updated.

## Brands & Partners

- Each brand is one line in `brands.html`: logo image, link and category (`bathroom`, `furniture`, `lighting`, `tiles`, `curtains`, `parasols`). To add a brand, copy an existing line, change the logo file, name and link, and upload the logo image as well.
- The architecture office section in the same file is a placeholder. Replace `Architecture Studio Logo` with the approved logo and name.

## Greek and English

- All Greek text is in a dictionary named `greekTranslations` in `script.js`. Each English sentence on the site must appear there exactly as written on the page, with its Greek version.
- When English text on a page changes, update the matching dictionary entry too. If an entry is missing, that text stays in English in Greek mode.
- Catalogue titles added in `catalogueItems` are shown as written, because they are usually brand names.

## Images and videos

- Keep photos below about 500 KB and videos in the homepage and About section as small as practical. Large files slow the site, especially on phones.
- The hero video is `Pomolo-Mykonos-57s-Hero-optimized.mp4`, and `store_external_overview_2.jpg` is the image shown while it loads.
- Original, uncompressed photos are kept outside the website folder, in `_original_images`.

## Legal pages

- Add the legal entity details (registered name and legal form, address, VAT and tax office, G.E.MI. number) to the footer in `script.js`, to the "Who is responsible for your information" section of `privacy.html`, and to the Contact section of `terms.html`. Update the "Last updated" date on both pages.
- The Gallery page loads Elfsight and Instagram. Ask a lawyer whether a cookie or consent banner is required.

## Launch checklist (when `www.pomolo-mykonos.com` goes live)

1. Check that `info@pomolo-mykonos.com` is a working mailbox.
2. Change the form `redirect` address in `index.html`, `consultation.html` and `quote.html` to `https://www.pomolo-mykonos.com/thank-you.html`.
3. In the Web3Forms form settings, change the website address to `pomolo-mykonos.com`.
4. Confirm that the canonical, social-sharing, `sitemap.xml` and `robots.txt` addresses use the final domain (they already do).
5. Submit `sitemap.xml` in Google Search Console.
6. Test all pages on a phone and a computer, including the Greek version, the three forms and a catalogue download.
