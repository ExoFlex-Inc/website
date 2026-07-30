import { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use and End-User License Agreement | ExoFlex",
  description:
    "The terms governing use of ExoFlex rehabilitation devices, software and website, including the end-user software licence.",
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Use and End-User License Agreement"
      updated="Last updated: July 30, 2026"
      altHref="/conditions"
      altLabel="Version française"
    >
      <section>
        <h2>1. Acceptance</h2>
        <p>
          These terms form an agreement between you and ExoFlex Inc.
          (&quot;ExoFlex&quot;, &quot;we&quot;, &quot;us&quot;), a company
          established in Quebec, Canada. By installing, activating or using an
          ExoFlex device, its embedded software, our applications or this website,
          you accept these terms. If you are accepting on behalf of a clinic,
          hospital or other organization, you represent that you have the authority
          to bind that organization.
        </p>
        <p>If you do not accept these terms, do not use the software.</p>
      </section>

      <section>
        <h2>2. Licence grant</h2>
        <p>
          ExoFlex grants you a limited, non-exclusive, non-transferable,
          non-sublicensable and revocable licence to use the software and firmware
          supplied with an ExoFlex device, solely:
        </p>
        <ul>
          <li>on the device with which it was supplied;</li>
          <li>
            for the rehabilitation purposes for which the device is intended; and
          </li>
          <li>in accordance with the accompanying documentation.</li>
        </ul>
        <p>
          The software is licensed, not sold. All rights not expressly granted are
          reserved.
        </p>
      </section>

      <section>
        <h2>3. Restrictions</h2>
        <p>You may not:</p>
        <ul>
          <li>
            copy, modify, translate or create derivative works of the software,
            except as permitted by applicable law;
          </li>
          <li>
            reverse engineer, decompile or disassemble the software, except to the
            extent that such a restriction is prohibited by applicable law;
          </li>
          <li>
            rent, lease, lend, sell, sublicense or otherwise transfer the software
            or the licence;
          </li>
          <li>
            remove or alter any proprietary notice, serial number or safety label;
          </li>
          <li>
            use the software with hardware other than the ExoFlex device for which
            it was supplied, or with unauthorized replacement parts;
          </li>
          <li>
            bypass, disable or interfere with safety features, usage limits or
            access controls;
          </li>
          <li>
            use the device or software in a manner inconsistent with its intended
            use or with the instructions for use.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Ownership</h2>
        <p>
          ExoFlex and its licensors retain all intellectual property rights in the
          devices, software, firmware, documentation, trademarks and website
          content. Data generated about a patient during rehabilitation sessions
          belongs to the patient and, as applicable, forms part of the clinical
          record held by the treating organization; our handling of that data is
          described in our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section>
        <h2>5. Intended use and clinical responsibility</h2>
        <p>
          ExoFlex devices are intended to support rehabilitation for people with
          reduced mobility, under the supervision or direction of a qualified
          healthcare professional, in accordance with the instructions for use.
        </p>
        <p>
          <strong>
            The software does not provide medical advice, diagnosis or treatment
            decisions, and it does not replace the judgment of a healthcare
            professional.
          </strong>{" "}
          Session measurements and progression reports are informational inputs to
          clinical judgment. You are responsible for determining whether use of the
          device is appropriate for a given patient, for supervising its use as
          required, and for responding to any adverse reaction.
        </p>
        <p>
          Stop use and consult a healthcare professional if the device causes pain,
          unusual discomfort or any unexpected reaction.
        </p>
        <p>
          <strong>Regulatory status.</strong> ExoFlex devices are at the prototype
          stage. They are not licensed as medical devices by Health Canada, and
          they are not cleared or approved by the United States Food and Drug
          Administration. They are made available only for evaluation,
          demonstration and research purposes, under the supervision of qualified
          personnel. This section will be updated when that status changes.
        </p>
      </section>

      <section>
        <h2>6. Your responsibilities</h2>
        <ul>
          <li>
            Provide accurate information, and keep account credentials
            confidential.
          </li>
          <li>
            Where you enter information about a patient, ensure you have obtained
            the consent or other lawful basis required in your jurisdiction.
          </li>
          <li>
            Use the device and software in compliance with applicable laws,
            professional obligations and institutional policies.
          </li>
          <li>
            Keep the software updated, since updates may include safety
            corrections.
          </li>
          <li>
            Notify us promptly of any suspected security incident, malfunction or
            adverse event.
          </li>
        </ul>
      </section>

      <section>
        <h2>7. Updates</h2>
        <p>
          We may provide software or firmware updates, including automatically.
          Updates are governed by these terms unless accompanied by separate terms.
          We may cease supporting older versions.
        </p>
      </section>

      <section>
        <h2>8. Third-party components</h2>
        <p>
          The software may include third-party or open-source components licensed
          under their own terms, which prevail over these terms in respect of those
          components. The applicable third-party and open-source licence notices are
          available on request from{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
          .
        </p>
      </section>

      <section>
        <h2>9. Warranty</h2>
        <p>
          Any limited hardware warranty applicable to your device is set out in the
          documentation or purchase agreement accompanying it. Apart from that
          warranty and from any warranty that cannot be excluded under applicable
          law — including the warranties provided by the Consumer Protection Act in
          Quebec — the software is provided &quot;as is&quot;, without warranty of
          any kind, including as to merchantability, fitness for a particular
          purpose, or uninterrupted or error-free operation.
        </p>
      </section>

      <section>
        <h2>10. Limitation of liability</h2>
        <p>
          To the extent permitted by applicable law, ExoFlex is not liable for
          indirect, incidental, special or consequential damages, nor for loss of
          data, revenue or profits, arising from use of the software. Our total
          liability under these terms is limited to the amount you paid for the
          device and software during the twelve months preceding the event giving
          rise to the claim.
        </p>
        <p>
          Nothing in these terms excludes or limits liability for bodily injury
          caused by our fault, for fraud, or for any other liability that cannot be
          excluded under applicable law.
        </p>
      </section>

      <section>
        <h2>11. Indemnification</h2>
        <p>
          You agree to indemnify ExoFlex against claims arising from your use of the
          device or software in breach of these terms, in breach of applicable law,
          or outside the intended use.
        </p>
      </section>

      <section>
        <h2>12. Term and termination</h2>
        <p>
          The licence remains in effect until terminated. It terminates
          automatically if you breach these terms in a material way. We may also
          terminate or suspend access where required for safety or legal reasons. On
          termination, you must stop using the software. Provisions relating to
          ownership, warranty disclaimers, liability and governing law survive
          termination.
        </p>
      </section>

      <section>
        <h2>13. Governing law</h2>
        <p>
          These terms are governed by the laws applicable in the Province of
          Quebec, Canada. The courts of the judicial district of Québec have
          exclusive jurisdiction, subject to any mandatory rule granting you the
          right to sue in your place of residence.
        </p>
      </section>

      <section>
        <h2>14. Changes to these terms</h2>
        <p>
          We may modify these terms. The date at the top of this page indicates the
          most recent revision. Continued use after a material change constitutes
          acceptance, where permitted by law.
        </p>
      </section>

      <section>
        <h2>15. Contact</h2>
        <p>
          ExoFlex Inc. —{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
        </p>
      </section>
    </LegalPage>
  );
}
