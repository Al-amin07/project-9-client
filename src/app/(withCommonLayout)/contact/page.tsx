import AppPromoSection from "@/components/contact/appPromoSection";
import ContactBanner from "@/components/contact/contactBanner";
import ContactInfo from "@/components/contact/contactInfo";
import ContactSection from "@/components/contact/contactSection";
import React from "react";

export default function ContactPage() {
  return (
    <div>
      <ContactBanner></ContactBanner>

      <div className="my-12 container mx-auto space-y-10">
        <ContactInfo></ContactInfo>
        <ContactSection></ContactSection>
      </div>
      <div className="">

        <AppPromoSection></AppPromoSection>
      </div>
    </div>
  );
}
