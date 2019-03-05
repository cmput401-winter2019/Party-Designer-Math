export class Question extends Phaser.GameObjects.Container {

  constructor(scene, name, amount) {
    super(scene);

    this.scene  = scene;
    this.name   = name;
    this.amount = amount;

    this.configure_text();

    this.question_background();

    this.submit_background();

    this.add(this.questionBackground);
    this.add(this.questionText);
    this.add(this.questionSubmitBackground);
    this.add(this.questionSubmitText);
    this.scene.add.existing(this);
    this.setSize(300, 90);

    this.drag_logic();


  }

  drag_logic() {
    this.x = 350;
    this.y = 350;

    this.setInteractive();

    this.scene.input.setDraggable(this);

    this.scene.input.on('drag', function(pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
    });
  }

  submit_background() {
    this.questionSubmitBackground = this.scene.add.rectangle(150-145, 65-45, 55, 15, 0x0e4361);
    this.questionSubmitBackground.setStrokeStyle(1.5, 0xffffff);
    this.questionSubmitText       = this.scene.add.text(127-145, 57-45,
                                                        "SUBMIT",
                                                        this.textConfig);
  }

  question_background() {
    this.questionBackground = this.scene.add.rectangle(1, 1, 300, 90, 0x0e4361);
    this.questionBackground.setStrokeStyle(1.5, 0xffffff);
    this.questionText       = this.scene.add.text(65-145,
                                                  20-45,
                                                  "How much would it cost to buy\n" +this.amount + " " + this.name + "?",
                                                  this.textConfig);
  }

  configure_text() {
    this.textConfig = { fontFamily:'Muli',
                        color:'#ffffff',
                        fontSize:'12px'};
  }

}
