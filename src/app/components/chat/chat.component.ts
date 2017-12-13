import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {ChatService} from'../../services/chat.service';
import {Mensaje} from '../../interfaces/mensaje.interface';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {
  mensaje:string="";
 public chats: Observable<Mensaje[]>;
 constructor(public _cs:ChatService) {
this._cs.cargarMensajes().subscribe()

}


enviar_mensaje(){
if(this.mensaje.length===0){
  return;
}
this._cs.agregarMensaje(this.mensaje)
.then(()=>this.mensaje="")
.catch((err)=>console.error('error',err));

}
}
