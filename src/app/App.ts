import {Component} from '@angular/core';
import {FORM_PROVIDERS} from '@angular/common';

import {Home} from './Home/Home';

import './App.scss';

@Component({
    selector: 'app',
    template: `
      <header>
        <h1>Wheese</h1>
        <nav>
          <a href="#" active>Home</a>
          <a href="#">Cheese</a>
          <a href="#">About</a>
        </nav>
      </header>

      <div class="main">
        <div class="fromage">
          Crottin de Chavignol
          <img src="http://www.pleinchamp.com/var/ca_pleinchamp/storage/images/media/images/il-faut-en-moyenne-0-7-litre-de-lait-pour-faire-un-crottin-de-chavignol-qui-pese-de-90-grammes-apres-dix-jours-d-affinage-a-60-grammes-quand-il-est-sec.-dr/26328853-1-fre-FR/il-faut-en-moyenne-0-7-litre-de-lait-pour-faire-un-crottin-de-chavignol-qui-pese-de-90-grammes-apres-dix-jours-d-affinage-a-60-grammes-quand-il-est-sec.-dr.jpg" alt="" />

          <div class="note">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star-o" aria-hidden="true"></i>
          </div>
        </div>

        <div class="vins">
          <div class="vin">
            <img src="http://www.balland.com/images/monsite/balland/Image/IMG_8918.jpg" alt="" />
            Sancerre blanc
          </div>
          <div class="vin">
            <img src="http://sr1.wine-searcher.net/images/labels/70/96/quintessence-pouilly-fume-loire-france-10557096.jpg" alt="" />
            Pouilly Fumé
          </div>
          <div class="vin">
            <img src="http://sr1.wine-searcher.net/images/labels/70/96/quintessence-pouilly-fume-loire-france-10557096.jpg" alt="" />
            Bourgogne aligoté
          </div>
        </div>


      </div>

      <footer>
        <h1>Copyright</h1>
      </footer>
  `
})

export class App {

}
