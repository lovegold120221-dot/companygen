export interface BrandProfile {
  company_name: string;
  company_legal_name: string;
  primary_color: string;
  primary_color_light: string;
  secondary_color: string;
  background_color: string;
  text_color: string;
  company_address: string;
  company_email: string;
  company_website: string;
  founder_name: string;
  slogan_1: string;
  slogan_2: string;
  slogan_3: string;
  logo_svg: string;
  logo_icon: string;
  social_banners: string[];
  social_posts: { text: string; sub: string }[];
}

export const DOCS = [
  { id: "letterhead", code: "04.01", title: "Letterhead", formats: "HTML / DOCX / PDF", purpose: "Official branded blank letterhead.", category: "Stationery", signable: false, fields: ["recipient_name", "recipient_company", "recipient_address", "subject", "body", "sender_name", "sender_title"] },
  { id: "invoice", code: "04.02", title: "Invoice", formats: "HTML / XLSX / PDF", purpose: "Commercial invoice with line items.", category: "Finance", signable: false, fields: ["client_company", "client_vat", "client_address", "invoice_no", "issue_date", "due_date", "item_1", "qty_1", "rate_1", "payment_terms"] },
  { id: "quotation", code: "04.03", title: "Quotation", formats: "HTML / XLSX / PDF", purpose: "Quote/proposal document with scope.", category: "Finance", signable: true, fields: ["client_company", "client_address", "quote_no", "issue_date", "valid_until", "item_1", "qty_1", "rate_1", "scope", "approver_name"] },
  { id: "business-letter", code: "04.04", title: "Business Letter", formats: "HTML / DOCX / PDF", purpose: "Formal business letter template.", category: "Correspondence", signable: true, fields: ["recipient_name", "recipient_company", "recipient_address", "subject", "body", "sender_name", "sender_title"] },
  { id: "service-policy", code: "04.05", title: "Service Policy", formats: "HTML / PDF", purpose: "Public-facing service delivery policy.", category: "Policy", signable: false, fields: ["effective_date", "policy_version", "company_name", "contact_email"] },
  { id: "terms-conditions", code: "04.06", title: "Terms & Conditions", formats: "HTML / PDF", purpose: "General commercial terms.", category: "Legal", signable: true, fields: ["effective_date", "policy_version", "company_name", "contact_email", "governing_law"] },
  { id: "privacy-policy", code: "04.07", title: "Privacy Policy", formats: "HTML / PDF", purpose: "Privacy policy covering personal data.", category: "Legal", signable: false, fields: ["effective_date", "policy_version", "company_name", "contact_email", "dpo_email"] },
  { id: "gdpr-compliance", code: "04.08", title: "GDPR Compliance", formats: "HTML / PDF", purpose: "GDPR compliance declaration.", category: "Compliance", signable: true, fields: ["effective_date", "policy_version", "company_name", "contact_email", "dpo_email", "processor_name"] },
  { id: "service-agreement", code: "04.09", title: "Service Agreement", formats: "HTML / DOCX / PDF / E-SIGN", purpose: "Client contract for solutions.", category: "Contract", signable: true, fields: ["client_company", "client_address", "agreement_no", "effective_date", "end_date", "scope", "fee", "payment_terms", "signer_name", "counterparty_name"] },
  { id: "employment-contract", code: "04.10", title: "Employment Contract", formats: "HTML / DOCX / PDF / E-SIGN", purpose: "Employment agreement.", category: "HR", signable: true, fields: ["employee_name", "employee_address", "role_title", "start_date", "salary", "work_location", "signer_name", "counterparty_name"] },
  { id: "nda-agreement", code: "04.11", title: "NDA Agreement", formats: "HTML / DOCX / PDF / E-SIGN", purpose: "Mutual/non-mutual confidentiality.", category: "Legal", signable: true, fields: ["counterparty_name", "counterparty_address", "effective_date", "confidentiality_term", "purpose", "signer_name"] },
  { id: "freelancer-agreement", code: "04.12", title: "Freelancer Agreement", formats: "HTML / DOCX / PDF / E-SIGN", purpose: "Independent contractor agreement.", category: "Contract", signable: true, fields: ["freelancer_name", "freelancer_address", "project_name", "effective_date", "deliverables", "fee", "payment_terms", "signer_name"] }
];

