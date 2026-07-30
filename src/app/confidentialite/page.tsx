import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité | ExoFlex",
  description:
    "Comment ExoFlex recueille, utilise, protège et communique les renseignements personnels, y compris les renseignements de santé traités par ses appareils de réadaptation.",
};

export default function PolitiqueConfidentialite() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      updated="Dernière mise à jour : 30 juillet 2026"
      altHref="/privacy"
      altLabel="English version"
    >
      <section>
        <h2>1. Qui nous sommes</h2>
        <p>
          ExoFlex inc. (« ExoFlex », « nous ») est une entreprise établie au
          Québec, au Canada. Nous concevons et fabriquons des appareils de
          réadaptation connectés pour les personnes à mobilité réduite, utilisés à
          domicile et en clinique, ainsi que le logiciel qui soutient le suivi
          thérapeutique.
        </p>
        <p>
          <strong>
            Personne responsable de la protection des renseignements personnels :
          </strong>{" "}
          Olivier Jackson —{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
          . Cette fonction est exigée par la Loi sur la protection des
          renseignements personnels dans le secteur privé, telle que modifiée par
          la Loi 25.
        </p>
        <p>Adresse du siège : [À VÉRIFIER — adresse civique complète d&apos;ExoFlex inc.]</p>
      </section>

      <section>
        <h2>2. Portée de la politique</h2>
        <p>
          La présente politique s&apos;applique aux renseignements personnels que
          nous recueillons par nos appareils, nos applications et ce site Web. Elle
          ne s&apos;applique pas aux pratiques distinctes des cliniques, des
          hôpitaux et des autres établissements de santé qui utilisent nos
          produits : ces organisations traitent les renseignements de leurs
          patients selon leurs propres politiques et obligations.
        </p>
      </section>

      <section>
        <h2>3. Renseignements que nous recueillons</h2>
        <p>
          <strong>Compte du clinicien et de l&apos;établissement.</strong> Nom,
          adresse de courriel professionnelle, fonction, nom de la clinique ou de
          l&apos;établissement, identifiants d&apos;authentification et journaux
          d&apos;activité liés au compte.
        </p>
        <p>
          <strong>Identification du patient.</strong> Nom, âge ou date de
          naissance, et numéro de patient ou de dossier attribué par
          l&apos;établissement traitant. Ces renseignements sont saisis par le
          clinicien ou, en usage à domicile, par le patient ou la personne qui
          l&apos;accompagne.
        </p>
        <p>
          <strong>Données de séance de réadaptation.</strong> Angles
          articulaires, force appliquée, amplitude de mouvement, nombre et durée
          des répétitions, horodatage des séances et progression d&apos;une séance
          à l&apos;autre. Lorsqu&apos;elles sont rattachées à une personne
          identifiée, ces données constituent des renseignements de santé et sont
          traitées comme des renseignements personnels sensibles.
        </p>
        <p>
          <strong>Renseignements techniques.</strong> Numéro de série de
          l&apos;appareil, versions du logiciel et du micrologiciel, journaux
          d&apos;erreurs et de diagnostic, et métadonnées de connexion nécessaires
          au fonctionnement et au soutien de l&apos;appareil.
        </p>
        <p>
          <strong>Renseignements liés au site Web.</strong> [À VÉRIFIER — préciser
          si le site utilise des témoins ou un outil de statistiques, et lesquels.
          Si aucun n&apos;est utilisé, l&apos;indiquer explicitement.]
        </p>
        <p>
          Nous ne recueillons pas sciemment de renseignements au-delà de ce qui est
          décrit ci-dessus. Nous ne recueillons aucun renseignement de carte de
          paiement par nos appareils ou notre logiciel.
        </p>
      </section>

      <section>
        <h2>4. Fins auxquelles nous les utilisons</h2>
        <ul>
          <li>
            Assurer la fonction première de l&apos;appareil : guider, enregistrer
            et restituer les séances de réadaptation.
          </li>
          <li>
            Rendre l&apos;historique et la progression accessibles au clinicien
            traitant pour le suivi thérapeutique.
          </li>
          <li>
            Fournir le soutien technique, diagnostiquer les défaillances et
            déployer les mises à jour du logiciel et du micrologiciel.
          </li>
          <li>
            Respecter nos obligations de fabricant d&apos;instruments médicaux,
            notamment la surveillance de la sécurité et la déclaration
            d&apos;incidents lorsqu&apos;elle s&apos;applique.
          </li>
          <li>
            Améliorer la sécurité et la performance de l&apos;appareil, en
            utilisant des données agrégées ou dépersonnalisées chaque fois
            qu&apos;elles suffisent à la fin visée.
          </li>
        </ul>
        <p>
          Nous n&apos;utilisons aucun renseignement de santé à des fins
          publicitaires et nous ne vendons aucun renseignement personnel.
        </p>
      </section>

      <section>
        <h2>5. Notre rôle à l&apos;égard des renseignements de santé</h2>
        <p>
          Lorsqu&apos;une clinique, un hôpital ou un autre établissement de santé
          des États-Unis utilise nos produits, cet établissement est généralement
          l&apos;entité visée (<i>covered entity</i>) au sens de la loi HIPAA, et
          ExoFlex agit pour son compte à titre de partenaire commercial (
          <i>business associate</i>). À ce titre :
        </p>
        <ul>
          <li>
            nous traitons les renseignements de santé protégés uniquement dans la
            mesure nécessaire à la fourniture du produit et du soutien, ou lorsque
            la loi l&apos;exige;
          </li>
          <li>
            nous concluons une entente de partenaire commercial avec
            l&apos;établissement avant de traiter de tels renseignements pour son
            compte;
          </li>
          <li>
            nous n&apos;utilisons pas ces renseignements à nos propres fins
            indépendantes.
          </li>
        </ul>
        <p>
          Les établissements de santé peuvent demander une entente de partenaire
          commercial à{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
          .
        </p>
      </section>

      <section>
        <h2>6. Consentement</h2>
        <p>
          Lorsqu&apos;un clinicien saisit des renseignements sur un patient dans
          notre système, il lui incombe d&apos;avoir obtenu le consentement éclairé
          du patient, ou de disposer d&apos;un autre fondement légal, avant de le
          faire. En usage à domicile, nous demandons le consentement du patient ou
          de la personne qui l&apos;accompagne à la création du compte. Le
          consentement peut être retiré en tout temps; son retrait peut empêcher
          l&apos;appareil d&apos;assurer le suivi thérapeutique.
        </p>
      </section>

      <section>
        <h2>7. Communication à des tiers</h2>
        <p>
          Nous ne communiquons des renseignements personnels que dans les cas
          suivants :
        </p>
        <ul>
          <li>
            <strong>Fournisseurs de services.</strong> Fournisseurs
            d&apos;hébergement, de stockage et d&apos;infrastructure agissant selon
            nos instructions et liés par des obligations de confidentialité et de
            sécurité. [À VÉRIFIER — nommer les fournisseurs utilisés et les pays où
            les renseignements sont conservés.]
          </li>
          <li>
            <strong>Établissement traitant.</strong> Les données de séance sont
            rendues accessibles à la clinique ou au clinicien responsable du
            patient.
          </li>
          <li>
            <strong>Obligations légales.</strong> Lorsque la communication est
            exigée par la loi, un règlement, une assignation ou une ordonnance
            valide d&apos;une autorité compétente.
          </li>
          <li>
            <strong>Transactions d&apos;entreprise.</strong> Dans le cadre
            d&apos;une fusion, d&apos;une acquisition ou d&apos;une vente
            d&apos;actifs, sous réserve d&apos;une protection équivalente des
            renseignements.
          </li>
        </ul>
        <p>
          Nous ne vendons ni ne partageons de renseignements personnels à des fins
          de publicité comportementale intercontextuelle, au sens de la loi
          californienne.
        </p>
      </section>

      <section>
        <h2>8. Lieu de conservation et communication hors Québec</h2>
        <p>
          [À VÉRIFIER — préciser où les renseignements sont hébergés (par exemple
          au Canada, aux États-Unis, ou les deux) et, si des renseignements sont
          communiqués à l&apos;extérieur du Québec, confirmer qu&apos;une
          évaluation des facteurs relatifs à la vie privée a été réalisée, comme
          l&apos;exige la Loi 25.]
        </p>
      </section>

      <section>
        <h2>9. Conservation</h2>
        <p>
          Nous ne conservons les renseignements personnels que le temps nécessaire
          aux fins décrites dans la présente politique, et pendant les périodes
          exigées par la réglementation applicable aux dossiers médicaux et aux
          instruments médicaux. [À VÉRIFIER — indiquer les durées de conservation
          réelles des données de séance, des renseignements d&apos;identification
          du patient et des renseignements de compte.] Lorsque les renseignements
          ne sont plus nécessaires, nous les détruisons ou les anonymisons.
        </p>
      </section>

      <section>
        <h2>10. Sécurité</h2>
        <p>
          Nous appliquons des mesures techniques et organisationnelles
          proportionnées à la sensibilité des renseignements, dont le chiffrement
          des données en transit, des contrôles d&apos;accès limitant
          l&apos;accès au personnel autorisé selon le principe du besoin de savoir,
          et la journalisation des accès aux renseignements de santé. [À VÉRIFIER —
          confirmer si les données sont chiffrées au repos et décrire le processus
          de sauvegarde et de réponse aux incidents.]
        </p>
        <p>
          Aucun système n&apos;est parfaitement sûr. Si un incident de
          confidentialité présente un risque de préjudice sérieux, nous en
          aviserons les personnes concernées ainsi que la Commission d&apos;accès à
          l&apos;information du Québec, et toute autre autorité que la loi
          applicable exige d&apos;informer.
        </p>
      </section>

      <section>
        <h2>11. Vos droits</h2>
        <p>
          <strong>Québec et Canada.</strong> Vous pouvez demander l&apos;accès aux
          renseignements personnels que nous détenons à votre sujet, demander leur
          rectification, demander qu&apos;ils vous soient communiqués dans un
          format technologique structuré et couramment utilisé, et retirer votre
          consentement. Vous pouvez aussi porter plainte auprès de la Commission
          d&apos;accès à l&apos;information du Québec ou du Commissariat à la
          protection de la vie privée du Canada.
        </p>
        <p>
          <strong>Californie.</strong> Les résidents de la Californie peuvent
          demander à connaître les renseignements personnels que nous avons
          recueillis, en demander la suppression ou la correction, et ont le droit
          de ne subir aucun traitement discriminatoire pour avoir exercé ces
          droits. Comme nous ne vendons ni ne partageons de renseignements
          personnels à des fins de publicité comportementale, aucun mécanisme de
          retrait n&apos;est requis à cet égard. Une demande peut être présentée
          par un mandataire autorisé.
        </p>
        <p>
          <strong>Comment exercer vos droits.</strong> Écrivez à{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
          . Nous répondons dans un délai de 30 jours. Nous pourrions devoir
          vérifier votre identité avant de donner suite à une demande. Si vos
          renseignements ont été saisis par une clinique, nous pourrions rediriger
          votre demande vers cet établissement, qui détient le dossier clinique.
        </p>
      </section>

      <section>
        <h2>12. Mineurs</h2>
        <p>
          Nos appareils peuvent être prescrits à des personnes mineures. Le cas
          échéant, les renseignements sont fournis et gérés par un parent, un
          tuteur ou le clinicien traitant. Nous ne recueillons pas sciemment de
          renseignements directement auprès d&apos;un enfant sans cette
          intervention.
        </p>
      </section>

      <section>
        <h2>13. Décisions automatisées</h2>
        <p>
          Nous n&apos;utilisons pas les renseignements personnels pour rendre une
          décision fondée exclusivement sur un traitement automatisé. Les données
          de séance alimentent le jugement du clinicien; elles ne le remplacent
          pas.
        </p>
      </section>

      <section>
        <h2>14. Modifications</h2>
        <p>
          Nous pouvons modifier la présente politique. La date affichée au haut de
          cette page indique la révision la plus récente. Lorsqu&apos;une
          modification touche de façon importante notre traitement des
          renseignements personnels, nous en donnons avis par le produit ou par
          courriel.
        </p>
      </section>

      <section>
        <h2>15. Nous joindre</h2>
        <p>
          Questions, demandes d&apos;accès et plaintes :{" "}
          <a href="mailto:olivier.jackson@exoflex.ca">
            olivier.jackson@exoflex.ca
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
