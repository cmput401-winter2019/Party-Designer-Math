export class BuyItem extends Phaser.GameObjects.Container {

  constructor(scene, name) {
    super(scene);

    this.scene  = scene;
    this.name   = name;

    this.text_config();
    this.create_rectangle();
    this.buy_amount();
    this.amount_increment();
    this.buy_button();

    this.add(this.buyItemBackground);
    this.add(this.buyText);
    this.add(this.buyAmountBackground);
    this.add(this.buyAmountText);
    this.add(this.buyAmountIncreaseButton);
    this.add(this.buyButton);
    this.add(this.buyButtonText);
    this.scene.add.existing(this);
  }

  buy_button() {
    this.buyButton = this.scene.add.rectangle(445, 425, 35, 15, 0x0e4361);
    this.buyButton.setStrokeStyle(1.5, 0xffffff);
    this.buyButtonText = this.scene.add.text(433, 417, "BUY", this.textConfig);
  }

  amount_increment() {
    this.buyAmountIncreaseButton = this.scene.add.image(385, 425, "add").setScale(0.4, 0.4);
    this.buyAmountIncreaseButton.setInteractive();
    this.buyAmountIncreaseButton.on("pointerup", ()=> {
        if (this.buyAmount < 9)
            this.buyAmount ++;
        this.buyAmountText.text = this.buyAmount;
    });
  }

  buy_amount() {
    this.buyAmountBackground = this.scene.add.rectangle(360, 425, 25, 15, 0xffffff);
    this.buyAmountBackground.setStrokeStyle(1.5, 0x000000);
    this.buyAmount = "1";
    this.buyAmountText= this.scene.add.text(356, 417, this.buyAmount, this.textConfigForAmount);
  }

  create_rectangle() {
    this.buyItemBackground = this.scene.add.rectangle(400, 400, 150, 85, 0x0e4361);
    this.buyItemBackground.setStrokeStyle(1.5, 0xffffff);
    this.buyText = this.scene.add.text(345, 375, "How many would \nyou like to buy?", this.textConfig);
  }

  text_config() {
    this.textConfig = { fontFamily:'Muli',
                        color:'#ffffff',
                        fontSize:'12px'};

    this.textConfigForAmount = {  fontFamily:'Muli',
                                  color:'#000000',
                                  fontSize:'12px'};
  }
}