export const getDefaults = (brand: BrandProfile) => {
  return {
    company_name: brand.company_name,
    company_address: brand.company_address,
    company_email: brand.company_email,
    contact_email: brand.company_email,
    dpo_email: `privacy@${(brand.company_website || '').replace(/https?:\/\/(www\.)?/, '')}`,
    company_website: brand.company_website,
    sender_name: brand.founder_name,
    sender_title: "Founder / CEO",
    signer_name: brand.founder_name,
    signer_title: "Founder / CEO",
    signer_email: brand.company_email,
    recipient_name: "Recipient Name",
    recipient_company: "Client Company Name",
    recipient_address: "Client Street 1\\n1000 Brussels\\nBelgium",
    client_company: "Client Company Name",
    client_vat: "BE0123.456.789",
    client_address: "Client Street 1\\n1000 Brussels\\nBelgium",
    invoice_no: `INV-${new Date().getFullYear()}-001`,
    quote_no: `QUO-${new Date().getFullYear()}-001`,
    agreement_no: `AGR-${new Date().getFullYear()}-001`,
    issue_date: new Date().toISOString().slice(0, 10),
    due_date: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    valid_until: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    effective_date: new Date().toISOString().slice(0, 10),
    end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 10),
    signed_date: new Date().toISOString().slice(0, 10),
    start_date: new Date().toISOString().slice(0, 10),
    subject: `${brand.company_name} Services`,
    body: `Thank you for your interest in ${brand.company_name}. This document is prepared as an official branded communication template. Replace this body with your final message before sending.`,
    scope: "Consulting, engineering, design, and continuous support.",
    item_1: "Consulting package",
    qty_1: "1",
    rate_1: "1200",
    payment_terms: "Due within 14 days",
    policy_version: "1.0",
    governing_law: "Local law",
    processor_name: brand.company_legal_name,
    fee: "1200",
    employee_name: "Employee Name",
    employee_address: "Employee Street 1\\n1000 Brussels\\nBelgium",
    role_title: "Senior Specialist",
    salary: "To be agreed",
    work_location: "Hybrid",
    counterparty_name: "Counterparty Name",
    counterparty_address: "Counterparty Street 1\\n1000 Brussels\\nBelgium",
    confidentiality_term: "3 years",
    purpose: `Evaluation and collaboration regarding ${brand.company_name} services.`,
    freelancer_name: "Freelancer Name",
    freelancer_address: "Freelancer Street 1\\n1000 Brussels\\nBelgium",
    project_name: "General Project",
    deliverables: "Implementation support, testing, documentation, and handover."
  };
};

const escapeHTML = (str: string) => String(str ?? "").replace(/[&<>"']/g, (m) => (({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' } as any)[m]));
const nl2br = (str: string) => escapeHTML(str).replace(/\\n/g, "<br>");
const formatMoney = (value: any) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value || 0));

