import { ImageToProperties  } from "../classes/imageToProperties";
import { Item               } from "../classes/item";
import { User               } from "../classes/user";
import { FormUtil           } from "../util/formUtil.js";
import { CST                } from "../CST";

export class Question extends Phaser.GameObjects.Container{
    constructor(scene, iName, amount, player){
        super(scene);
        //Initialize members
        this.scene        = scene;
        this.imageName    = iName;
        this.imageToProp  = new ImageToProperties();
        this.properties   = this.imageToProp.getProp(this.imageName);
        this.amount       = amount;
        this.player       = player;

        //Screen center
        var centerX = this.scene.game.config.width  / 2;
        var centerY = this.scene.game.config.height / 2;

        const api_name          = this.properties.name;
        const api_plural_name   = this.properties.pluralName;
        const api_type          = this.properties.category;
        const api_cost          = this.properties.cost;
        const api_unit          = this.amount;
        const api_guest         = this.player.guestNumber;
        const api_level         =  this.player.level;

        var question_number;

        if(api_type == "furniture"){
          if(this.player.furniture_count == 5){
            this.player.reset_furniture();
            this.player.increase_furniture();
            question_number = this.player.furniture_count;
          }else{
            this.player.increase_furniture();
            question_number = this.player.furniture_count;
          }
        }else if(api_type == "deco"){
          if(this.player.deco_count == 5){
            this.player.reset_deco();
            this.player.increase_deco();
            question_number = this.player.deco_count;
          }else{
            this.player.increase_deco();
            question_number = this.player.deco_count;
          }
        }else if(api_type == "food"){
          if(this.player.food_count == 5){
            this.player.reset_food();
            this.player.increase_food();
            question_number = this.player.food_count;
          }else{
            this.player.increase_food();
            question_number = this.player.food_count;
          }
        }else if(api_type == "kiddie"){
          if(this.player.kiddie_count == 5){
            this.player.reset_kiddie();
            this.player.increase_kiddie();
            question_number = this.player.kiddie_count;
          }else{
            this.player.increase_kiddie();
            question_number = this.player.kiddie_count;
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
            this.post_request(api_name, api_plural_name, api_type, api_cost, api_unit, api_guest, api_level, url, question_number).then(question => {

                console.log(question.question);

                this.game_id    = gs_id;
                this.question   = question.question;
                this.textConfig = {fontFamily:'Muli', color:'#000000', fontSize:'24px'};

                //this.questionBackground = this.scene.add.rectangle(0, 0, this.scene.game.config.width*0.4, 90, 0x99d9d9);
                this.questionBackground = this.scene.add.rectangle(0, -260, this.scene.game.config.width*0.5, 240, 0x99d9d9);

                this.questionBackground.setOrigin(0.5,0.5);
                this.questionBackground.setStrokeStyle(1.5, 0x000000);

                this.questionText = this.scene.add.text(0, -270, question.question, this.textConfig);
                this.questionText.setOrigin(0.5, 0.5);

                this.add(this.questionBackground);
                this.add(this.questionText)

                this.scene.add.existing(this);

                this.setSize(300, 90);
                this.x = centerX;
                this.y = centerY;

                this.setInteractive();

                this.scene.input.setDraggable(this);

                this.formUtil = new FormUtil({
                    scene: this.scene,
                    rows: 5,
                    cols: 11
                });

                // this.formUtil.showNumbers();

                this.formUtil.scaleToGameW  ("myText", .1);
                this.formUtil.placeElementAt(16, 'myText', true);

                this.formUtil.scaleToGameW  ("btnSend", .1);
                this.formUtil.placeElementAt(26, "btnSend");

                this.formUtil.scaleToGameW  ("btnCancel", .1);
                this.formUtil.placeElementAt(28, "btnCancel");

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
            console.log(ret);
            console.log("sendForm");

            const check_url  = "http://127.0.0.1:5001/"+ this.game_id + "/question";
            this.check_answer(ret, this.question, check_url).then(answer => {
              console.log(answer.message);
              if(answer.message == "Answer is correct."){
                this.checkCreateObject();
                alert("Correct!");
              }else{
                var scene = this.scene;     // must be here as this.scene is destroyed when container is destroyed
                this.destroy();
                scene.scene.sleep(CST.SCENES.BUY_POPUP);
                alert("Wrong Answer, Try Again!");
              }
            });
        }

    cancelForm() {
            this.send_button.style.display = "none";
            this.cancel_button.style.display = "none";
            this.input_text.style.display = "none";
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
            var item = new Item(this.scene.originalS, this.imageName, this.x, this.y/2, this.properties.name, this.properties.pluralName, this.properties.category, this.properties.cost, this.properties.unit, "show");
        }

        this.scene.originalS.updateProgressBar();
        var scene = this.scene;     // must be here as this.scene is destroyed when container is destroyed
        this.destroy();
        scene.scene.sleep(CST.SCENES.BUY_POPUP);
    }
}
