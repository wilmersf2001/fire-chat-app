import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { IMensaje } from '../../interfaces/mensaje';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  form!: FormGroup;
  chats: IMensaje[] = [];
  user: any;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private auth: AuthService
  ) {
    this.createForm();
    this.user = this.auth.userAuth().user;
  }

  ngOnInit(): void {
    this.getMensaje();
  }

  createForm() {
    this.form = this.fb.group({
      message: ['', [Validators.required, Validators.pattern(/\S/)]],
    });
  }

  getMensaje() {
    this.chatService.getMessage().subscribe((messages) => {
      this.chats = messages;
      const elemento = document.getElementById('chat-mensajes');
      setTimeout(() => {
        elemento!.scrollTop = elemento!.scrollHeight;
      }, 20);
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.chatService
      .sendMessage(this.form.value)
      .then(() => {
        this.form.reset();
      })
      .catch((error) => {
        console.error('Error al enviar el mensaje:', error);
      });
  }

  signOut() {
    this.auth.logout();
  }
}
