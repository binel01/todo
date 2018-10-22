import { Component} from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import { ArchivedTodosPage } from '../archived-todos/archived-todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;


  constructor(public navCtrl: NavController, 
    private alertController: AlertController, 
    private todoProvider: TodoProvider, 
    private toastController: ToastController) 
  {
    this.todos = todoProvider.getTodos();
  }

  archiveTodo(todoIndex) {
    this.todoProvider.archiveTodo(todoIndex);
  }

  goToArchivedTodosPage() {
    this.navCtrl.push(ArchivedTodosPage);
  }

  itemReordered($event) {
    reorderArray(this.todos, $event);
  }

  toggleReordering() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  openUpdateTodoAlert(todoIndex) {
    let updateTodoAlert = this.alertController.create({
      title: "Update Todo",
      message: "Edit the Todo text",
      inputs: [
        {
          type: "Text",
          name: "updateTodoText",
          value: this.todos[todoIndex] 
        }
      ],
      buttons: [
        {
          text: "Cancel",
        },
        {
          text: "Update",
          handler: (inputData) => {
            let todoText = inputData.updateTodoText;

            if (todoText != this.todos[todoIndex]) {
              this.todoProvider.updateTodo(todoIndex, todoText);

              updateTodoAlert.onDidDismiss(() => {
                let updateToast = this.toastController.create({
                  message: "Todo Updated !",
                  duration: 2000
                });

                updateToast.present();
              });
            }
          }
        }
      ]
    });

    updateTodoAlert.present();
  }

  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
       title: "Add a Todo",
       message: "Enter your Todo",
       inputs: [
         {
           type: "Text",
           name: "addTodoInput"
         }
       ],
       buttons: [
         {
           text: "Cancel"
         },
         {
           text: "Add Todo",
           handler: (inputData) => {
              let todoText;
              todoText = inputData.addTodoInput;
              this.todoProvider.addTodo(todoText);

              addTodoAlert.onDidDismiss(() => {
                let toast = this.toastController.create({
                  message: "Todo Created !",
                  duration: 2000
                });

                toast.present();
              });
           }
         }
       ]
    });

    addTodoAlert.present();
  }

}