export function buildDocumentHTML(doc: any, d: any, brand: BrandProfile) {
  const qty = Number(d.qty_1 || 0);
  const rate = Number(d.rate_1 || d.fee || 0);
  const subtotal = qty * rate;
  const vat = subtotal * 0.20;
  const total = subtotal + vat;

  const documentCSS = `
    :root { --primary:${brand.primary_color}; --charcoal:${brand.secondary_color}; --muted:#666; }
    * { box-sizing:border-box; }
    body { margin:0; background:#e9e9e9; color:#151515; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; }
    .page { width: 794px; min-height: 1123px; margin: 0 auto; background:#fff; padding: 52px 58px; box-shadow: 0 20px 80px rgba(0,0,0,.18); position:relative; }
    .top-line { position:absolute; left:0; right:0; top:0; height:8px; background:var(--primary); }
    header { display:flex; justify-content:space-between; gap:26px; align-items:flex-start; border-bottom:2px solid var(--primary); padding-bottom:18px; margin-bottom:30px; }
    .brand { display:flex; gap:12px; align-items:center; }
    .logo-container { width:42px; height:42px; display:flex; align-items:center; justify-content:center; }
    .logo-container svg { width:100%; height:100%; color: var(--primary); }
    .brand strong { display:block; color:var(--primary); letter-spacing:1px; font-size:17px; text-transform:uppercase; }
    .brand span { display:block; color:#777; letter-spacing:1.7px; font-size:9px; font-weight:700; text-transform:uppercase; }
    .company { font-size:10.5px; line-height:1.55; color:#333; text-align:right; }
    h1 { color:#151515; font-size:28px; letter-spacing:-.5px; margin:0 0 8px; text-transform:uppercase; }
    h2 { color:var(--primary); font-size:15px; text-transform:uppercase; letter-spacing:.7px; margin:28px 0 10px; }
    h3 { font-size:13px; margin:18px 0 8px; color:#111; }
    p, li { font-size:12px; line-height:1.75; color:#333; }
    .meta-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:18px 0 24px; }
    .meta-box { background:#f7f7f7; border-left:4px solid var(--primary); padding:12px; font-size:11.5px; line-height:1.65; color:#333; }
    .meta-box strong { color:#111; }
    .doc-no { display:inline-block; background:var(--charcoal); color:#fff; padding:6px 9px; border-radius:4px; font-size:10px; font-weight:700; letter-spacing:.4px; }
    table { width:100%; border-collapse:collapse; margin:16px 0; font-size:11.5px; }
    th { background:var(--primary); color:#111; text-align:left; padding:9px; font-size:10px; text-transform:uppercase; letter-spacing:.4px; }
    td { border-bottom:1px solid #e7e7e7; padding:9px; vertical-align:top; color:#333; }
    .total td { font-weight:800; color:#111; }
    .notice { background:#f9f9f9; border:1px solid #ddd; padding:12px; border-radius:8px; margin:16px 0; }
    .signature-grid { display:grid; grid-template-columns:1fr 1fr; gap:34px; margin-top:46px; }
    .sig { border-top:1px solid #111; padding-top:8px; font-size:11px; color:#333; min-height:74px; }
    .signature-pad { border:1px dashed #ccc; height:80px; border-radius:8px; margin-top:10px; display:grid; place-items:center; color:#999; font-size:11px; }
    footer { position:absolute; left:58px; right:58px; bottom:34px; border-top:1px solid #ddd; padding-top:10px; display:flex; justify-content:space-between; font-size:9px; color:#777; }
    .watermark { position:absolute; right:50px; bottom:92px; opacity:.03; width:220px; height:220px; display:flex; align-items:center; justify-content:center; }
    .watermark svg { width:100%; height:100%; color: var(--primary); }
    @media print { body { background:#fff; } .page { box-shadow:none; margin:0; width:auto; min-height:auto; } }
  `;

  const headerHTML = `
    <div class="top-line"></div>
    <header>
      <div class="brand">
        <div class="logo-container">${brand.logo_svg}</div>
        <div><strong>${escapeHTML(brand.company_name)}</strong><span>${escapeHTML(brand.company_legal_name)}</span></div>
      </div>
      <div class="company">${nl2br(d.company_address)}<br>${escapeHTML(d.company_email)}<br>${escapeHTML(d.company_website)}</div>
    </header>
  `;

  const signBlock = (counterpartyLabel = "Client / Counterparty") => `
    <section>
      <h2>Electronic Signature</h2>
      <p>By signing below, the signer confirms authority to sign and agrees that this document may be executed electronically.</p>
      <div class="signature-grid">
        <div class="sig">For ${escapeHTML(brand.company_legal_name)}<br><strong>${escapeHTML(d.signer_name)}</strong><br>${escapeHTML(d.signer_title)}<div class="signature-pad">Signature</div>Date: ${escapeHTML(d.signed_date)}</div>
        <div class="sig">For ${escapeHTML(counterpartyLabel)}<br><strong>${escapeHTML(d.counterparty_name || d.approver_name || "")}</strong><br>Authorized Signatory<div class="signature-pad">Signature</div>Date: __________________</div>
      </div>
    </section>`;

  let content = "";
  switch(doc.id) {
    case "letterhead":
      content = `
        <span class="doc-no">Official Letterhead</span>
        <div style="height:34px"></div>
        <p>${escapeHTML(d.issue_date)}</p>
        <div class="meta-grid">
          <div class="meta-box"><strong>To</strong><br>${escapeHTML(d.recipient_name)}<br>${escapeHTML(d.recipient_company)}<br>${nl2br(d.recipient_address)}</div>
          <div class="meta-box"><strong>Subject</strong><br>${escapeHTML(d.subject)}</div>
        </div>
        <h1>${escapeHTML(d.subject)}</h1>
        <p>${nl2br(d.body)}</p>
        <p>Sincerely,</p>
        <p><strong>${escapeHTML(d.sender_name)}</strong><br>${escapeHTML(d.sender_title)}<br>${escapeHTML(brand.company_legal_name)}</p>
      `;
      break;

    case "invoice":
      content = `
        <h1>Invoice</h1>
        <p><span class="doc-no">${escapeHTML(d.invoice_no)}</span></p>
        <div class="meta-grid">
          <div class="meta-box"><strong>Bill To</strong><br>${escapeHTML(d.client_company)}<br>VAT: ${escapeHTML(d.client_vat)}<br>${nl2br(d.client_address)}</div>
          <div class="meta-box"><strong>Issue Date</strong>: ${escapeHTML(d.issue_date)}<br><strong>Due Date</strong>: ${escapeHTML(d.due_date)}<br><strong>Payment Terms</strong>: ${escapeHTML(d.payment_terms)}</div>
        </div>
        <table>
          <thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead>
          <tbody>
            <tr><td>${escapeHTML(d.item_1)}</td><td>${escapeHTML(d.qty_1)}</td><td>${formatMoney(rate)}</td><td>${formatMoney(subtotal)}</td></tr>
            <tr><td colspan="3">VAT 20%</td><td>${formatMoney(vat)}</td></tr>
            <tr class="total"><td colspan="3">Amount Due</td><td>${formatMoney(total)}</td></tr>
          </tbody>
        </table>
        <div class="notice"><p><strong>Payment Method:</strong> Bank transfer. Please include invoice number ${escapeHTML(d.invoice_no)} as payment reference.</p></div>
      `;
      break;

    case "quotation":
      content = `
        <h1>Quotation</h1>
        <p><span class="doc-no">${escapeHTML(d.quote_no)}</span></p>
        <div class="meta-grid">
          <div class="meta-box"><strong>Prepared For</strong><br>${escapeHTML(d.client_company)}<br>${nl2br(d.client_address)}</div>
          <div class="meta-box"><strong>Issue Date</strong>: ${escapeHTML(d.issue_date)}<br><strong>Valid Until</strong>: ${escapeHTML(d.valid_until)}<br><strong>Prepared By</strong>: ${escapeHTML(brand.company_name)}</div>
        </div>
        <h2>Scope</h2>
        <p>${nl2br(d.scope)}</p>
        <table>
          <thead><tr><th>Service</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead>
          <tbody>
            <tr><td>${escapeHTML(d.item_1)}</td><td>${escapeHTML(d.qty_1)}</td><td>${formatMoney(rate)}</td><td>${formatMoney(subtotal)}</td></tr>
            <tr><td colspan="3">VAT 20%</td><td>${formatMoney(vat)}</td></tr>
            <tr class="total"><td colspan="3">Quoted Total</td><td>${formatMoney(total)}</td></tr>
          </tbody>
        </table>
        <div class="notice"><p>Approval of this quotation authorizes ${escapeHTML(brand.company_legal_name)} to prepare the corresponding agreement or invoice.</p></div>
        ${signBlock(d.client_company)}
      `;
      break;

    case "business-letter":
      content = `
        <h1>Business Letter</h1>
        <p>${escapeHTML(d.issue_date)}</p>
        <div class="meta-box"><strong>Recipient</strong><br>${escapeHTML(d.recipient_name)}<br>${escapeHTML(d.recipient_company)}<br>${nl2br(d.recipient_address)}</div>
        <h2>${escapeHTML(d.subject)}</h2>
        <p>Dear ${escapeHTML(d.recipient_name)},</p>
        <p>${nl2br(d.body)}</p>
        <p>Kind regards,</p>
        <p><strong>${escapeHTML(d.sender_name)}</strong><br>${escapeHTML(d.sender_title)}<br>${escapeHTML(brand.company_legal_name)}</p>
        ${signBlock(d.recipient_company)}
      `;
      break;

    case "service-policy":
        content = `
          <h1>Service Policy</h1>
          <p><span class="doc-no">Version ${escapeHTML(d.policy_version)} · Effective ${escapeHTML(d.effective_date)}</span></p>
          <h2>1. Purpose</h2><p>This Service Policy explains how ${escapeHTML(brand.company_name)} delivers services and support.</p>
          <h2>2. Service Scope</h2><p>Services may include discovery, workflow analysis, design, implementation, testing, documentation, training, and support.</p>
          <h2>3. Client Responsibilities</h2><p>Clients must provide timely access to required systems, accurate information, responsible decision makers, and feedback needed for delivery.</p>
          <h2>4. Delivery Standards</h2><p>${escapeHTML(brand.company_name)} aims to deliver professional, secure, and measurable solutions.</p>
          <h2>5. Support</h2><p>Support requests can be submitted to ${escapeHTML(d.contact_email)}.</p>
        `;
        break;
      
    case "terms-conditions":
        content = `
          <h1>Terms & Conditions</h1>
          <p><span class="doc-no">Version ${escapeHTML(d.policy_version)} · Effective ${escapeHTML(d.effective_date)}</span></p>
          <h2>1. Applicability</h2><p>These terms apply to proposals, services, and commercial engagements with ${escapeHTML(brand.company_legal_name)}.</p>
          <h2>2. Intellectual Property</h2><p>Pre-existing tools, frameworks, templates, methods, and know-how remain the property of their original owner.</p>
          <h2>3. Governing Law</h2><p>These terms are governed by ${escapeHTML(d.governing_law)}.</p>
          ${signBlock("Client")}
        `;
        break;
      
    // Default fallback
    default:
        content = `<h1>${escapeHTML(doc.title)}</h1><p>Document template under construction.</p>`;
        break;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHTML(doc.title)} | ${escapeHTML(brand.company_name)}</title>
<style>${documentCSS}</style>
</head>
<body>
  <main class="page">
    ${headerHTML}
    ${content}
    <div class="watermark">${brand.logo_svg}</div>
    <footer><span>${escapeHTML(brand.company_legal_name)}</span><span>${escapeHTML(doc.title)} · Generated HTML Template</span></footer>
  </main>
</body>
</html>`;
}
