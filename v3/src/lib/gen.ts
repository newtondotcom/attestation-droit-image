import addfont from "./font";
import { jsPDF } from "jspdf";


export function genPDF(nom:string, adresse:string, telephone:string, lieux:string) {
    let date = new Date().toLocaleDateString();
    let duration = "3";

    var doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        margins: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    addfont(doc);

    // Set font sizes and line heights
    var fontSize = 12;
    var lineHeight = 7;
    var pageHeight = doc.internal.pageSize.height;

    //doc.addImage("./apie.png", "PNG", 15, 40, 180, 180);

    // Function to add text with page break handling
    function addTextWithPageBreak(text, x, y, options  = {}) {
    var lines = doc.splitTextToSize(text, options && options.maxWidth || 170);
    var cursorY = y;

    lines.forEach(function (line) {
        if (cursorY + lineHeight > pageHeight - 20) {
        // Add a new page if content goes beyond the page height
        doc.addPage();
        cursorY = 20;
        }
        doc.text(x, cursorY, line, options);
        cursorY += lineHeight;
    });
    }

    // Set text styles
    doc.setFontSize(fontSize);

    // Add section title
    doc.setFont("helvetica", "bold");
    addTextWithPageBreak('Projet d’autorisation d’exploiter l’image d’une personne photographiée', 20, 20, { maxWidth: 170 });
    doc.setFont("helvetica", "normal");
    let sousline = 40;
    addTextWithPageBreak('Je soussigné(e)  ' + nom, 20, sousline);
    addTextWithPageBreak('Demeurant au   ' + adresse, 20, sousline + lineHeight);
    addTextWithPageBreak('Ayant comme numéro de téléphone     ' + telephone, 20, sousline + 2 * lineHeight);

    // Add consent paragraph
    var consentText = `Consens à être photographié(e) le ${date} par M. Augereau Robin, agissant en tant que Entrepreneur individuel pour le compte de sa micro-entreprise, dans le cadre d’une production tournée ce jour et l'autorise  à reproduire et à diffuser, directement ou par l’intermédiaire de tiers, à titre non exclusif et pour le monde entier, les photographies me représentant ainsi qu’à exploiter ces clichés, en partie ou en totalité, sous toute forme et sur tous supports y compris dans le cadre d’exploitations commerciales.
    Le droit d’exploiter les photographies me représentant comprend notamment :
        - Documents de communication physique ou numérique (brochures, cartes de visite, papier à en-tête, affiches, kakémonos, site Internet, bannières…)
        - Édition numérique (cd-rom, dvd, cd photo, vidéodisque…)
        - Articles de presse (magazines, quotidiens et périodiques accrédités par la commission paritaire)
        - Annonce presse (insertion publicitaire dans la presse)
        - Internet (ordinateurs fixes et portables, smartphones, tablettes...)

    Les utilisations de mon image ne devront en aucune façon porter atteinte à ma vie privée, et plus généralement me nuire ou me causer un quelconque préjudice.
    Je reconnais par ailleurs que je ne suis lié(e) à aucun contrat exclusif sur l’utilisation de mon image ou de mon nom.
    Cette autorisation de l’utilisation de mon image à une validité de ${duration} ans à compter de sa signature et est consentie à titre gracieux.`;

    addTextWithPageBreak(consentText, 20, 70, { maxWidth: 170 });

    doc.text('Fait à  ' + lieux + ', le ' + date, 20, 250);
    doc.text('Signature de l’intéressé(e)', 140, 250);
    doc.setFont("PermanentMarker-Regular", "normal");
    doc.text(nom,  145, 265);
    return doc;
}