import { ImageToProperties  } from "../classes/imageToProperties";
import { Item               } from "../classes/item";
import { User               } from "../classes/user";
import { FormUtil           } from "../util/formUtil.js";
import { CST                } from "../CST";


export class Question extends Phaser.GameObjects.Container{
    constructor(scene, iName, amount, player, credit_text, progressBar){
        super(scene);
        //Initialize members
        this.scene        = scene;
        this.imageName    = iName;
        this.imageToProp  = new ImageToProperties();
        this.properties   = this.imageToProp.getProp(this.imageName);
        this.amount       = amount;
        this.player       = player;
        this.credit_text  = credit_text;
        this.progressBar  = progressBar;
        //Screen center
        var centerX = this.scene.game.config.width  / 2;
        var centerY = this.scene.game.config.height / 2;

        this.api_name          = this.properties.name;
        this.api_plural_name   = this.properties.pluralName;
        this.api_type          = this.properties.category;
        this.api_cost          = this.properties.cost;
        this.api_amount        = this.amount;
        this.api_guest         = this.player.guestNumber;
        this.api_level         = this.player.level;

        this.question_number;

        if(this.api_type == "furniture"){
          if(this.player.furniture_count == 5){
            this.player.reset_furniture();
            this.player.increase_furniture();
            this.question_number = this.player.furniture_count;
          }else{
            this.player.increase_furniture();
            this.question_number = this.player.furniture_count;
          }
        }else if(this.api_type == "deco"){
          if(this.player.deco_count == 5){
            this.player.reset_deco();
            this.player.increase_deco();
            this.question_number = this.player.deco_count;
          }else{
            this.player.increase_deco();
            this.question_number = this.player.deco_count;
          }
        }else if(this.api_type == "food"){
          if(this.player.food_count == 5){
            this.player.reset_food();
            this.player.increase_food();
            this.question_number = this.player.food_count;
          }else{
            this.player.increase_food();
            this.question_number = this.player.food_count;
          }
        }else if(this.api_type == "kiddie"){
          if(this.player.kiddie_count == 5){
            this.player.reset_kiddie();
            this.player.increase_kiddie();
            this.question_number = this.player.kiddie_count;
          }else{
            this.player.increase_kiddie();
            this.question_number = this.player.kiddie_count;
          }
        }

        this.send_button                  = document.getElementById("btnSend");
        this.cancel_button                = document.getElementById("btnCancel");
        this.input_text                   = document.getElementById("myText");
        this.send_button.style.display    = "initial";
        this.cancel_button.style.display  = "initial";
        this.input_text.style.display     = "initial";
        document.getElementById("myText").value = '';

        var gs_url = "http://127.0.0.1:5001/"+ localStorage.getItem("id") + "/gamestate";
        this.get_request(gs_url).then(gs_id => {
            const url  = "http://127.0.0.1:5001/"+ gs_id + "/question";
            this.post_request(this.api_name, this.api_plural_name, this.api_type, this.api_cost, this.api_amount, this.api_guest, this.api_level, url, this.question_number).then(question => {

                console.log(question);

                this.question = question.question;
                this.type     = question.type;

                this.game_id    = gs_id;
                this.question   = question.question;
                this.textConfig = {fontFamily:'Muli', color:'#000000', fontSize:'24px'};

                this.questionBackground = this.scene.add.rectangle(0, 0, this.scene.game.config.width*0.8, this.scene.game.config.height*0.4, 0xffffff);

                this.questionBackground.setOrigin(0.5,0.5);
                this.questionBackground.setStrokeStyle(1.5, 0x000000);

                // Tranparent background
                this.transparent = this.scene.add.rectangle(0,
                                    0,
                                    this.scene.game.config.width*0.78,
                                    this.scene.game.config.height*0.38,
                                    0x3498DB);
                this.transparent.alpha = 0.3;

                this.questionText = this.scene.add.text(0, -100, this.question, this.textConfig);
                this.questionText.setOrigin(0.5, 0.5);

                this.add(this.questionBackground);
                this.add(this.transparent);
                this.add(this.questionText)

                this.scene.add.existing(this);

                this.setSize(300, 90);
                this.x = centerX;
                this.y = centerY;

                this.setInteractive();

                this.scene.input.setDraggable(this);

                this.formUtil = new FormUtil({
                    scene: this.scene,
                    rows: 11,
                    cols: 11
                });

                //this.formUtil.showNumbers();

                this.formUtil.scaleToGameW  ("myText", .2);
                this.formUtil.placeElementAt(60, 'myText', true);

                this.formUtil.scaleToGameW  ("btnSend", .1);
                this.formUtil.placeElementAt(70, "btnSend");

                this.formUtil.scaleToGameW  ("btnCancel", .1);
                this.formUtil.placeElementAt(72, "btnCancel");

                this.formUtil.addClickCallback("btnSend", this.sendForm, this);
                this.formUtil.addClickCallback("btnCancel", this.cancelForm, this);
              });
        });
    }

