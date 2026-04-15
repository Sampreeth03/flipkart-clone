const Footer = () => {
  return (
    <footer style={{
      background: '#000',
      width: '100vw',
      marginLeft: 'calc(50% - 50vw)',
      marginTop: 20,
      color: '#fff',
      fontFamily: 'inherit',
    }}>

      {/* ── MAIN LINKS SECTION ── */}
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: '28px 32px 24px 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1.4fr 1.6fr 1.6fr',
        gap: '0 18px',
      }}>

        {/* ABOUT */}
        <div>
          <p style={{ color: '#878787', fontSize: 12, fontWeight: 600, marginBottom: 16, letterSpacing: 0.5 }}>ABOUT</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Contact Us', 'About Us', 'Careers', 'Flipkart Stories', 'Press', 'Corporate Information'].map(item => (
              <li key={item}>
                <a href="#" style={{ color: '#fff', fontSize: 13, textDecoration: 'none', lineHeight: 1.4 }}
                  onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.target.style.textDecoration = 'none'}
                >{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* GROUP COMPANIES */}
        <div>
          <p style={{ color: '#878787', fontSize: 12, fontWeight: 600, marginBottom: 16, letterSpacing: 0.5 }}>GROUP COMPANIES</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Myntra', 'Cleartrip', 'Shopsy'].map(item => (
              <li key={item}>
                <a href="#" style={{ color: '#fff', fontSize: 13, textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.target.style.textDecoration = 'none'}
                >{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* HELP */}
        <div>
          <p style={{ color: '#878787', fontSize: 12, fontWeight: 600, marginBottom: 16, letterSpacing: 0.5 }}>HELP</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Payments', 'Shipping', 'Cancellation & Returns', 'FAQ'].map(item => (
              <li key={item}>
                <a href="#" style={{ color: '#fff', fontSize: 13, textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.target.style.textDecoration = 'none'}
                >{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONSUMER POLICY */}
        <div>
          <p style={{ color: '#878787', fontSize: 12, fontWeight: 600, marginBottom: 16, letterSpacing: 0.5 }}>CONSUMER POLICY</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Cancellation & Returns', 'Terms Of Use', 'Security', 'Privacy', 'Sitemap', 'Grievance Redressal', 'EPR Compliance', 'FSSAI Food Safety Connect App'].map(item => (
              <li key={item}>
                <a href="#" style={{ color: '#fff', fontSize: 13, textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.target.style.textDecoration = 'none'}
                >{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* MAIL US */}
        <div>
          <p style={{ color: '#878787', fontSize: 12, fontWeight: 600, marginBottom: 16, letterSpacing: 0.5 }}>Mail Us:</p>
          <p style={{ color: '#fff', fontSize: 13, lineHeight: 1.8, margin: '0 0 20px 0' }}>
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &amp;<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>
          <p style={{ color: '#878787', fontSize: 12, fontWeight: 600, marginBottom: 12, letterSpacing: 0.5 }}>Social:</p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {/* Facebook */}
            <a href="#" style={{ color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #555', textDecoration: 'none' }}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            {/* X/Twitter */}
            <a href="#" style={{ color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #555', textDecoration: 'none' }}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" style={{ color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #555', textDecoration: 'none' }}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" style={{ color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #555', textDecoration: 'none' }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        {/* REGISTERED OFFICE */}
        <div>
          <p style={{ color: '#878787', fontSize: 12, fontWeight: 600, marginBottom: 16, letterSpacing: 0.5 }}>Registered Office Address:</p>
          <p style={{ color: '#fff', fontSize: 13, lineHeight: 1.8, margin: '0 0 8px 0' }}>
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &amp;<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India<br />
            CIN : U51109KA2012PTC066107
          </p>
          <p style={{ color: '#fff', fontSize: 13, lineHeight: 1.8, margin: 0 }}>
            Telephone:{' '}
            <a href="tel:04445614700" style={{ color: '#2874f0', textDecoration: 'none' }}>044-45614700</a>
            {' / '}
            <a href="tel:04467415800" style={{ color: '#2874f0', textDecoration: 'none' }}>044-67415800</a>
          </p>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ borderTop: '1px solid #2e3e50', maxWidth: '100%' }} />

      {/* ── BOTTOM BAR ── */}
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: '10px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
      }}>

        {/* Left: Bottom links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none', fontSize: 13 }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Become a Seller
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none', fontSize: 13 }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/>
            </svg>
            Advertise
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none', fontSize: 13 }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/>
            </svg>
            Gift Cards
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none', fontSize: 13 }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Help Center
          </a>
        </div>

        {/* Center: Copyright */}
        <div style={{ color: '#fff', fontSize: 13, textAlign: 'center' }}>
          © 2007-2026 Flipkart.com
        </div>

        {/* Right: Payment icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[
            { label: 'VISA', bg: '#1a1f71', color: '#fff', fontSize: 9, fontWeight: 900 },
            { label: 'MC', bg: '#fff', color: '#333', fontSize: 8, fontWeight: 700 },
            { label: 'maestro', bg: '#fff', color: '#333', fontSize: 7, fontWeight: 600 },
            { label: 'AMEX', bg: '#2E77BC', color: '#fff', fontSize: 7, fontWeight: 700 },
            { label: 'DINERS', bg: '#fff', color: '#333', fontSize: 6, fontWeight: 600 },
            { label: 'DISCOVER', bg: '#fff', color: '#333', fontSize: 5.5, fontWeight: 600 },
            { label: 'RuPay', bg: '#fff', color: '#1a6dab', fontSize: 6.5, fontWeight: 700 },
            { label: 'NET\nBANKING', bg: '#fff', color: '#333', fontSize: 5.5, fontWeight: 600 },
            { label: 'CASH ON\nDELIVERY', bg: '#fff', color: '#333', fontSize: 5, fontWeight: 600 },
            { label: 'EMI\nOPTIONS', bg: '#fff', color: '#333', fontSize: 5, fontWeight: 600 },
          ].map(({ label, bg, color, fontSize, fontWeight }) => (
            <div key={label} style={{
              background: bg,
              borderRadius: 3,
              padding: '3px 5px',
              minWidth: 32,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize,
              fontWeight,
              color,
              whiteSpace: 'pre',
              textAlign: 'center',
              lineHeight: 1.2,
              border: bg === '#fff' ? '1px solid #e0e0e0' : 'none',
            }}>
              {label}
            </div>
          ))}
        </div>
      </div>

    </footer>
  );
};

export default Footer;