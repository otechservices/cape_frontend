import { Component, OnInit } from '@angular/core';
import { MailTestService } from 'src/app/core/services/mail-test.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

/**
 * Test de l'envoi de mails : configuration effective, connexion SMTP, puis
 * envoi réel. Chaque étape affiche son propre message d'erreur, pour savoir
 * si la panne vient de la configuration, du réseau, des identifiants ou du
 * serveur destinataire.
 */
@Component({
  selector: 'app-mail-test',
  templateUrl: './mail-test.component.html'
})
export class MailTestComponent implements OnInit {

  email: string = '';
  loading: boolean = false;
  result: any = null;
  ok: boolean | null = null;
  error: string | null = null;

  constructor(
    private mailTestService: MailTestService,
    private lsService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.email = this.lsService.get(GlobalName.userName)?.email ?? '';
  }

  test() {
    this.loading = true
    this.result = null
    this.ok = null
    this.error = null
    this.mailTestService.test(this.email).subscribe((res: any) => {
      this.loading = false
      this.ok = res.status
      this.result = res.data
    },
    (err: any) => {
      this.loading = false
      this.ok = false
      this.error = err.error?.message ?? 'Le serveur n\'a pas répondu'
    })
  }
}