    sendForm() {
            var ret = document.getElementById("myText").value;
            this.send_button.style.display    = "none";
            this.cancel_button.style.display  = "none";
            this.input_text.style.display     = "none";

            const check_url  = "http://127.0.0.1:5001/"+ this.game_id + "/question";
            this.check_answer(ret, this.question, check_url).then(answer => {
              console.log(answer.message);
              if(answer.message == "Answer is correct."){
                var new_money;
                new_money = this.player.money - this.properties.cost*this.amount;
                this.player.update_money(new_money);
                this.credit_text.setText(this.player.money);
                this.checkCreateObject();

                if(this.type == "addition"){
                  this.player.increase_correct_addition();
                }else if(this.type == "subtraction"){
                  this.player.increase_correct_subtraction();
                }else if(this.type == "multiplication"){
                  this.player.increase_correct_multiplication();
                }else if(this.type == "division"){
                  this.player.increase_correct_division();
                }else if(this.type == "mixed"){
                  this.player.increase_correct_mixed();
                }
                this.progressBar.setPercent(this.player.total_correct / 25);

                alert("Correct!");

                if(this.player.total_correct == 25){
                  alert("LEVEL COMPLETE\n START THE PARTY TO LEVEL UP!")
                }

              }else{

                if(this.type == "addition"){
                  this.player.increase_wrong_addition();
                }else if(this.type == "subtraction"){
                  this.player.increase_wrong_subtraction();
                }else if(this.type == "multiplication"){
                  this.player.increase_wrong_multiplication();
                }else if(this.type == "division"){
                  this.player.increase_wrong_division();
                }else if(this.type == "mixed"){
                  this.player.increase_wrong_mixed();
                }

                if(this.api_type == "furniture"){
                  this.player.decrease_furniture();
                }else if(this.api_type == "deco"){
                  this.player.decrease_deco();
                }else if(this.api_type == "food"){
                  this.player.decrease_food();
                }else if(this.api_type == "kiddie"){
                  this.player.decrease_kiddie();
                }

                var scene = this.scene;     // must be here as this.scene is destroyed when container is destroyed
                this.destroy();
                scene.scene.sleep(CST.SCENES.BUY_POPUP);
                alert("Wrong Answer, Try Again!");
              }
            });
        }

    cancelForm() {

            if(this.api_type == "furniture"){
              this.player.decrease_furniture();
            }else if(this.api_type == "deco"){
              this.player.decrease_deco();
            }else if(this.api_type == "food"){
              this.player.decrease_food();
            }else if(this.api_type == "kiddie"){
              this.player.decrease_kiddie();
            }

            this.send_button.style.display    = "none";
            this.cancel_button.style.display  = "none";
            this.input_text.style.display     = "none";
            console.log("cancelForm");
            var scene = this.scene;     // must be here as this.scene is destroyed when container is destroyed
            this.destroy();
            scene.scene.sleep(CST.SCENES.BUY_POPUP);
        }

    check_answer(answer, question, url) {
      const body = {
          answer: answer,
          question: question
      };
      return fetch(url, {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
          }
        })
      .then((response) => {
        console.log(response);
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Server response wasn\'t OK');
        }
      })
      .then((json) => {
        return json;
      });
    }

    textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("area51");
        console.log(text);
    }

    get_request(gs_url) {

      return fetch(gs_url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access_token"),
        }
      })
      .then((response) => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Server response wasn\'t OK');
        }
      })
      .then((json) => {
        return json.id;
      });
    }

    post_request(name, plural_name, type, cost, unit, guest, level, url, question_number) {
      const body = {
          itemName: name,
          itemPluralName: plural_name,
          itemType: type,
          itemCost: cost,
          itemUnit: unit,
          numberOfGuests: guest,
          level: level,
          question_num: question_number
      };
      return fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
          }
        })
      .then((response) => {
        console.log(response);
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Server response wasn\'t OK');
        }
      })
      .then((json) => {
        return json;
      });
    }


    checkCreateObject(){
        for (var i=0; i<this.amount; i++){
            var item = new Item(this.scene.originalS, this.imageName, this.x, this.y/2, this.properties.name, this.properties.pluralName, this.properties.category, this.properties.cost, "show");
        }

        this.scene.originalS.updateProgressBar();
        var scene = this.scene;     // must be here as this.scene is destroyed when container is destroyed
        this.destroy();
        scene.scene.sleep(CST.SCENES.BUY_POPUP);
    }
}
