import { Component, Input } from '@angular/core';

/**
 * Bandeau affiché au promoteur dont aucun centre n'est encore agréé.
 *
 * Personnel, pensionnaires et rapports d'activité décrivent un centre en
 * activité : tant que la DFEA n'a pas validé l'agrément, la saisie est refusée
 * par l'API. Sans explication, le promoteur ne voyait qu'un bouton qui échoue ;
 * ce bandeau dit pourquoi et ce qu'il faut attendre.
 *
 * Le composant est partagé plutôt que recopié : les trois écrans doivent tenir
 * le même discours, et une formulation qui dérive est une source de confusion.
 */
@Component({
  selector: 'app-agrement-required',
  templateUrl: './agrement-required.component.html'
})
export class AgrementRequiredComponent {

  /** Intitulé de l'opération concernée, pour situer le message. */
  @Input() operation = 'cette opération';

  /** Vrai lorsque le promoteur ne dispose d'aucun centre agréé. */
  @Input() bloque = false;
}
