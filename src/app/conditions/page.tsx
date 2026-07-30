import { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Conditions d'utilisation et contrat de licence | ExoFlex",
  description:
    "Les conditions régissant l'utilisation des appareils de réadaptation ExoFlex, de leur logiciel et de ce site Web, y compris la licence d'utilisation.",
};

export default function Conditions() {
  return (
    <LegalPage
      title="Conditions d'utilisation et contrat de licence"
      updated="Dernière mise à jour : 30 juillet 2026"
      altHref="/terms"
      altLabel="English version"
    >
      <section>
        <h2>1. Acceptation</h2>
        <p>
          Les présentes conditions constituent une entente entre vous et ExoFlex
          inc. (« ExoFlex », « nous »), entreprise établie au Québec, au Canada. En
          installant, en activant ou en utilisant un appareil ExoFlex, son logiciel
          intégré, nos applications ou ce site Web, vous acceptez ces conditions. Si
          vous les acceptez pour le compte d&apos;une clinique, d&apos;un hôpital ou
          d&apos;une autre organisation, vous déclarez avoir le pouvoir de la lier.
        </p>
        <p>
          Si vous n&apos;acceptez pas ces conditions, n&apos;utilisez pas le
          logiciel.
        </p>
      </section>

      <section>
        <h2>2. Octroi de licence</h2>
        <p>
          ExoFlex vous accorde une licence limitée, non exclusive, incessible, non
          susceptible de sous-licence et révocable d&apos;utiliser le logiciel et le
          micrologiciel fournis avec un appareil ExoFlex, uniquement :
        </p>
        <ul>
          <li>sur l&apos;appareil avec lequel ils ont été fournis;</li>
          <li>
            aux fins de réadaptation pour lesquelles l&apos;appareil est destiné;
          </li>
          <li>conformément à la documentation qui l&apos;accompagne.</li>
        </ul>
        <p>
          Le logiciel est concédé sous licence, non vendu. Tous les droits qui ne
          sont pas expressément accordés sont réservés.
        </p>
      </section>

      <section>
        <h2>3. Restrictions</h2>
        <p>Il vous est interdit :</p>
        <ul>
          <li>
            de copier, de modifier, de traduire le logiciel ou d&apos;en créer des
            œuvres dérivées, sauf dans la mesure permise par la loi applicable;
          </li>
          <li>
            de faire de l&apos;ingénierie inverse, de décompiler ou de désassembler
            le logiciel, sauf dans la mesure où une telle restriction est interdite
            par la loi applicable;
          </li>
          <li>
            de louer, de prêter, de vendre, de céder ou de transférer autrement le
            logiciel ou la licence;
          </li>
          <li>
            de retirer ou de modifier une mention de propriété, un numéro de série
            ou une étiquette de sécurité;
          </li>
          <li>
            d&apos;utiliser le logiciel avec un matériel autre que l&apos;appareil
            ExoFlex pour lequel il a été fourni, ou avec des pièces de rechange non
            autorisées;
          </li>
          <li>
            de contourner, de désactiver ou d&apos;entraver les dispositifs de
            sécurité, les limites d&apos;utilisation ou les contrôles d&apos;accès;
          </li>
          <li>
            d&apos;utiliser l&apos;appareil ou le logiciel de façon incompatible
            avec son usage prévu ou avec le mode d&apos;emploi.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Propriété</h2>
        <p>
          ExoFlex et ses concédants conservent tous les droits de propriété
          intellectuelle sur les appareils, le logiciel, le micrologiciel, la
          documentation, les marques de commerce et le contenu du site Web. Les
          données produites au sujet d&apos;un patient pendant les séances de
          réadaptation appartiennent au patient et font partie, le cas échéant, du
          dossier clinique détenu par l&apos;établissement traitant; notre
          traitement de ces données est décrit dans notre{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </section>

      <section>
        <h2>5. Usage prévu et responsabilité clinique</h2>
        <p>
          Les appareils ExoFlex sont destinés à soutenir la réadaptation des
          personnes à mobilité réduite, sous la supervision ou la direction
          d&apos;un professionnel de la santé qualifié, conformément au mode
          d&apos;emploi.
        </p>
        <p>
          <strong>
            Le logiciel ne fournit ni avis médical, ni diagnostic, ni décision de
            traitement, et il ne remplace pas le jugement d&apos;un professionnel de
            la santé.
          </strong>{" "}
          Les mesures de séance et les rapports de progression sont des éléments
          d&apos;information qui alimentent le jugement clinique. Il vous incombe de
          déterminer si l&apos;utilisation de l&apos;appareil convient à un patient
          donné, d&apos;en superviser l&apos;usage au besoin et de réagir à toute
          réaction indésirable.
        </p>
        <p>
          Cessez l&apos;utilisation et consultez un professionnel de la santé si
          l&apos;appareil provoque de la douleur, un inconfort inhabituel ou toute
          réaction imprévue.
        </p>
        <p>
          <strong>Statut réglementaire.</strong> Les appareils ExoFlex sont au stade
          du prototype. Ils ne sont pas homologués comme instruments médicaux par
          Santé Canada et ne sont ni autorisés ni approuvés par la Food and Drug
          Administration des États-Unis. Ils sont mis à disposition uniquement à des
          fins d&apos;évaluation, de démonstration et de recherche, sous la
          supervision de personnel qualifié. La présente section sera mise à jour
          lorsque ce statut changera.
        </p>
      </section>

      <section>
        <h2>6. Vos responsabilités</h2>
        <ul>
          <li>
            Fournir des renseignements exacts et garder vos identifiants
            confidentiels.
          </li>
          <li>
            Lorsque vous saisissez des renseignements sur un patient, vous assurer
            d&apos;avoir obtenu le consentement ou tout autre fondement légal exigé
            dans votre territoire.
          </li>
          <li>
            Utiliser l&apos;appareil et le logiciel conformément aux lois
            applicables, à vos obligations professionnelles et aux politiques de
            votre établissement.
          </li>
          <li>
            Maintenir le logiciel à jour, les mises à jour pouvant comporter des
            correctifs de sécurité.
          </li>
          <li>
            Nous signaler sans délai tout incident de sécurité présumé, toute
            défaillance ou tout événement indésirable.
          </li>
        </ul>
      </section>

      <section>
        <h2>7. Mises à jour</h2>
        <p>
          Nous pouvons fournir des mises à jour du logiciel ou du micrologiciel, y
          compris automatiquement. Elles sont régies par les présentes conditions, à
          moins d&apos;être accompagnées de conditions distinctes. Nous pouvons
          cesser de prendre en charge les versions antérieures.
        </p>
      </section>

      <section>
        <h2>8. Composants de tiers</h2>
        <p>
          Le logiciel peut comprendre des composants de tiers ou à code source
          ouvert visés par leurs propres licences, lesquelles ont préséance sur les
          présentes conditions à l&apos;égard de ces composants. Les avis de licence
          applicables des tiers et des composants à code source ouvert sont
          disponibles sur demande à{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
          .
        </p>
      </section>

      <section>
        <h2>9. Garantie</h2>
        <p>
          Toute garantie limitée applicable à votre appareil est énoncée dans la
          documentation ou le contrat d&apos;achat qui l&apos;accompagne. Hormis
          cette garantie et toute garantie qui ne peut être exclue en vertu de la
          loi applicable — notamment les garanties prévues par la Loi sur la
          protection du consommateur au Québec — le logiciel est fourni « tel quel
          », sans garantie d&apos;aucune sorte, y compris quant à sa qualité
          marchande, à son adéquation à un usage particulier ou à un fonctionnement
          ininterrompu et sans erreur.
        </p>
      </section>

      <section>
        <h2>10. Limitation de responsabilité</h2>
        <p>
          Dans la mesure permise par la loi applicable, ExoFlex n&apos;est pas
          responsable des dommages indirects, accessoires, spéciaux ou consécutifs,
          ni de la perte de données, de revenus ou de profits découlant de
          l&apos;utilisation du logiciel. Notre responsabilité totale au titre des
          présentes conditions est limitée au montant que vous avez payé pour
          l&apos;appareil et le logiciel au cours des douze mois précédant
          l&apos;événement à l&apos;origine de la réclamation.
        </p>
        <p>
          Rien dans les présentes conditions n&apos;exclut ni ne limite la
          responsabilité en cas de préjudice corporel causé par notre faute, en cas
          de fraude, ou toute autre responsabilité qui ne peut être exclue en vertu
          de la loi applicable.
        </p>
      </section>

      <section>
        <h2>11. Indemnisation</h2>
        <p>
          Vous vous engagez à indemniser ExoFlex des réclamations découlant de votre
          utilisation de l&apos;appareil ou du logiciel en contravention des
          présentes conditions, en contravention de la loi applicable, ou en dehors
          de l&apos;usage prévu.
        </p>
      </section>

      <section>
        <h2>12. Durée et résiliation</h2>
        <p>
          La licence demeure en vigueur jusqu&apos;à sa résiliation. Elle prend fin
          automatiquement si vous contrevenez de façon importante aux présentes
          conditions. Nous pouvons également résilier ou suspendre l&apos;accès
          lorsque des motifs de sécurité ou des motifs légaux l&apos;exigent. À la
          résiliation, vous devez cesser d&apos;utiliser le logiciel. Les clauses
          portant sur la propriété, les exclusions de garantie, la responsabilité et
          le droit applicable survivent à la résiliation.
        </p>
      </section>

      <section>
        <h2>13. Droit applicable</h2>
        <p>
          Les présentes conditions sont régies par les lois applicables dans la
          province de Québec, au Canada. Les tribunaux du district judiciaire de
          Québec ont compétence exclusive, sous réserve de toute règle impérative
          vous accordant le droit d&apos;intenter un recours dans votre lieu de
          résidence.
        </p>
      </section>

      <section>
        <h2>14. Modifications</h2>
        <p>
          Nous pouvons modifier les présentes conditions. La date affichée au haut
          de cette page indique la révision la plus récente. La poursuite de
          l&apos;utilisation après une modification importante vaut acceptation,
          dans la mesure permise par la loi.
        </p>
      </section>

      <section>
        <h2>15. Nous joindre</h2>
        <p>
          ExoFlex inc. —{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
        </p>
      </section>
    </LegalPage>
  );
}
