import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Mensaje} from '../interfaces/mensaje.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class ChatService {
 public chats:Mensaje[] =[];
 public usuario:any = {};
 private itemsCollection: AngularFirestoreCollection<Mensaje>;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user=>{
      console.log(user);
      if(!user){
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
   }

   login(proveedor) {
     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   }
   logout() {
     this.usuario={};
     this.afAuth.auth.signOut();
   }

cargarMensajes(){
this.itemsCollection = this.afs.collection<any>('chats', ref=>ref.orderBy('fecha','asc').limit(5));
 return this.itemsCollection.valueChanges()
                            .map((mensajes:Mensaje[])=>{
                              console.log(mensajes);
                              for(let mensaje of mensajes){
                                this.chats.unshift(mensaje);
                              }
                              this.chats= mensajes;
                            })
}
agregarMensaje(texto:string){
  let mensaje: Mensaje={
    nombre:this.usuario.nombre,
    mensaje: texto,
    fecha: new Date().getTime(),
    uid: this.usuario.uid
  }
  return this.itemsCollection.add(mensaje);

}


}
