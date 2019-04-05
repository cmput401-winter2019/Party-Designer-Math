import { ImageToProperties  } from "../classes/imageToProperties.js";
import { Item               } from "../classes/item.js";
import { User               } from "../classes/user.js";
import { FormUtil           } from "../util/formUtil.js";
import { CST                } from "../CST.js";
import { GetAllQuestionRequest, PostQuestionRequest, PutCheckAnswerRequest, PostQuestionHistory,GetPlaythrough, GetAllShoppingList, UpdateShoppingList, UpdateMoney} from "../Components/scripts.js";
import { GetUserStat } from "../Components/getUserStat.js";

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

        this.send_button                        = document.getElementById("btnSend");
        this.cancel_button                      = document.getElementById("btnCancel");
        this.input_text                         = document.getElementById("myText");
        this.send_button.style.display          = "initial";
        this.cancel_button.style.display        = "initial";
        this.input_text.style.display           = "initial";
        document.getElementById("myText").value = '';

        const url  = "http://162.246.157.181/"+ this.player.gamestateId + "/question";
        PostQuestionRequest(this.api_name, this.api_plural_name, this.api_type, this.api_cost, this.api_amount, this.api_guest, this.api_level, url, this.question_number).then(question => {

            console.log(question);

            this.question = question.question;
            this.type     = question.type;

            this.game_id    = this.player.gamestateIds;
            this.question   = question.question;
            this.textConfig = {fontFamily:'Muli', color:'#000000', fontSize:'24px'};

            this.questionBackground = this.scene.add.rectangle(0, 0, this.scene.game.config.width*0.9, this.scene.game.config.height*0.6, 0xffffff);

            this.questionBackground.setOrigin(0.5,0.5);
            this.questionBackground.setStrokeStyle(1.5, 0x000000);

            // Tranparent background
            this.transparent = this.scene.add.rectangle(0,
                                0,
                                this.scene.game.config.width*0.22,
                                50,
                                0x3498DB).setOrigin(0.5,0.2);
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
    }

    sendForm() {
        var ret = document.getElementById("myText").value;

        var letterNumber = /^[a-zA-Z]+$/;
        if(ret.match(letterNumber)){
          alert("Please Enter a Number");
          ret.value = document.getElementById("myText".value);
        }

        if(ret == ""){
          if(this.api_type      == "furniture") { this.player.decrease_furniture();}
          else if(this.api_type == "deco")      { this.player.decrease_deco();}
          else if(this.api_type == "food")      { this.player.decrease_food();}
          else if(this.api_type == "kiddie")    { this.player.decrease_kiddie();}

          alert("Please Fill in Your Answer, Try Again!");
          var scene = this.scene;     // must be here as this.scene is destroyed when container is destroyed
          this.destroy();
          scene.scene.sleep(CST.SCENES.BUY_POPUP);
        }

        this.send_button.style.display    = "none";
        this.cancel_button.style.display  = "none";
        this.input_text.style.display     = "none";

        const check_url  = "http://162.246.157.181/"+ this.game_id + "/question";
        PutCheckAnswerRequest(ret, this.question, check_url).then(answer => {
          console.log(answer.message);

          if(answer.message == "Answer is correct."){

            var new_money;
            new_money = this.player.money - this.properties.cost*this.amount;
            this.player.update_money(new_money);
            this.credit_text.setText(this.player.money);
            this.checkCreateObject();
            var money_url = "http://162.246.157.181/gamestate/update";
            UpdateMoney(this.player.money, money_url).then(data => {

            })

            const pt_url    = "http://162.246.157.181/createquestionhistory";
            const ptid_url  = "http://162.246.157.181/"+this.player.id+"/getplaythrough";

            GetPlaythrough(ptid_url).then(data => {
              PostQuestionHistory(this.question, ret, this.type, true, data[0].id, pt_url).then(data => {})
        		})

            alert("Correct!");

            var q_url = "http://162.246.157.181/"+ this.player.gamestateId + "/question";
            GetAllQuestionRequest(q_url).then(data => {
              var shop_url = "http://162.246.157.181/"+ this.player.gamestateId + "/shoppinglist";
              var correct_count = 0;
              var attempt_count = 0;
              GetAllShoppingList(shop_url).then(ret => {
                for(var i=0; i<ret.length; i++){
                  if(this.imageName == ret[i].itemName){
                    console.log(ret[i].itemName);
                    var updateShop_url =  "http://162.246.157.181/updateshoppinglist";
                    UpdateShoppingList(ret[i].id, updateShop_url).then(data => {
                      console.log(data);
                    });
                  }
                }
                for(var i=0; i<ret.length; i++){
                  if(ret[i].completed == true){
                    correct_count++;
                  }
                  attempt_count++;
                }
                var total_count = correct_count/attempt_count;
                console.log(total_count);
                if(total_count == 1){
                  alert("Level Done! Start Your Next Party!!");
                }
                this.progressBar.setPercent(total_count);
              })
            })
          }else{
            const pt_url    = "http://162.246.157.181/createquestionhistory";
            const ptid_url  = "http://162.246.157.181/"+this.player.id+"/getplaythrough";

            GetPlaythrough(ptid_url).then(data => {
        			console.log(data[0].id);
              PostQuestionHistory(this.question, ret, this.type, false, data[0].id, pt_url).then(data => {
              })
        		})

            if(this.api_type      == "furniture") { this.player.decrease_furniture();}
            else if(this.api_type == "deco")      { this.player.decrease_deco();}
            else if(this.api_type == "food")      { this.player.decrease_food();}
            else if(this.api_type == "kiddie")    {this.player.decrease_kiddie();}

            var scene = this.scene;     // must be here as this.scene is destroyed when container is destroyed
            this.destroy();
            scene.scene.sleep(CST.SCENES.BUY_POPUP);
            alert("Wrong Answer, Try Again!");
          }
        });
    }

    cancelForm() {
        const pt_url    = "http://162.246.157.181/createquestionhistory";
        const ptid_url  = "http://162.246.157.181/"+this.player.id+"/getplaythrough";

        GetPlaythrough(ptid_url).then(data => {
          console.log(data[0].id);
          PostQuestionHistory(this.question, null, this.type, false, data[0].id, pt_url).then(data => {
            console.log("FSNAJKF");
          })
        })

        if(this.api_type      == "furniture")    { this.player.decrease_furniture(); }
        else if(this.api_type == "deco")    { this.player.decrease_deco(); }
        else if(this.api_type == "food")    { this.player.decrease_food(); }
        else if(this.api_type == "kiddie")    { this.player.decrease_kiddie(); }

        this.send_button.style.display    = "none";
        this.cancel_button.style.display  = "none";
        this.input_text.style.display     = "none";
        console.log("cancelForm");
        var scene = this.scene;     // must be here as this.scene is destroyed when container is destroyed
        this.destroy();
    }

    textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("area51");
        console.log(text);
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
