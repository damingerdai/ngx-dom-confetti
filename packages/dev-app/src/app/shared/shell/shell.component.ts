import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, viewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ShellComponent {
  private clipboard: Clipboard = inject(Clipboard);
  private snackbar: MatSnackBar = inject(MatSnackBar);

  protected readonly codeEl = viewChild<ElementRef<HTMLElement>>('code');

  public copy() {
    const codeEl = this.codeEl();
    if (codeEl) {
      const text = codeEl.nativeElement.innerText?.trim();
      this.clipboard.copy(text);
      this.snackbar.open('Code copied');
    }
  }
}
