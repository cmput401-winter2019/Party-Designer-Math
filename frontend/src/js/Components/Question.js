import { ImageToProperties } from "../classes/imageToProperties";
import { Item } from "../classes/item";
import {CST} from "../CST";
import { User } from "../classes/user";


export class Question extends Phaser.GameObjects.Container{
    constructor(scene, iName, amount, player){
        super(scene);
        //Initialize members
        this.scene = scene;
        this.imageName = iName;
        this.imageToProp = new ImageToProperties();
        this.properties = this.imageToProp.getProp(this.imageName);
        this.amount = amount;
        this.player = player;
        console.log(this.player);
        //Screen center
        var centerX = this.scene.game.config.width/2;
        var centerY = this.scene.game.config.height/2;

        //Configurations for text

        const api_name = this.properties.name;
        const api_plural_name = this.properties.pluralName;
        const api_type = this.properties.category;
        const api_cost = this.properties.cost;
        const api_unit = this.amount;
        const api_guest = this.player.guestNumber;
        const api_level = this.player.level;


        var gs_url = "http://127.0.0.1:5001/"+ localStorage.getItem("id") + "/gamestate";
        this.get_request(gs_url).then(gs_id => {
            console.log(gs_id);
            const url  = "http://127.0.0.1:5001/"+ gs_id + "/question";
            this.post_request(api_name, api_plural_name, api_type, api_cost, api_unit, api_guest, api_level, url).then(question => {
                console.log(question);

                this.textConfig = {fontFamily:'Muli', color:'#000000', fontSize:'12px'};

                this.questionBackground = this.scene.add.rectangle(0, 0, this.scene.game.config.width*0.4, 90, 0xffffff);
                this.questionBackground.setOrigin(0.5,0.5);
                this.questionBackground.setStrokeStyle(1.5, 0x000000);

                this.questionText = this.scene.add.text(0, 0-20, question, this.textConfig);
                this.questionText.setOrigin(0.5, 0.5);

                this.questionSubmitBackground = this.scene.add.rectangle(0, 0+25, 55, 15, 0x02C2FF);
                this.questionSubmitBackground.setStrokeStyle(1.5, 0xB2B3B4).setOrigin(0.5,0.5);
                this.questionSubmitText = this.scene.add.text(0, 0+25, "SUBMIT", {fontFamily:'Muli', color:'#ffffff', fontSize:'12px'});
                this.questionSubmitText.setOrigin(0.5,0.5);

                this.questionSubmitBackground.setInteractive();
                this.questionSubmitBackground.on('pointerdown', this.checkCreateObject, this);

                this.add(this.questionBackground);
                this.add(this.questionText);
                this.add(this.questionSubmitBackground);
                this.add(this.questionSubmitText);
                this.scene.add.existing(this);
                //this.scene.setOrigin(0,0);
                this.setSize(300, 90);//.setOrigin(0,0);
                this.x = centerX;
                this.y = centerY;

                //this.scene.game.debug.body(this);
                //Phaser.Actions.setOrigin([this.questionBackground], 0, 0);

                this.setInteractive();

                this.scene.input.setDraggable(this);

              });
        });
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

    post_request(name, plural_name, type, cost, unit, guest, level, url) {
      const body = {
          itemName: name,
          itemPluralName: plural_name,
          itemType: type,
          itemCost: cost,
          itemUnit: unit,
          numberOfGuests: guest,
          level: level
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
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Server response wasn\'t OK');
        }
      })
      .then((json) => {
        return json.question;
      });
    }


    // get_request(gs_url){
    //   return fetch(gs_url, {
          // method: "GET",
          // mode: "cors",
          // cache: "no-cache",
          // credentials: "same-origin",
          // headers: {
          //   "Content-Type": "application/json",
          //   "Authorization": "Bearer " + localStorage.getItem("access_token"),
    //       }
    //     })
    //     .then(
    //       response => {
    //         response.json().then(data => {
    //           const id = data.id;
    //           return id;
    //         });
    //       }
    //     )
    // }

    //
    // post_request(name, plural_name, type, cost, unit, guest, level, url){
    //     const body = {
    //         itemName: name,
    //         itemPluralName: plural_name,
    //         itemType: type,
    //         itemCost: cost,
    //         itemUnit: unit,
    //         numberOfGuests: guest,
    //         level: level
    //     };
    //     return fetch(url, {
    //         method: "POST",
    //         mode: "cors",
    //         cache: "no-cache",
    //         credentials: "same-origin",
    //         body: JSON.stringify(body),
    //         headers: {
    //           "Content-Type": "application/json",
    //           "Authorization": "Bearer " + localStorage.getItem("access_token"),
    //         }
    //       })
    //       .then(
    //         function(response) {
    //           console.log(response.status);
    //           // Examine the text in the response
    //           response.json().then(function(data) {
    //             if (response.status !== 200) {
    //                 alert(response.status + " Error"+ " : " + data["message"]);
    //                 return;
    //             }
    //             return data.question;
    //           });
    //         }
    //       )
    //   }

    checkCreateObject(){

        for (var i=0; i<this.amount; i++){
            //console.log("hi");
            var item = new Item(this.scene.originalS, this.imageName, this.x, this.y/2, this.properties.name, this.properties.pluralName, this.properties.category, this.properties.cost, this.properties.unit, "show");

        }
        this.scene.originalS.updateProgressBar();

        var scene = this.scene;     // must be here as this.scene is destroyed when container is destroyed
        this.destroy();
        scene.scene.sleep(CST.SCENES.BUY_POPUP);
    }
}
