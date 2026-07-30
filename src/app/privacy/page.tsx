import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | ExoFlex",
  description:
    "How ExoFlex collects, uses, protects and discloses personal information, including patient health information processed through our rehabilitation devices.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="Last updated: July 30, 2026"
      altHref="/confidentialite"
      altLabel="Version française"
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          ExoFlex Inc. (&quot;ExoFlex&quot;, &quot;we&quot;, &quot;us&quot;) is a
          company established in Quebec, Canada. We design and manufacture
          connected rehabilitation devices for people with reduced mobility, used
          at home and in clinical settings, together with the software that
          supports therapeutic follow-up.
        </p>
        <p>
          <strong>Person responsible for the protection of personal
          information:</strong> Olivier Jackson —{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
          . This role is required under Quebec&apos;s Act respecting the
          protection of personal information in the private sector (as amended by
          Law 25).
        </p>
        <p>
          Registered address: 1672 rue de l&apos;Islet, Québec, Canada G2K 2G6
        </p>
      </section>

      <section>
        <h2>2. Scope of this policy</h2>
        <p>
          This policy applies to personal information we collect through our
          devices, our software applications, and this website. It does not apply
          to the independent privacy practices of the clinics, hospitals or other
          healthcare providers that use our products; those organizations handle
          their patients&apos; information under their own policies and
          obligations.
        </p>
      </section>

      <section>
        <h2>3. Information we collect</h2>
        <p>
          <strong>Clinician and facility account information.</strong> Name,
          professional email address, role, the name of the clinic or institution,
          authentication credentials, and activity logs associated with the
          account.
        </p>
        <p>
          <strong>Patient identification information.</strong> Name, age or date
          of birth, and the patient or file identifier assigned by the treating
          organization. This information is entered by the clinician or, for home
          use, by the patient or their caregiver.
        </p>
        <p>
          <strong>Rehabilitation session data.</strong> Joint angles, applied
          force, range of motion, number and duration of repetitions, session
          timestamps, and progression across sessions. When associated with an
          identified person, this constitutes health information and is treated as
          sensitive personal information.
        </p>
        <p>
          <strong>Technical information.</strong> Device serial number, firmware
          and software versions, error and diagnostic logs, and connection
          metadata needed to operate and support the device.
        </p>
        <p>
          <strong>Website information.</strong> This website does not use
          analytics tools, advertising trackers or non-essential cookies. If you
          submit the contact form, the first name, last name, email address and
          message you provide are transmitted to HubSpot, our customer
          relationship management provider, so that we can respond to you.
        </p>
        <p>
          We do not knowingly collect information beyond what is described above.
          We do not collect payment card information through our devices or
          software.
        </p>
      </section>

      <section>
        <h2>4. Why we use this information</h2>
        <ul>
          <li>
            To deliver the core function of the device: guiding, recording and
            reporting rehabilitation sessions.
          </li>
          <li>
            To make session history and progression available to the treating
            clinician for therapeutic follow-up.
          </li>
          <li>
            To provide technical support, diagnose malfunctions, and issue
            software and firmware updates.
          </li>
          <li>
            To meet our obligations as a medical device manufacturer, including
            safety monitoring and incident reporting where applicable.
          </li>
          <li>
            To improve device safety and performance, using aggregated or
            de-identified data wherever it is sufficient for the purpose.
          </li>
        </ul>
        <p>
          We do not use patient health information for advertising, and we do not
          sell personal information.
        </p>
      </section>

      <section>
        <h2>5. Our role when we handle health information</h2>
        <p>
          When a clinic, hospital or other healthcare provider in the United
          States uses our products, that organization is generally the covered
          entity under the Health Insurance Portability and Accountability Act
          (HIPAA), and ExoFlex acts on its behalf as a business associate. In that
          capacity:
        </p>
        <ul>
          <li>
            We handle protected health information only as needed to provide the
            product and support services, or as required by law.
          </li>
          <li>
            We enter into a business associate agreement with the organization
            before processing protected health information on its behalf.
          </li>
          <li>
            We do not use protected health information for our own independent
            purposes.
          </li>
        </ul>
        <p>
          Healthcare organizations may request a business associate agreement by
          writing to{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
          .
        </p>
      </section>

      <section>
        <h2>6. Consent</h2>
        <p>
          Where a clinician enters patient information into our system, that
          clinician is responsible for having obtained the patient&apos;s informed
          consent, or another lawful basis, before doing so. For home use, we ask
          the patient or their caregiver to consent at the time the account is
          created. Consent may be withdrawn at any time; withdrawal may prevent
          the device from performing therapeutic follow-up.
        </p>
      </section>

      <section>
        <h2>7. Disclosure to third parties</h2>
        <p>
          We disclose personal information only in the following circumstances:
        </p>
        <ul>
          <li>
            <strong>HubSpot.</strong> Contact form submissions are processed by
            HubSpot, Inc., which provides our customer relationship management
            service.
          </li>
          <li>
            <strong>Hosting and infrastructure providers.</strong> Where a hosted
            service is used, providers act on our instructions and are bound by
            confidentiality and security obligations. ExoFlex has not yet
            finalized its hosting arrangement for commercial deployment. This
            policy will be updated to name the provider and the countries of
            storage before the device is distributed commercially.
          </li>
          <li>
            <strong>The treating organization.</strong> Session data is made
            available to the clinic or clinician responsible for the patient.
          </li>
          <li>
            <strong>Legal requirements.</strong> Where disclosure is required by
            law, regulation, subpoena or a valid order of a competent authority.
          </li>
          <li>
            <strong>Corporate transactions.</strong> In connection with a merger,
            acquisition or sale of assets, subject to equivalent protection of the
            information.
          </li>
        </ul>
        <p>
          We do not sell or share personal information for cross-context
          behavioural advertising, as those terms are used under California law.
        </p>
      </section>

      <section>
        <h2>8. Storage location and cross-border transfers</h2>
        <p>
          Contact form submissions are processed by HubSpot, Inc. on
          infrastructure located in the United States.
        </p>
        <p>
          The hosting arrangement for session data and patient information has not
          yet been finalized. Before any such information is transferred outside
          Quebec, we will conduct a privacy impact assessment as required by Law 25
          and update this policy to identify the provider and the countries
          concerned.
        </p>
      </section>

      <section>
        <h2>9. Retention</h2>
        <p>
          We keep personal information only as long as necessary for the purposes
          described in this policy, and for the periods required by applicable
          medical records and medical device regulations. Retention periods for
          session data and patient identification information are established by
          agreement with the treating organization, which controls the clinical
          record. Account information is kept for the duration of the account and
          deleted on request. Contact form submissions are kept as long as needed
          to respond and follow up, and are deleted on request. When information is
          no longer required, we destroy it or anonymize it.
        </p>
      </section>

      <section>
        <h2>10. Security</h2>
        <p>
          We apply technical and organizational safeguards proportionate to the
          sensitivity of the information, including encryption of data in transit,
          the encryption at rest provided by default by our infrastructure
          providers, access controls limiting access to authorized personnel on a
          need-to-know basis, and logging of access to health information.
        </p>
        <p>
          No system is perfectly secure. If a confidentiality incident presents a
          risk of serious injury, we will notify the persons concerned and the
          Commission d&apos;accès à l&apos;information du Québec, and any other
          authority required by applicable law.
        </p>
      </section>

      <section>
        <h2>11. Your rights</h2>
        <p>
          <strong>Quebec and Canada.</strong> You may request access to the
          personal information we hold about you, ask that it be corrected, ask
          that it be communicated to you in a structured, commonly used technical
          format, and withdraw your consent. You may also file a complaint with
          the Commission d&apos;accès à l&apos;information du Québec or the Office
          of the Privacy Commissioner of Canada.
        </p>
        <p>
          <strong>California.</strong> Residents of California may request to know
          what personal information we have collected, request its deletion or
          correction, and are entitled not to be discriminated against for
          exercising those rights. We do not sell personal information and do not
          share it for cross-context behavioural advertising, so no opt-out of
          sale or sharing is required. Requests may be submitted by an authorized
          agent.
        </p>
        <p>
          <strong>How to exercise your rights.</strong> Write to{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
          . We respond within 30 days. We may need to verify your identity before
          acting on a request. If your information was entered by a clinic, we may
          direct your request to that organization, which controls the clinical
          record.
        </p>
      </section>

      <section>
        <h2>12. Children</h2>
        <p>
          Our devices may be prescribed to minors. When that is the case, the
          information is provided and managed by a parent, guardian or treating
          clinician. We do not knowingly collect information directly from a child
          without that involvement.
        </p>
      </section>

      <section>
        <h2>13. Automated decisions</h2>
        <p>
          We do not use personal information to render decisions based exclusively
          on automated processing. Session data informs the clinician&apos;s
          judgment; it does not replace it.
        </p>
      </section>

      <section>
        <h2>14. Changes to this policy</h2>
        <p>
          We may update this policy. The date at the top of this page indicates the
          most recent revision. Where a change materially affects how we handle
          personal information, we will provide notice through the product or by
          email.
        </p>
      </section>

      <section>
        <h2>15. Contact</h2>
        <p>
          Questions, access requests and complaints:{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
