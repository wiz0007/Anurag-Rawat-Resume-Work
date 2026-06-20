import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { SceneCanvas } from '../../shared/scene-canvas/scene-canvas';

@Component({ selector: 'app-contact', standalone: true, imports: [ReactiveFormsModule, RevealDirective, SceneCanvas], templateUrl: './contact.html', styleUrl: './contact.scss' })
export class Contact {
  readonly sent = signal(false);
  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(12)] })
  });

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const { name, email, message } = this.form.getRawValue();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    this.sent.set(true);
    window.location.href = `mailto:anurag123ksp@gmail.com?subject=${subject}&body=${body}`;
  }
}
