import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  private clipboard: Clipboard = inject(Clipboard);
  private snackbar: MatSnackBar = inject(MatSnackBar);

  @ViewChild('code', { static: true })
  protected codeEl!: ElementRef<HTMLElement>;


  public copy() {
    if (this.codeEl) {
      const text = this.codeEl.nativeElement.innerText?.trim();
      this.clipboard.copy(text);
      this.snackbar.open('Code copied');
    }
  }

}
