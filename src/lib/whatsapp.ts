/**
 * Centralized WhatsApp Integration Helper for SARVA NATURAL
 * Configured Business Number: 9310887011 (India country code: 91 -> 919310887011)
 * Official Click-to-chat URL: https://wa.me/919310887011
 */

export const WHATSAPP_CONFIG = {
  phoneNumber: "9310887011",
  countryCode: "91",
  fullNumber: "919310887011",
  displayNumber: "+91 93108 87011",
  businessName: "SARVA NATURAL Ayurvedic Care",
};

/**
 * Builds the official WhatsApp click-to-chat URL with safely encoded message text.
 */
export function buildWhatsAppUrl(message: string): string {
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_CONFIG.fullNumber}?text=${encodedText}`;
}

/**
 * Generates prefilled WhatsApp message for product inquiries.
 */
export function buildProductInquiryWhatsAppUrl({
  productName,
  variantTitle,
  price,
  userQuestion,
  pageUrl,
}: {
  productName: string;
  variantTitle?: string;
  price?: number;
  userQuestion?: string;
  pageUrl?: string;
}): string {
  const lines = [
    "🌿 *SARVA NATURAL — Product Inquiry*",
    "",
    "Namaste SARVA NATURAL Team,",
    "",
    `I am inquiring about *${productName}*${variantTitle ? ` (${variantTitle})` : ""}${price ? ` — ₹${price}` : ""}.`,
    "",
    userQuestion
      ? `• My Question: ${userQuestion}`
      : "• My Question: I would like guidance on the dosage timing, benefits, and suitability for my wellness goals.",
    "",
    pageUrl ? `• Viewed on: ${pageUrl}` : "• Viewed on: sarvanatural.com",
    "",
    "Could an Ayurvedic advisor please assist me?",
  ];

  return buildWhatsAppUrl(lines.join("\n"));
}

/**
 * Generates prefilled WhatsApp message for doctor / Vaidya consultation inquiries.
 */
export function buildConsultationInquiryWhatsAppUrl({
  patientName,
  patientPhone,
  concern,
  preferredDate,
  preferredSlot,
  preferredLanguage,
  notes,
}: {
  patientName?: string;
  patientPhone?: string;
  concern?: string;
  preferredDate?: string;
  preferredSlot?: string;
  preferredLanguage?: string;
  notes?: string;
}): string {
  const lines = [
    "🩺 *SARVA NATURAL — Free Vaidya Consultation Inquiry*",
    "",
    "Namaste Doctor,",
    "",
    "I would like to schedule / inquire about a 15-Minute Free Ayurvedic Guidance Session.",
    "",
    patientName ? `• Patient Name: ${patientName}` : "• Patient: Inquiry via Storefront",
    patientPhone ? `• Contact Number: ${patientPhone}` : "",
    concern ? `• Primary Health Concern: ${concern}` : "• Primary Concern: Ayurvedic Lifestyle & Dosha Balance",
    preferredDate ? `• Preferred Date: ${preferredDate}` : "",
    preferredSlot ? `• Preferred Time Slot: ${preferredSlot}` : "",
    preferredLanguage ? `• Preferred Language: ${preferredLanguage}` : "• Preferred Language: Hindi / English",
    notes ? `• Brief Notes / Symptoms: ${notes}` : "",
    "",
    "Kindly let me know the next available slot for consultation. Thank you!",
  ].filter(Boolean);

  return buildWhatsAppUrl(lines.join("\n"));
}

/**
 * Generates prefilled WhatsApp message for Contact Us inquiries.
 */
export function buildContactUsWhatsAppUrl({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
}): string {
  const lines = [
    "💬 *SARVA NATURAL — Customer Inquiry*",
    "",
    "Namaste SARVA NATURAL Care Team,",
    "",
    `• Subject: *${subject || "General Inquiry"}*`,
    `• From: ${name || "Valued Patron"}`,
    phone ? `• Phone: ${phone}` : "",
    email ? `• Email: ${email}` : "",
    "",
    `• Inquiry Details:`,
    message || "I would like to speak to someone regarding your Ayurvedic formulations.",
    "",
    "Thank you for your guidance!",
  ].filter(Boolean);

  return buildWhatsAppUrl(lines.join("\n"));
}

export interface OrderWhatsAppItem {
  name: string;
  variant: string;
  quantity: number;
  price: number;
}

/**
 * Generates prefilled WhatsApp order summary for direct post-checkout redirect.
 * Formats every line item with quantity, unit price, and line total.
 * Dynamically reflects payment method and actual payment status.
 * Never contains payment credentials, card numbers, CVVs, or sensitive data.
 */
export function buildOrderSummaryWhatsAppUrl({
  orderId,
  orderDate,
  items,
  subtotal,
  discount = 0,
  couponCode,
  shipping = 0,
  total,
  customerName,
  phone,
  address,
  city,
  state,
  pincode,
  paymentMethod = "upi",
  isDemo = true,
}: {
  orderId: string;
  orderDate?: string;
  items: OrderWhatsAppItem[];
  subtotal: number;
  discount?: number;
  couponCode?: string;
  shipping?: number;
  total: number;
  customerName: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  paymentMethod?: "upi" | "cod" | "card" | string;
  isDemo?: boolean;
}): string {
  const dateStr =
    orderDate ||
    new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }) + " IST";

  // Itemized breakdown with unit price and line total
  const itemsText = items
    .map((item, idx) => {
      const lineTotal = item.quantity * item.price;
      return `${idx + 1}. *${item.name}*\n   • Variant: ${item.variant}\n   • Qty: ${item.quantity} × ₹${item.price} = *₹${lineTotal}*`;
    })
    .join("\n\n");

  const addressLine = [address, city, state, pincode].filter(Boolean).join(", ");

  // Dynamic payment method and verified payment status handling
  let paymentMethodLabel = "UPI / Instant QR Code";
  let paymentStatusText = isDemo
    ? "Simulated Demo Paid — Verified Demo Authorization"
    : "Paid (Online)";

  if (paymentMethod === "cod") {
    paymentMethodLabel = "Cash on Delivery (COD)";
    paymentStatusText = `Payment: Cash on Delivery — Payable on delivery (₹${total})`;
  } else if (paymentMethod === "card") {
    paymentMethodLabel = "Debit/Credit Card & Net Banking";
    paymentStatusText = isDemo
      ? "Simulated Demo Paid — Verified Demo Authorization"
      : "Paid (Online)";
  } else if (paymentMethod === "upi") {
    paymentMethodLabel = "UPI / Instant QR Code";
    paymentStatusText = isDemo
      ? "Simulated Demo Paid — Verified Demo Authorization"
      : "Paid (Online)";
  }

  const lines = [
    "🌿 *SARVA NATURAL — Order Details Summary*",
    isDemo ? "_(Demonstration Storefront Order)_" : "",
    "",
    "Namaste SARVA NATURAL Care Team,",
    "",
    "Here are the details for my order:",
    `• *Order Reference:* #${orderId}`,
    `• *Date & Time:* ${dateStr}`,
    "",
    "—————— *Customer Details* ——————",
    `• Name: ${customerName}`,
    phone ? `• Contact: ${phone}` : "",
    addressLine ? `• Delivery Address: ${addressLine}` : "",
    "",
    "—————— *Ordered Formulations* ——————",
    itemsText,
    "",
    "—————— *Billing Summary* ——————",
    `• Bag Subtotal: ₹${subtotal}`,
    discount > 0
      ? `• Discount Applied${couponCode ? ` (${couponCode})` : ""}: -₹${discount}`
      : "",
    `• Express Delivery: ${shipping === 0 ? "FREE" : `₹${shipping}`}`,
    `• *Final Payable Amount:* *₹${total}*`,
    "",
    "—————— *Payment Information* ——————",
    `• Payment Method: ${paymentMethodLabel}`,
    `• Payment Status: ${paymentStatusText}`,
    "",
    isDemo
      ? "_(Notice: This order summary was prepared by SARVA NATURAL demo checkout. No actual monetary transaction was processed. Please tap Send to transmit these order details to our WhatsApp desk.)_"
      : "_(Please tap Send to transmit your verified order details to our WhatsApp fulfillment desk.)_",
  ].filter((line) => line !== "");

  return buildWhatsAppUrl(lines.join("\n"));
}

/**
 * Generates prefilled WhatsApp escalation message from the Female Vaidya Chatbot.
 */
export function buildBotEscalationWhatsAppUrl({
  userQuestion,
  productContext,
}: {
  userQuestion: string;
  productContext?: string;
}): string {
  const lines = [
    "🌿 *SARVA NATURAL — Vaidya Escalation Inquiry*",
    "",
    "Namaste Doctor / SARVA NATURAL Team,",
    "",
    "I was interacting with your digital Vaidya assistant and would like personalized Ayurvedic consultation.",
    "",
    `• *My Question:* "${userQuestion}"`,
    productContext ? `• *Related Formulation / Topic:* ${productContext}` : "",
    "",
    "Could an Ayurvedic doctor please assist me with personalized guidance?",
  ].filter(Boolean);

  return buildWhatsAppUrl(lines.join("\n"));
}
