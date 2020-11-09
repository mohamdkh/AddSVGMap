import { Component, OnInit } from '@angular/core';
import { CommuneService } from 'src/services/commune.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  savedObject: any = {}
  selectedCommune: any = ["", "", ""];
  title = 'AddsvgMap';

  constructor(private servicecommune: CommuneService) {

  }
  ngOnInit() {

  }

  ClickMe(elem: number) {
    let idRegion = elem.toString();
    this.servicecommune.GetCommune(idRegion).subscribe((resultat: string[]) => {
      resultat.forEach(item => {
        let tab = item.split(";");
        this.savedObject[tab[0]] = tab[1];
      })
      Swal.mixin({
        input: 'select',
        inputOptions: this.savedObject,
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          title: 'Commune 1',
          text: 'Selectionner une commune'
        },
        'Commune 2',
        'Commune 3'
      ]).then((result1) => {
        if (result1) {
          let i = 0;
          result1.value.forEach(element => {
            this.selectedCommune[i] = this.savedObject[element];
            i++;
          });
          const answers = JSON.stringify(this.selectedCommune)
          Swal.fire({
            title: 'Confirmation !',
            html: `
              Communes selectionnées:
              <pre><code>${answers}</code></pre>
            `,
            confirmButtonText: 'Confirmer!',
            showCancelButton: true
          }).then((result) => {
            if (result.isConfirmed) {
              if (result.isConfirmed) {
                Swal.fire(
                  'Exécution',
                  'Communes sont affectée à votre profil avec succès.',
                  'success'
                )
              }
            }
          })
        }
      }
      )
    

    })
 
  }
}
